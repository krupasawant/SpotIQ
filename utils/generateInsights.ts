// utils/generateInsights.ts

export const generateInsights = (results: Record<string, number>, cuisine: string): string[] => {
  const insights: string[] = [];

  const { offices = 0, directCompetition = 0, indirectCompetition = 0, transit = 0, entertainment = 0, institutions = 0 } = results;

  // Offices
  if (offices > 30) insights.push("✅ High office density — strong lunch crowd potential.");
  else if (offices < 10) insights.push("❌ Low office presence — might struggle during weekdays.");

  // Direct competition
  if (directCompetition === 0) insights.push("✅ No direct competition — unique cuisine opportunity.");
  else if (directCompetition > 10) insights.push("❌ Many restaurants already serve this cuisine — may face direct competition.");

  // Indirect competition
  if (indirectCompetition > 300) insights.push(" ⚠️ Many nearby food spots — good for foot traffic but competitive.");
  else if (indirectCompetition < 100) insights.push("❌ Very few eateries nearby — limited organic food traffic.");

  // Transit
  if (transit > 150) insights.push("✅ Excellent public transport connectivity.");
  else if (transit < 50) insights.push("❌ Poor public transit access — may limit reach.");

  // Entertainment
  if (entertainment > 50) insights.push("✅ Strong presence of nightlife or entertainment — potential for dinner/evening crowd.");
  else if (entertainment === 0) insights.push("❌ Lack of entertainment spots — limited night/weekend draw.");

  // Institutions
  if (institutions > 10) insights.push("✅ Good number of schools/universities/hospitals — steady day traffic.");
  else if (institutions === 0) insights.push("❌ No nearby institutions — may miss student and hospital staff traffic.");

  // Strategic Combos
  if (offices > 30 && directCompetition === 0)
    insights.push("✅ No direct competition and strong office density — ideal for first mover advantage.");
  if (["italian", "french", "japanese"].includes(cuisine.toLowerCase()) && entertainment === 0)
    insights.push(`${cuisine} cuisine thrives in entertainment zones — consider evening-focused areas.`);

  return insights;
};
