import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { City } from '../models/api.types';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor(private api: ApiService) {}

  getCities(): Observable<City[]> {
    return this.api.get<City[]>('/cities');
  }
}