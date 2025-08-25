import { getDynamicPOIConfig, POICategory } from "./poiConfig";
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";


export const buildOverpassQuery = (
  category: POICategory,
  bbox: [number, number, number, number]
): string => {
  const [south, west, north, east] = bbox;
  return `
    [out:json][timeout:25];
    (
      ${category.tags.map(tag => `${tag}(${south},${west},${north},${east});`).join('\n      ')}
    );
    out count;
  `;
};

export const queryOverpass = async (query: string): Promise<any> => {
  try {
    const response = await fetch(OVERPASS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'text/plain',
      },
      body: query
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Overpass API error:", error);
    throw error;
  }
};

export const getLocationScore = async (cuisine: string, bbox: [number, number, number, number]) => {
  const poiConfig = getDynamicPOIConfig(cuisine);
  const queryPromises = Object.entries(poiConfig).map(async ([key, config]) => {
    try {
      const query = buildOverpassQuery(config, bbox);
      const result = await queryOverpass(query);
      const countData = result.elements?.[0]?.tags;
      const count = parseInt(countData?.total || "0", 10);

      //normalize using a cap
      const normalized = Math.min(count / config.cap, 1);

      //multiple by individual weight
      const contribution = normalized * config.weight;

      return { key, count, contribution };
    } catch (error) {
      console.error(`Error fetching ${config.name}:`, error);
      return { key, count: 0, contribution: 0 };
    }
  });
  const resolvedResults = await Promise.all(queryPromises);
  let totalScore = 0;
  const results: { [key: string]: number } = {};

  // aggregate total
  for (const { key, count, contribution } of resolvedResults) {
    results[key] = count;
    totalScore += contribution;
  }

  return {
    breakdown: results,
    totalScore
  };
};

