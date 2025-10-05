import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem;">
      <h2>Configuración</h2>
      <p>Ajustes de la aplicación en desarrollo...</p>
    </div>
  `
})
export class SettingsComponent {}