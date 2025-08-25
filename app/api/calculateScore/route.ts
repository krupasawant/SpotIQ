import { NextRequest, NextResponse } from "next/server";
import { getLocationScore } from "../../../lib/fetchAreaData"
import { AREA_BOUNDS } from "../../../constants/areaBound";
import { fetchPedestrianCountsPerArea } from "@/lib/fetchPedestrianCounts";


import { generateInsights } from "@/utils/generateInsights";


type RequestBody = {
  area: string;
  cuisine : string;
};

export async function POST(req: NextRequest) {
  try {
    const { area, cuisine}: RequestBody = await req.json();
    

    if (!area || !AREA_BOUNDS[area]) {
      return NextResponse.json({ error: "Invalid area" }, { status: 400 });
    }
    const bbox = AREA_BOUNDS[area];
    const {  breakdown, totalScore } = await getLocationScore(cuisine, [bbox[0][0], bbox[0][1], bbox[1][0], bbox[1][1]]);
    const insights = generateInsights(breakdown, cuisine);
    const pedestrianScores = await fetchPedestrianCountsPerArea(area) ?? 0;

    // scaling to 10
    const normalizedScore = Math.max(0, Math.min(10, (totalScore+pedestrianScores) * 10));
   
    return NextResponse.json({   
      area,
      score:normalizedScore,
      breakdown,
      insights });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
