import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City, RangeDays } from '../models/api.types';

interface CapasVisibles {
  lluvia: boolean;
  agua: boolean;
  poblacion: boolean;
  gibs: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private ciudadActivaSubject = new BehaviorSubject<City | null>(this.getFromStorage('ciudadActiva'));
  private rangoDiasSubject = new BehaviorSubject<RangeDays>(this.getFromStorage('rangoDias') || 7);
  private fechaGibsSubject = new BehaviorSubject<string>(this.getFromStorage('fechaGibs') || '2025-10-01');
  private opacidadGibsSubject = new BehaviorSubject<number>(this.getFromStorage('opacidadGibs') || 0.7);
  private capasVisiblesSubject = new BehaviorSubject<CapasVisibles>(
    this.getFromStorage('capasVisibles') || { lluvia: true, agua: true, poblacion: false, gibs: true }
  );

  ciudadActiva$ = this.ciudadActivaSubject.asObservable();
  rangoDias$ = this.rangoDiasSubject.asObservable();
  fechaGibs$ = this.fechaGibsSubject.asObservable();
  opacidadGibs$ = this.opacidadGibsSubject.asObservable();
  capasVisibles$ = this.capasVisiblesSubject.asObservable();

  setCiudadActiva(ciudad: City | null) {
    this.ciudadActivaSubject.next(ciudad);
    this.saveToStorage('ciudadActiva', ciudad);
  }

  setRangoDias(rango: RangeDays) {
    this.rangoDiasSubject.next(rango);
    this.saveToStorage('rangoDias', rango);
  }

  setFechaGibs(fecha: string) {
    this.fechaGibsSubject.next(fecha);
    this.saveToStorage('fechaGibs', fecha);
  }

  setOpacidadGibs(opacidad: number) {
    this.opacidadGibsSubject.next(opacidad);
    this.saveToStorage('opacidadGibs', opacidad);
  }

  setCapasVisibles(capas: CapasVisibles) {
    this.capasVisiblesSubject.next(capas);
    this.saveToStorage('capasVisibles', capas);
  }

  getCiudadActiva(): City | null {
    return this.ciudadActivaSubject.value;
  }

  getRangoDias(): RangeDays {
    return this.rangoDiasSubject.value;
  }

  getFechaGibs(): string {
    return this.fechaGibsSubject.value;
  }

  getOpacidadGibs(): number {
    return this.opacidadGibsSubject.value;
  }

  getCapasVisibles(): CapasVisibles {
    return this.capasVisiblesSubject.value;
  }

  private saveToStorage(key: string, value: any) {
    localStorage.setItem(`uwg_${key}`, JSON.stringify(value));
  }

  private getFromStorage(key: string): any {
    const item = localStorage.getItem(`uwg_${key}`);
    return item ? JSON.parse(item) : null;
  }
}