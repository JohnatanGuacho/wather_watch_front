import * as L from 'leaflet';
import { PrecipPoint } from '../models/api.types';

export function haversine(from: {lat: number; lon: number}, to: {lat: number; lon: number}): number {
  const R = 6371; // Earth radius in km
  const dLat = (to.lat - from.lat) * Math.PI / 180;
  const dLon = (to.lon - from.lon) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  return Math.round(2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 100) / 100;
}

export function fitMapToWaterBodies(map: L.Map, features: GeoJSON.Feature[]): void {
  if (!features.length) return;
  
  const group = L.featureGroup();
  features.forEach(feature => {
    L.geoJSON(feature).addTo(group);
  });
  
  map.fitBounds(group.getBounds(), { padding: [20, 20] });
}

export function mmTotal(serie: PrecipPoint[]): number {
  return Math.round(serie.reduce((sum, point) => sum + point.mm, 0) * 100) / 100;
}

export function classToEmoji(cls: 'sequía' | 'normal' | 'inundación'): string {
  const emojis = {
    'sequía': '🌵',
    'normal': '☁️',
    'inundación': '🌊'
  };
  return emojis[cls];
}