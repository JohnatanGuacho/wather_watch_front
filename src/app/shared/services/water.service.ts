import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { WaterBody, WaterQualityPoint } from '../models/api.types';

interface WaterBodiesParams {
  city?: string;
  lat: number;
  lon: number;
  radiusKm: number;
}

@Injectable({
  providedIn: 'root'
})
export class WaterService {
  constructor(private api: ApiService) {}

  getWaterBodies(params: WaterBodiesParams): Observable<WaterBody[]> {
    const query = new URLSearchParams({
      lat: params.lat.toString(),
      lon: params.lon.toString(),
      radiusKm: params.radiusKm.toString(),
      ...(params.city && { city: params.city })
    });
    return this.api.get<WaterBody[]>(`/water/bodies?${query}`);
  }

  getWaterBody(id: string): Observable<WaterBody> {
    return this.api.get<WaterBody>(`/water/bodies/${id}`);
  }

  getLatestQuality(waterBodyId: string): Observable<WaterQualityPoint> {
    return this.api.get<WaterQualityPoint>(`/water/bodies/${waterBodyId}/quality/latest`);
  }
}