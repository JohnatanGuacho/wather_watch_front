import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertsService } from '../../shared/services/alerts.service';
import { ResilienceService } from '../../shared/services/resilience.service';
import { Alert, ResilienceIndex, BBox } from '../../shared/models/api.types';
import { ResiliencePanelComponent } from './resilience-panel.component';
import { ActiveAlertsComponent } from './active-alerts.component';

@Component({
  selector: 'app-alerts-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ResiliencePanelComponent, ActiveAlertsComponent],
  template: `
    <div class="alerts-container">
      <div class="header">
        <h2>Gestión de Alertas Hídricas</h2>
        <button class="btn-primary" (click)="showCreateForm = !showCreateForm">
          + Nueva Alerta
        </button>
      </div>

      <div class="dashboard-grid">
        <div class="main-content">
          <app-active-alerts></app-active-alerts>

      <div class="create-form" *ngIf="showCreateForm">
        <h3>Crear Alerta</h3>
        <form (ngSubmit)="createAlert()">
          <input [(ngModel)]="newAlert.name" name="name" placeholder="Nombre de la alerta" required>
          <select [(ngModel)]="newAlert.metric" name="metric" required>
            <option value="SEQUIA">Riesgo de Sequía</option>
            <option value="LLUVIA">Precipitación Excesiva</option>
            <option value="CHLOR_A">Calidad del Agua (Clorofila-a)</option>
          </select>
          <select [(ngModel)]="newAlert.operator" name="operator" required>
            <option value=">=">Mayor o igual a</option>
            <option value="<=">Menor o igual a</option>
          </select>
          <input [(ngModel)]="newAlert.threshold" name="threshold" type="number" step="0.1" placeholder="Umbral" required>
          <input [(ngModel)]="newAlert.color" name="color" type="color" value="#ff4444">
          <button type="submit">Crear</button>
          <button type="button" (click)="showCreateForm = false">Cancelar</button>
        </form>
      </div>

      <div class="alerts-grid">
        <div class="alert-card" *ngFor="let alert of alerts" [class.inactive]="!alert.active">
          <div class="alert-header">
            <span class="alert-name">{{alert.name}}</span>
            <div class="alert-controls">
              <button class="toggle-btn" (click)="toggleAlert(alert)">
                {{alert.active ? 'Desactivar' : 'Activar'}}
              </button>
              <button class="delete-btn" (click)="deleteAlert(alert.id)">×</button>
            </div>
          </div>
          <div class="alert-details">
            <span class="metric">{{getMetricLabel(alert.metric)}}</span>
            <span class="condition">{{alert.operator}} {{alert.threshold}}</span>
            <div class="status-indicator" [style.background-color]="alert.color"></div>
          </div>
        </div>
      </div>

        </div>
        <div class="side-panel">
          <app-resilience-panel 
            [currentData]="resilienceData" 
            [historicalData]="resilienceHistory">
          </app-resilience-panel>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .alerts-container { padding: 1.5rem; max-width: 1400px; margin: 0 auto; }
    .dashboard-grid { display: grid; grid-template-columns: 1fr 400px; gap: 2rem; margin-top: 1rem; }
    .main-content { min-height: 600px; }
    .side-panel { }
    @media (max-width: 1024px) {
      .dashboard-grid { grid-template-columns: 1fr; }
    }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .btn-primary { background: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
    .create-form { background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; }
    .create-form form { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
    .create-form input, .create-form select { padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; }
    .alerts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .alert-card { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 1rem; }
    .alert-card.inactive { opacity: 0.6; }
    .alert-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .alert-name { font-weight: bold; }
    .alert-controls { display: flex; gap: 0.5rem; }
    .toggle-btn { background: #28a745; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; }
    .delete-btn { background: #dc3545; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; }
    .alert-details { display: flex; justify-content: space-between; align-items: center; }
    .status-indicator { width: 12px; height: 12px; border-radius: 50%; }
    .resilience-summary { background: #f8f9fa; padding: 1.5rem; border-radius: 8px; }
    .resilience-card { background: white; padding: 1rem; border-radius: 8px; border-left: 4px solid #007bff; }
    .resilience-card.sequía { border-left-color: #dc3545; }
    .resilience-card.inundación { border-left-color: #ffc107; }
    .score { font-size: 1.2rem; font-weight: bold; }
    .classification { color: #666; margin: 0.5rem 0; }
    .drivers { display: flex; gap: 1rem; font-size: 0.9rem; }
  `]
})
export class AlertsPageComponent implements OnInit {
  alerts: Alert[] = [];
  showCreateForm = false;
  resilienceData: ResilienceIndex | null = null;
  resilienceHistory: ResilienceIndex[] = [];
  currentBbox: BBox = { minLat: -34.7, maxLat: -34.5, minLon: -58.5, maxLon: -58.3 }; // Buenos Aires por defecto
  
  newAlert: Partial<Alert> = {
    name: '',
    metric: 'SEQUIA',
    operator: '>=',
    threshold: 0,
    color: '#ff4444',
    active: true
  };

  constructor(
    private alertsService: AlertsService,
    private resilienceService: ResilienceService
  ) {}

  ngOnInit() {
    this.loadAlerts();
    this.loadResilienceData();
  }

  loadAlerts() {
    this.alertsService.list().subscribe(alerts => this.alerts = alerts);
  }

  createAlert() {
    this.alertsService.create(this.newAlert).subscribe(() => {
      this.loadAlerts();
      this.showCreateForm = false;
      this.resetForm();
    });
  }

  toggleAlert(alert: Alert) {
    this.alertsService.update(alert.id, { active: !alert.active }).subscribe(() => {
      this.loadAlerts();
    });
  }

  deleteAlert(id: string) {
    this.alertsService.remove(id).subscribe(() => this.loadAlerts());
  }

  resetForm() {
    this.newAlert = { name: '', metric: 'SEQUIA', operator: '>=', threshold: 0, color: '#ff4444', active: true };
  }

  getMetricLabel(metric: string): string {
    const labels = {
      'SEQUIA': 'Sequía',
      'LLUVIA': 'Precipitación',
      'CHLOR_A': 'Clorofila-a'
    };
    return labels[metric as keyof typeof labels] || metric;
  }

  getClassLabel(classification: string): string {
    const labels = {
      'sequía': 'Riesgo de Sequía',
      'normal': 'Condiciones Normales',
      'inundación': 'Riesgo de Inundación'
    };
    return labels[classification as keyof typeof labels] || classification;
  }

  loadResilienceData() {
    this.resilienceService.calculateResilience(this.currentBbox).subscribe({
      next: (data) => this.resilienceData = data,
      error: () => {
        // Fallback con datos simulados
        this.resilienceData = {
          score: 0.65,
          class: 'normal',
          drivers: { lluvia: 0.7, cuerposAgua: 0.6 }
        };
      }
    });
    
    this.resilienceService.getResilienceHistory(this.currentBbox, 7).subscribe({
      next: (history) => this.resilienceHistory = history,
      error: () => {
        // Fallback con datos simulados
        this.resilienceHistory = Array.from({length: 7}, (_, i) => ({
          score: 0.6 + Math.random() * 0.3,
          class: ['normal', 'sequía', 'inundación'][Math.floor(Math.random() * 3)] as any,
          drivers: { lluvia: Math.random(), cuerposAgua: Math.random() }
        }));
      }
    });
  }
}