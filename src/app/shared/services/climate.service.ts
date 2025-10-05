import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PrecipPoint, ResilienceIndex, RangeDays } from '../models/api.types';

interface PrecipParams {
  city?: string;
  lat: number;
  lon: number;
  rangeDays: RangeDays;
}

interface ResilienceParams {
  city?: string;
  lat: number;
  lon: number;
  rangeDays: RangeDays;
}

@Injectable({
  providedIn: 'root'
})
export class ClimateService {
  constructor(private api: ApiService) {}

  getPrecipitation(params: PrecipParams): Observable<PrecipPoint[] | {bbox: any; cells: {lat: number; lon: number; value: number}[]}> {
    const query = new URLSearchParams({
      lat: params.lat.toString(),
      lon: params.lon.toString(),
      rangeDays: params.rangeDays.toString(),
      ...(params.city && { city: params.city })
    });
    return this.api.get(`/climate/precipitation?${query}`);
  }

  getResilienceIndex(params: ResilienceParams): Observable<ResilienceIndex> {
    const query = new URLSearchParams({
      lat: params.lat.toString(),
      lon: params.lon.toString(),
      rangeDays: params.rangeDays.toString(),
      ...(params.city && { city: params.city })
    });
    return this.api.get<ResilienceIndex>(`/climate/resilience?${query}`);
  }
}