## 📍 SpotIQ – Restaurant Location Intelligence

SpotIQ is a full-stack geospatial intelligence tool that helps food entrepreneurs and restaurant owners identify the best areas to open a new restaurant in New York City. It analyzes foot traffic, competition, and proximity to points of interest using open-source APIs.

## 🚀 Project Overview

Originally intended as a Python data analysis project, SpotIQ evolved into an interactive Next.js application offering real-time location scoring, map visualizations, and actionable business insights.

## 📍 Key Features

- Interactive area selection from popular NYC neighborhoods.
- Live scoring based on:
  -  Foot traffic (NYC Open Data pedestrian counts)
  -  Proximity to offices, institutions, and transit
  -  Direct and indirect restaurant competition
- Real-time map highlighting for the best zones
- Insight breakdown explaining the score

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS, Leaflet.js
- **UI Kit**: `shadcn/ui` components
- **APIs & Data**:
  - OpenStreetMap & Overpass API for POIs
  - NYC Open Data (pedestrian foot traffic)
- **Scoring Engine**: Custom logic using POI density, pedestrian normalization, and weighted factors
- **Hosting**: Vercel

---

## 🔮 Future Plans

- Add visualizations: bar graphs, heatmaps, score comparisons
- Integrate area-level demographics (e.g. residents vs. professionals)
- Add ROI estimators or cost predictors per area
- Expand to support other cities (Mumbai, Chicago, etc.)
- Improve performance and Overpass API latency
- Reintroduce Python-based clustering and ML scoring as an enhancement layer

---
