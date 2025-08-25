export type POICategory = {
  name: string;
  tags: string[];
  weight: number;
  cap: number,
  radius: number; 
  description: string;
}


export interface POIConfig {
  [key: string]: POICategory;
}


export const getDynamicPOIConfig = (cuisine?: string): POIConfig => ({
  // High-impact lunch crowd generators
  offices: {
    name: "Offices & Business",
    tags: [
      'node["office"]',
      'way["office"]', 
      'way["building"="office"]',
      'node["amenity"="coworking_space"]'
    ],
    weight: 0.25,
    cap: 100,
    radius: 500,
    description: "Generates consistent lunch traffic"
  },

  // direct competitors are restaurants w same cuisine not great
  directCompetition: {
    name: "Direct Cuisine Competitors",
    tags: [
      `node["amenity"="restaurant"]["cuisine"~"${cuisine}", i]`,
      `way["amenity"="restaurant"]["cuisine"~"${cuisine}", i]`
    ],
    weight: -0.2,
    cap: 50,
    radius: 300,
    description: `Restaurants with cuisine type "${cuisine}"`
  },

  // indirect competitions - all restaurants, cafes that dont't serve same cuisine

  indirectCompetition: {
    name: "Indirect Restaurants, Cafes & Bars",
    tags: [
      `node["amenity"~"restaurant|fast_food|cafe|bar"]["cuisine"!~"${cuisine}", i]`,
      `way["amenity"~"restaurant|fast_food|cafe|bar"]["cuisine"!~"${cuisine}", i]`
    ],
    weight: 0.1, // still adds footfall
    cap: 500,
    radius: 300,
    description: "Other food places adding general traffic"
  },

  // Transit accessibility
  transit: {
    name: "Public Transit",
    tags: [
      'node["public_transport"~"station|stop_position"]',
      'node["railway"="subway_entrance"]', 
      'node["highway"="bus_stop"]'
    ],
    weight: 0.3,
    cap:300,
    radius: 200,
    description: "Easy customer access via public transport"
  },

  // Evening/weekend traffic
  entertainment: {
    name: "Entertainment & Tourism",
    tags: [
      'node["amenity"~"cinema|theatre"]',
      'way["amenity"~"cinema|theatre"]',
      'node["tourism"~"attraction|museum"]',
      'way["tourism"~"attraction|museum"]'
    ],
    weight: 0.15,
    cap:50,
    radius: 800,
    description: "Drives dinner and weekend traffic"
  },

  // High-volume institutions
  institutions: {
    name: "Healthcare & Education",
    tags: [
      'node["amenity"~"hospital|clinic|university|school"]',
      'way["amenity"~"hospital|clinic|university|school"]'
    ],
    weight: 0.2,
    cap:100,
    radius: 1000,
    description: "Steady foot traffic from staff, students, visitors"
  },

  pedestrianTraffic: {
  name: "Pedestrian Foot Traffic",
  tags: [], // no Overpass API tags needed
  weight: 0.3, 
  cap: 6000,   
  radius: 0, 
  description: "Average foot traffic from NYC open data points"
}


});