export type RangeDays = 7 | 14 | 30;

export interface BBox {
  minLat: number;
  minLon: number;
  maxLat: number;
  maxLon: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface City {
  name: string;
  lat: number;
  lon: number;
}

export interface WaterBody {
  id: string;
  name: string;
  type: 'lake' | 'river' | 'wetland' | 'reservoir' | 'lagoon';
  areaKm2?: number;
  city?: string;
  geom: GeoJSON.Geometry;
}

export interface WaterQualityPoint {
  date: string;
  chlor_a_mg_m3?: number;
  kd490_m_inv?: number;
  sm_surface?: number;
  grace_groundwater_pct?: number;
}

export interface PrecipPoint {
  date: string;
  mm: number;
}

export interface ResilienceIndex {
  score: number;
  class: 'sequía' | 'normal' | 'inundación';
  drivers: {
    lluvia: number;
    cuerposAgua: number;
    poblacion?: number;
  };
}

export interface Alert {
  id: string;
  name: string;
  metric: 'CHLOR_A' | 'KD490' | 'SEQUIA' | 'LLUVIA';
  operator: '>=' | '<=';
  threshold: number;
  color?: string;
  active: boolean;
  waterBodyId?: string;
}