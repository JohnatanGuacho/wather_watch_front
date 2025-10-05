import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="hero">
      <div class="hero-bg"></div>
      <div class="stars"></div>
      
      <div class="hero-content">
        <div class="hero-badge">
          <span>🛡️ Sistema de Monitoreo Avanzado</span>
        </div>
        
        <h1 class="hero-title">
          <span class="title-main">URBAN WATER</span>
          <span class="title-accent">GUARD</span>
        </h1>
        
        <p class="hero-subtitle">
          Plataforma que usa datos satelitales y abiertos para identificar zonas urbanas vulnerables a sequías o inundaciones
          <br>
          <span class="subtitle-accent">Apoyando decisiones de planificación urbana sostenible</span>
        </p>
        
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">🌧️</span>
            <span class="stat-label">Precipitación</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">🌊</span>
            <span class="stat-label">Cuerpos de Agua</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">🛰️</span>
            <span class="stat-label">Datos NASA</span>
          </div>
        </div>
        
        <div class="hero-actions">
          <a routerLink="/map" class="btn-primary">
            🗺️ Abrir Mapa Interactivo
          </a>
          <a routerLink="/alerts" class="btn-secondary">
            📊 Ver Análisis de Resiliencia
          </a>
        </div>
      </div>
    </div>

    <section class="features">
      <div class="container">
        <h2>¿Qué Visualizas en el Mapa?</h2>
        <p>Ayudamos a planificadores urbanos y gestores ambientales a identificar vulnerabilidades hídricas</p>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon drought">🌧️</div>
            <h3>Dónde está lloviendo demasiado o muy poco</h3>
            <p>Visualiza patrones de precipitación usando datos NASA POWER y Open-Meteo para identificar zonas de riesgo</p>
            <div class="feature-metrics">
              <span class="metric">NASA POWER</span>
              <span class="metric">Histórico 7-30 días</span>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon flood">🌊</div>
            <h3>Qué cuerpos de agua están en riesgo</h3>
            <p>Mapea ríos, lagos y humedales usando datos Overpass-OSM para evaluar su vulnerabilidad climática</p>
            <div class="feature-metrics">
              <span class="metric">Overpass-OSM</span>
              <span class="metric">Tiempo real</span>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon quality">🏙️</div>
            <h3>Cómo afecta la resiliencia urbana</h3>
            <p>Calcula un índice de resiliencia hídrica combinando lluvia, cuerpos de agua y densidad poblacional</p>
            <div class="feature-metrics">
              <span class="metric">Índice personalizado</span>
              <span class="metric">Planificación urbana</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="workflow">
      <div class="container">
        <h2>🛠️ Flujo de Trabajo</h2>
        <div class="workflow-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Selecciona tu Ciudad</h4>
              <p>Ingresa coordenadas o busca ciudades como Bogotá, Quito, Ríobamba</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Configura el Análisis</h4>
              <p>Selecciona rango de días (7, 14, 30) para el análisis de precipitación</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Visualiza Resultados</h4>
              <p>Observa capas de lluvia, cuerpos de agua y fondo satelital NASA</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Genera Reporte</h4>
              <p>Exporta datos en JSON/PDF con índice de resiliencia y recomendaciones</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="nasa-resources">
      <div class="container">
        <h2>🛰️ Recursos NASA Integrados</h2>
        <div class="resources-grid">
          <div class="resource-card">
            <div class="resource-icon">🌍</div>
            <h4>NASA Worldview (GIBS)</h4>
            <p>Imágenes satelitales de fondo usando tile layers para contexto visual</p>
          </div>
          
          <div class="resource-card">
            <div class="resource-icon">⚡</div>
            <h4>NASA POWER API</h4>
            <p>Datos históricos de lluvia y temperatura como alternativa a Open-Meteo</p>
          </div>
          
          <div class="resource-card">
            <div class="resource-icon">📊</div>
            <h4>Datasets Abiertos</h4>
            <p>WorldPop, Copernicus y GHSL para densidad poblacional y uso de suelo</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      --nasa-blue: #0B3D91;
      --nasa-red: #FC3D21;
      --space-black: #020611;
      --midnight: #030b1a;
      --star: #E6F1FF;
      --glow: rgba(12, 102, 255, 0.35);
      --accent-blue: #1E88E5;
      
      display: block;
      min-height: 100vh;
      background: var(--space-black);
      color: var(--star);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .hero {
      position: relative;
      min-height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: linear-gradient(180deg, var(--midnight), var(--space-black));
    }

    .hero-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 30% 20%, rgba(11, 61, 145, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 70% 80%, rgba(252, 61, 33, 0.2) 0%, transparent 50%);
      opacity: 0.6;
    }

    .stars {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(2px 2px at 20px 30px, var(--star), transparent),
        radial-gradient(2px 2px at 40px 70px, var(--star), transparent),
        radial-gradient(1px 1px at 90px 40px, var(--star), transparent);
      background-repeat: repeat;
      background-size: 200px 100px;
      animation: twinkle 4s ease-in-out infinite alternate;
    }

    .hero-content {
      text-align: center;
      z-index: 2;
      max-width: 900px;
      padding: 2rem;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(230, 241, 255, 0.1);
      border: 1px solid rgba(230, 241, 255, 0.2);
      border-radius: 50px;
      padding: 0.5rem 1rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      backdrop-filter: blur(10px);
    }

    .hero-title {
      font-size: clamp(2.5rem, 8vw, 4.5rem);
      font-weight: 900;
      margin-bottom: 1.5rem;
      letter-spacing: 1px;
      line-height: 1.1;
    }

    .title-main {
      display: block;
      color: var(--star);
      text-shadow: 0 0 20px var(--glow), 0 0 40px var(--glow);
    }

    .title-accent {
      display: block;
      background: linear-gradient(135deg, var(--nasa-blue), var(--accent-blue));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: clamp(1.1rem, 3vw, 1.3rem);
      margin-bottom: 2rem;
      opacity: 0.9;
      line-height: 1.6;
    }

    .subtitle-accent {
      display: block;
      font-size: 0.9em;
      color: var(--accent-blue);
      margin-top: 0.5rem;
      font-weight: 500;
    }

    .hero-stats {
      display: flex;
      justify-content: center;
      gap: 3rem;
      margin-bottom: 2.5rem;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent-blue);
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.875rem;
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      min-height: 48px;
    }

    .btn-primary {
      background: var(--nasa-blue);
      color: white;
      border: 2px solid var(--nasa-blue);
    }

    .btn-primary:hover {
      background: #1a4fa0;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px var(--glow);
    }

    .btn-secondary {
      background: transparent;
      color: var(--accent-blue);
      border: 2px solid var(--accent-blue);
    }

    .btn-secondary:hover {
      background: rgba(30, 136, 229, 0.1);
      transform: translateY(-2px);
    }

    .features {
      padding: 6rem 0;
      background: linear-gradient(180deg, var(--space-black), var(--midnight));
    }

    .workflow {
      padding: 6rem 0;
      background: var(--midnight);
    }

    .workflow-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .step {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--nasa-blue), var(--accent-blue));
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }

    .step-content h4 {
      margin-bottom: 0.5rem;
      color: var(--star);
      font-size: 1.1rem;
    }

    .step-content p {
      opacity: 0.8;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    .nasa-resources {
      padding: 6rem 0;
      background: linear-gradient(180deg, var(--midnight), var(--space-black));
    }

    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .resource-card {
      background: var(--glass);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      transition: all 0.3s ease;
    }

    .resource-card:hover {
      border-color: var(--nasa-blue);
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(11, 61, 145, 0.2);
    }

    .resource-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      display: block;
    }

    .resource-card h4 {
      color: var(--accent-blue);
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .resource-card p {
      opacity: 0.8;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      text-align: center;
    }

    .container h2 {
      font-size: clamp(2rem, 5vw, 2.5rem);
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .container p {
      font-size: 1.1rem;
      opacity: 0.8;
      margin-bottom: 4rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: rgba(230, 241, 255, 0.08);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(230, 241, 255, 0.15);
      border-radius: 16px;
      padding: 2.5rem;
      text-align: left;
      transition: all 0.4s ease;
    }

    .feature-card:hover {
      border-color: var(--nasa-blue);
      box-shadow: 0 8px 32px rgba(11, 61, 145, 0.2);
      transform: translateY(-8px);
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .feature-icon.drought {
      background: linear-gradient(135deg, #FF9800, #FF6F00);
    }

    .feature-icon.flood {
      background: linear-gradient(135deg, var(--accent-blue), var(--nasa-blue));
    }

    .feature-icon.quality {
      background: linear-gradient(135deg, #00C853, #00A152);
    }

    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .feature-card p {
      opacity: 0.8;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .feature-metrics {
      display: flex;
      gap: 0.75rem;
    }

    .metric {
      background: rgba(30, 136, 229, 0.15);
      color: var(--accent-blue);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid rgba(30, 136, 229, 0.3);
    }

    @keyframes twinkle {
      0% { opacity: 0.3; }
      100% { opacity: 0.8; }
    }

    @media (max-width: 768px) {
      .hero-actions {
        flex-direction: column;
        align-items: center;
      }
      
      .hero-stats {
        gap: 2rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .stars {
        animation: none;
      }
      
      .feature-card:hover {
        transform: none;
      }
      
      .btn-primary:hover,
      .btn-secondary:hover {
        transform: none;
      }
    }
  `]
})
export class HomeComponent {}