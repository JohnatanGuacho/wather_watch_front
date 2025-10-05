import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ApiService } from './api.service';
import { ResilienceIndex, BBox } from '../models/api.types';

@Injectable({
  providedIn: 'root'
})
export class ResilienceService {
  constructor(private api: ApiService) {}

  calculateResilience(bbox: BBox): Observable<ResilienceIndex> {
    return this.api.post<ResilienceIndex>('/analysis/resilience', { bbox });
  }

  getResilienceHistory(bbox: BBox, days: number = 30): Observable<ResilienceIndex[]> {
    const params = new URLSearchParams({
      days: days.toString(),
      minLat: bbox.minLat.toString(),
      maxLat: bbox.maxLat.toString(),
      minLon: bbox.minLon.toString(),
      maxLon: bbox.maxLon.toString()
    });
    return this.api.get<ResilienceIndex[]>(`/analysis/resilience/history?${params}`);
  }

  checkAlertConditions(bbox: BBox): Observable<{alertId: string, triggered: boolean, value: number}[]> {
    return this.api.post<any[]>('/alerts/check', { bbox });
  }
}