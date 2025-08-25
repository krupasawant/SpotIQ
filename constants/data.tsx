export const AREA_GROUPS = [
  {
    label: "Manhattan",
    areas: [
      "Financial District",
      "Battery Park",
      "Tribeca",
      "SoHo",
      "Chelsea",
      "Midtown",
      "Upper East Side",
      "Upper West Side",
      "Harlem",
    ],
  },
  {
    label: "Brooklyn",
    areas: [
      "Williamsburg",
      "Bushwick",
      "DUMBO",
      "Brooklyn Heights",
      "Park Slope",
      "Greenpoint",
      "Coney Island",
    ],
  },
  {
    label: "Queens",
    areas: [
      "Astoria",
      "Long Island City",
      "Flushing",
      "Jamaica",
      "Forest Hills",
    ],
  },
  {
    label: "Bronx",
    areas: ["South Bronx", "Fordham", "Riverdale", "Pelham Bay"],
  },
  {
    label: "Staten Island",
    areas: ["St. George", "Tottenville", "New Dorp"],
  },
];

export const CUISINES = [
  "Indian",
  "Italian",
  "Chinese",
  "Japanese",
  "American",
  "Fast Food",
  "Vegan",
  "Vegetarian",
  "Thai",
  "Korean",
  "Mexican",
  "Middle Eastern"
];


export const BUDGET_LEVELS = ["₹", "₹₹", "₹₹₹"];
export const AUDIENCES = ["Youth", "Families", "Professionals"];

export const FOOT_TRAFFIC_SCORE = {
  Low: 1,
  Medium: 2,
  High: 3,
};

export const COMPETITION_SCORE = {
  Low: 3,
  Medium: 2,
  High: 1,
};

export const TARGET_AUDIENCE_SCORE = {
  Local: 2,
  Tourists: 3,
  Mixed: 3,
};


export const WEIGHTS = {
  footTraffic: 0.4,
  competition: 0.3,
  targetAudience: 0.3,
};
