import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { AlertsService } from '../../shared/services/alerts.service';
import { ResilienceService } from '../../shared/services/resilience.service';

interface ActiveAlert {
  id: string;
  name: string;
  metric: string;
  value: number;
  threshold: number;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
}

@Component({
  selector: 'app-active-alerts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="active-alerts-widget">
      <div class="widget-header">
        <h4>Alertas Activas</h4>
        <span class="alert-count" [class.has-alerts]="activeAlerts.length > 0">
          {{activeAlerts.length}}
        </span>
      </div>
      
      <div class="alerts-list" *ngIf="activeAlerts.length > 0; else noAlerts">
        <div *ngFor="let alert of activeAlerts" 
             class="alert-item" 
             [class]="alert.severity">
          <div class="alert-icon">⚠️</div>
          <div class="alert-content">
            <div class="alert-title">{{alert.name}}</div>
            <div class="alert-details">
              {{getMetricLabel(alert.metric)}}: {{alert.value | number:'1.2-2'}} 
              (umbral: {{alert.threshold | number:'1.2-2'}})
            </div>
            <div class="alert-time">{{alert.timestamp | date:'short'}}</div>
          </div>
          <div class="alert-actions">
            <button class="dismiss-btn" (click)="dismissAlert(alert.id)">✕</button>
          </div>
        </div>
      </div>
      
      <ng-template #noAlerts>
        <div class="no-alerts">
          <div class="no-alerts-icon">✅</div>
          <div class="no-alerts-text">No hay alertas activas</div>
        </div>
      </ng-template>
      
      <div class="last-check">
        Última verificación: {{lastCheck | date:'mediumTime'}}
      </div>
    </div>
  `,
  styles: [`
    .active-alerts-widget {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-height: 400px;
      overflow-y: auto;
    }
    
    .widget-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #eee;
    }
    
    .alert-count {
      background: #e9ecef;
      color: #6c757d;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: bold;
    }
    
    .alert-count.has-alerts {
      background: #dc3545;
      color: white;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.7; }
      100% { opacity: 1; }
    }
    
    .alert-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.75rem;
      margin: 0.5rem 0;
      border-radius: 6px;
      border-left: 4px solid;
    }
    
    .alert-item.low {
      background: #fff3cd;
      border-left-color: #ffc107;
    }
    
    .alert-item.medium {
      background: #f8d7da;
      border-left-color: #fd7e14;
    }
    
    .alert-item.high {
      background: #f5c6cb;
      border-left-color: #dc3545;
    }
    
    .alert-icon {
      font-size: 1.2rem;
      margin-top: 0.1rem;
    }
    
    .alert-content {
      flex: 1;
    }
    
    .alert-title {
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    
    .alert-details {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.25rem;
    }
    
    .alert-time {
      font-size: 0.8rem;
      color: #999;
    }
    
    .dismiss-btn {
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
    }
    
    .dismiss-btn:hover {
      background: rgba(0,0,0,0.1);
    }
    
    .no-alerts {
      text-align: center;
      padding: 2rem 1rem;
      color: #6c757d;
    }
    
    .no-alerts-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .last-check {
      text-align: center;
      font-size: 0.8rem;
      color: #999;
      margin-top: 1rem;
      padding-top: 0.5rem;
      border-top: 1px solid #eee;
    }
  `]
})
export class ActiveAlertsComponent implements OnInit, OnDestroy {
  activeAlerts: ActiveAlert[] = [];
  lastCheck: Date = new Date();
  private checkInterval?: Subscription;

  constructor(
    private alertsService: AlertsService,
    private resilienceService: ResilienceService
  ) {}

  ngOnInit() {
    this.checkAlerts();
    // Verificar alertas cada 5 minutos
    this.checkInterval = interval(300000).subscribe(() => this.checkAlerts());
  }

  ngOnDestroy() {
    this.checkInterval?.unsubscribe();
  }

  checkAlerts() {
    // Simular verificación de alertas - integrar con API real
    const mockAlerts: ActiveAlert[] = [
      {
        id: '1',
        name: 'Riesgo de Sequía Moderado',
        metric: 'SEQUIA',
        value: 0.3,
        threshold: 0.4,
        severity: 'medium',
        timestamp: new Date()
      }
    ];
    
    this.activeAlerts = mockAlerts;
    this.lastCheck = new Date();
  }

  dismissAlert(alertId: string) {
    this.activeAlerts = this.activeAlerts.filter(alert => alert.id !== alertId);
  }

  getMetricLabel(metric: string): string {
    const labels = {
      'SEQUIA': 'Índice de Sequía',
      'LLUVIA': 'Precipitación',
      'CHLOR_A': 'Clorofila-a'
    };
    return labels[metric as keyof typeof labels] || metric;
  }
}