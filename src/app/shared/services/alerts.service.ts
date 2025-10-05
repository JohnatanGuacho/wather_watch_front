import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Alert } from '../models/api.types';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor(private api: ApiService) {}

  list(): Observable<Alert[]> {
    return this.api.get<Alert[]>('/alerts');
  }

  create(dto: Partial<Alert>): Observable<Alert> {
    return this.api.post<Alert>('/alerts', dto);
  }

  update(id: string, dto: Partial<Alert>): Observable<Alert> {
    return this.api.put<Alert>(`/alerts/${id}`, dto);
  }

  remove(id: string): Observable<void> {
    return this.api.delete<void>(`/alerts/${id}`);
  }
}