import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PopulationService {
  constructor(private api: ApiService) {}

  getDensity(bbox: any): Observable<GeoJSON.FeatureCollection> {
    const query = new URLSearchParams({
      bbox: JSON.stringify(bbox)
    });
    return this.api.get<GeoJSON.FeatureCollection>(`/population/density?${query}`);
  }
}