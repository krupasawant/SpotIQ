"use client";

import { useState } from "react";
import { LocationForm } from "@/components/LocationForm";
import { AREA_GROUPS } from "@/constants/data";
import { AREA_BOUNDS } from "@/constants/areaBound";


import { MapContainer, TileLayer, Rectangle, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

type FormValues = {
  area: string;
  cuisine: string;
  audience: string[];
  budget: string;
};

// === Zoom helper ===
function FitBounds({ bounds }: { bounds: [[number, number], [number, number]] | null }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
    }
  }, [bounds, map]);

  return null;
}

export default function HomePage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [results, setResults] = useState<{ name: string; score: number; insights?: string[] }[]>([]);
  const [loadingSteps, setLoadingSteps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: FormValues) => {
    
     setIsLoading(true);
  setLoadingSteps(["📊 Calculating final score..."]);
  const startTime = performance.now(); // Start timing
  try {
    // Call backend
    const res = await fetch("/api/calculateScore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const { area, score, breakdown, insights } = await res.json();
    const endTime = performance.now(); // End timing
    console.log(`⏱️ Total scoring time: ${(endTime - startTime).toFixed(2)} ms`);
    setResults([{ name: area, score, insights }]);
    setSelectedArea(area);
  } catch (err) {
    console.error(err);
    setLoadingSteps(prev => [...prev, "❌ Error calculating score"]);
  } finally {
    setIsLoading(false);
  }

  };

  return (
    <main className="min-h-screen px-6 py-10 bg-gray-50">
      {/* === Header === */}
      <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-violet-700">
        Best Restaurant Locations, Simplified
      </h3>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Discover the perfect spot for your restaurant using foot traffic, competition, and audience insights.
      </p>

      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* === FORM + RESULTS === */}
        <div className="md:w-1/3 rounded-xl border border-violet-300 p-6 bg-gradient-to-b from-white to-violet-50 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <LocationForm onSubmit={handleSubmit} />

                   {isLoading && (
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-2">Analyzing location...</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {loadingSteps.map((step, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="animate-pulse mr-2">⏳</span> {step}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.length > 0 && results[0].insights && (
            <div className="mt-4 p-4 rounded-lg bg-violet-50 border border-violet-200 shadow-sm">
              <h3 className="text-lg font-semibold text-violet-800 mb-2">Insights</h3>
              <p className="text-3xl font-bold text-violet-700 mb-2">
                Score: {results[0].score.toFixed(1)} / 10
              </p>
              <div className="h-2 w-full bg-gray-200 rounded-full mb-2">
                <div
                  className="h-2 bg-violet-600 rounded-full"
                  style={{ width: `${(results[0].score / 10) * 100}%` }}
                ></div>
              </div>
              <ul className="list-disc ml-5 text-sm text-gray-700">
                {results[0].insights.map((tip: string, idx: number) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* === MAP === */}
        <div className="md:w-2/3 h-[80vh] border rounded-xl shadow-lg p-2 bg-white">
          <h2 className="text-xl font-semibold text-center mb-2 text-gray-700">
            Map Preview
          </h2>
          <MapContainer center={[40.75, -73.98]} zoom={12} className="w-full h-full rounded-lg">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {AREA_GROUPS.flatMap(group => group.areas).map(areaName => {
              const bounds = AREA_BOUNDS[areaName];
              if (!bounds) return null;

              const isSelected = areaName === selectedArea;
              const hasResults = results.length > 0;

              return (
                <Rectangle
                  key={areaName}
                  bounds={bounds}
                  pathOptions={{
                    color: isSelected ? "green" : "blue",
                    weight: isSelected ? 3 : 1,
                    fillOpacity: isSelected ? 0.3 :hasResults ? 0.05 : 0.1,
                  }}
                >
                  <Popup>
                    {areaName} {isSelected && "(Selected)"}
                  </Popup>
                </Rectangle>
              );
            })}

            {/* Smooth zoom to selected area */}
            <FitBounds bounds={selectedArea ? AREA_BOUNDS[selectedArea] : null} />
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
