import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResilienceIndex } from '../../shared/models/api.types';

@Component({
  selector: 'app-resilience-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="resilience-panel">
      <h3>Análisis de Resiliencia Hídrica</h3>
      
      <div class="current-status" *ngIf="currentData">
        <div class="status-card" [class]="currentData.class">
          <div class="score-section">
            <span class="score-value">{{currentData.score | number:'1.2-2'}}</span>
            <span class="score-label">Índice de Resiliencia</span>
          </div>
          <div class="classification">
            <span class="class-label">{{getClassLabel(currentData.class)}}</span>
            <div class="risk-indicator" [class]="currentData.class"></div>
          </div>
        </div>
      </div>

      <div class="drivers-breakdown" *ngIf="currentData">
        <h4>Componentes del Análisis</h4>
        <div class="driver-bars">
          <div class="driver-item">
            <span class="driver-label">Precipitación</span>
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="currentData.drivers.lluvia * 100"></div>
            </div>
            <span class="driver-value">{{currentData.drivers.lluvia | number:'1.2-2'}}</span>
          </div>
          <div class="driver-item">
            <span class="driver-label">Cuerpos de Agua</span>
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="currentData.drivers.cuerposAgua * 100"></div>
            </div>
            <span class="driver-value">{{currentData.drivers.cuerposAgua | number:'1.2-2'}}</span>
          </div>
          <div class="driver-item" *ngIf="currentData.drivers.poblacion">
            <span class="driver-label">Densidad Poblacional</span>
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="currentData.drivers.poblacion * 100"></div>
            </div>
            <span class="driver-value">{{currentData.drivers.poblacion | number:'1.2-2'}}</span>
          </div>
        </div>
      </div>

      <div class="trend-chart" *ngIf="historicalData?.length">
        <h4>Tendencia (últimos 7 días)</h4>
        <div class="mini-chart">
          <div class="chart-line">
            <div *ngFor="let point of historicalData; let i = index" 
                 class="chart-point" 
                 [style.left.%]="(i / (historicalData.length - 1)) * 100"
                 [style.bottom.%]="point.score * 100"
                 [class]="point.class">
            </div>
          </div>
        </div>
      </div>

      <div class="recommendations">
        <h4>Recomendaciones</h4>
        <div class="recommendation-list">
          <div *ngFor="let rec of getRecommendations()" class="recommendation-item">
            {{rec}}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .resilience-panel { background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .status-card { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-radius: 8px; margin: 1rem 0; }
    .status-card.sequía { background: linear-gradient(135deg, #ffebee, #ffcdd2); border-left: 4px solid #f44336; }
    .status-card.normal { background: linear-gradient(135deg, #e8f5e8, #c8e6c9); border-left: 4px solid #4caf50; }
    .status-card.inundación { background: linear-gradient(135deg, #fff3e0, #ffe0b2); border-left: 4px solid #ff9800; }
    .score-section { text-align: center; }
    .score-value { font-size: 2rem; font-weight: bold; display: block; }
    .score-label { font-size: 0.9rem; color: #666; }
    .classification { text-align: right; }
    .class-label { font-weight: bold; display: block; margin-bottom: 0.5rem; }
    .risk-indicator { width: 20px; height: 20px; border-radius: 50%; margin-left: auto; }
    .risk-indicator.sequía { background: #f44336; }
    .risk-indicator.normal { background: #4caf50; }
    .risk-indicator.inundación { background: #ff9800; }
    .drivers-breakdown { margin: 1.5rem 0; }
    .driver-item { display: grid; grid-template-columns: 120px 1fr 60px; align-items: center; gap: 1rem; margin: 0.5rem 0; }
    .progress-bar { height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, #4caf50, #2196f3); transition: width 0.3s ease; }
    .driver-value { text-align: right; font-weight: bold; }
    .mini-chart { position: relative; height: 60px; background: #f5f5f5; border-radius: 4px; margin: 1rem 0; }
    .chart-line { position: relative; width: 100%; height: 100%; }
    .chart-point { position: absolute; width: 6px; height: 6px; border-radius: 50%; transform: translate(-50%, 50%); }
    .chart-point.sequía { background: #f44336; }
    .chart-point.normal { background: #4caf50; }
    .chart-point.inundación { background: #ff9800; }
    .recommendation-list { background: #f8f9fa; padding: 1rem; border-radius: 4px; }
    .recommendation-item { margin: 0.5rem 0; padding: 0.5rem; background: white; border-radius: 4px; font-size: 0.9rem; }
  `]
})
export class ResiliencePanelComponent implements OnChanges {
  @Input() currentData: ResilienceIndex | null = null;
  @Input() historicalData: ResilienceIndex[] = [];

  ngOnChanges() {
    // Actualizar visualización cuando cambien los datos
  }

  getClassLabel(classification: string): string {
    const labels = {
      'sequía': 'Riesgo de Sequía',
      'normal': 'Condiciones Normales',
      'inundación': 'Riesgo de Inundación'
    };
    return labels[classification as keyof typeof labels] || classification;
  }

  getRecommendations(): string[] {
    if (!this.currentData) return [];
    
    const recommendations: string[] = [];
    
    if (this.currentData.class === 'sequía') {
      recommendations.push('Implementar medidas de conservación de agua');
      recommendations.push('Monitorear niveles de cuerpos de agua cercanos');
      recommendations.push('Activar protocolos de emergencia hídrica');
    } else if (this.currentData.class === 'inundación') {
      recommendations.push('Revisar sistemas de drenaje urbano');
      recommendations.push('Preparar planes de evacuación preventiva');
      recommendations.push('Monitorear cauces y niveles de ríos');
    } else {
      recommendations.push('Mantener monitoreo regular de condiciones');
      recommendations.push('Continuar con planes de gestión hídrica');
    }
    
    return recommendations;
  }
}