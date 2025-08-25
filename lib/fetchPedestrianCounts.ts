import { AREA_BOUNDS } from "@/constants/areaBound";
import { getDynamicPOIConfig, POICategory } from "./poiConfig";
const PEDESTRIAN_API = "https://data.cityofnewyork.us/resource/cqsj-cfgu.json?$limit=1000";

// Check if lat/lon is inside area bounding box
function isInsideBoundingBox(
    lat: number,
    lon: number,
    [[lat1, lon1], [lat2, lon2]]: [[number, number], [number, number]]
): boolean {
    const latMin = Math.min(lat1, lat2);
    const latMax = Math.max(lat1, lat2);
    const lonMin = Math.min(lon1, lon2);
    const lonMax = Math.max(lon1, lon2);
    return lat >= latMin && lat <= latMax && lon >= lonMin && lon <= lonMax;
}

// Fetch and assign pedestrian points to areas
export const fetchPedestrianCountsPerArea = async (area: string) => {
    const bbox = AREA_BOUNDS[area];
    if (!bbox) {
        console.warn(`Bounding box not found for area: ${area}`);
        return 0;
    }
    const response = await fetch(PEDESTRIAN_API);
    const data = await response.json();
    const relevantCounts: number[] = [];

    data.forEach((point: any) => {
        const coords = point?.the_geom?.coordinates;

        if (!coords || coords.length < 2) return;
        const [lon, lat] = coords;

        if (isInsideBoundingBox(lat, lon, bbox)) {
            const am = parseFloat(point.oct24_am ?? "0");
            const md = parseFloat(point.oct24_md ?? "0");
            const pm = parseFloat(point.oct24_pm ?? "0");

            const avg = (am + md + pm) / 3;
            relevantCounts.push(avg)
        }
    });

    if (relevantCounts.length === 0) return 0;
    //average all points
    const avg_total = relevantCounts.reduce((a, b) => a + b, 0) / relevantCounts.length;
    const poiConfig = getDynamicPOIConfig();
    //normalize to a cap
    const normalized = Math.min(avg_total / poiConfig.pedestrianTraffic.cap, 1);
    // multiple by weight 
    const total = normalized * poiConfig.pedestrianTraffic.weight;
    return total;
};