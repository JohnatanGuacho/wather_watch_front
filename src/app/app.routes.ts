import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'map',
    loadComponent: () => import('./features/map/water-map.component').then(m => m.WaterMapComponent)
  },
  {
    path: 'quality/:id',
    loadComponent: () => import('./features/quality/water-quality-detail.component').then(m => m.WaterQualityDetailComponent)
  },
  {
    path: 'alerts',
    loadComponent: () => import('./features/alerts/alerts-page.component').then(m => m.AlertsPageComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];