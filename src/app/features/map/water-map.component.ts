import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-water-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem;">
      <h2>Mapa de Agua</h2>
      <p>Funcionalidad del mapa en desarrollo...</p>
      <div id="map" style="height: 400px; background: #e0e0e0; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center;">
        Mapa se cargará aquí
      </div>
    </div>
  `
})
export class WaterMapComponent {}