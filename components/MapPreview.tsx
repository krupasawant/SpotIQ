"use client";

import { AREA_GROUPS } from "@/constants/data";
import { AREA_BOUNDS } from "@/constants/areaBound";
import {
  MapContainer,
  TileLayer,
  Rectangle,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

type MapPreviewProps = {
  selectedArea: string | null;
  results: { name: string; score: number; insights?: string[] }[];
};

// === Zoom helper ===
function FitBounds({
  bounds,
}: {
  bounds: [[number, number], [number, number]] | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
    }
  }, [bounds, map]);

  return null;
}

export default function MapPreview({ selectedArea, results }: MapPreviewProps) {
  return (
    <MapContainer
      center={[40.75, -73.98]}
      zoom={12}
      className="w-full h-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {AREA_GROUPS.flatMap((group) => group.areas).map((areaName) => {
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
              fillOpacity: isSelected ? 0.3 : hasResults ? 0.05 : 0.1,
            }}
          >
            <Popup>
              {areaName} {isSelected && "(Selected)"}
            </Popup>
          </Rectangle>
        );
      })}

      <FitBounds bounds={selectedArea ? AREA_BOUNDS[selectedArea] : null} />
    </MapContainer>
  );
}
