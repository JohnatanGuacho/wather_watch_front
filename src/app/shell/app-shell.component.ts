import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="layout-wrapper">
      <nav class="navbar">
        <div class="nav-brand">
          <div class="brand-icon">🛡️</div>
          <div class="brand-text">
            <span class="brand-main">URBAN WATER</span>
            <span class="brand-accent">GUARD</span>
          </div>
        </div>
        
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
            <span class="nav-icon">🏠</span>
            <span>Inicio</span>
          </a>
          <a routerLink="/map" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">🗺️</span>
            <span>Mapa</span>
          </a>
          <a routerLink="/alerts" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">🚨</span>
            <span>Alertas</span>
          </a>
          <a routerLink="/settings" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">⚙️</span>
            <span>Ajustes</span>
          </a>
        </div>
        
        <div class="nav-status">
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span class="status-text">En línea</span>
          </div>
        </div>
      </nav>
      
      <main class="main-content">
        <router-outlet />
      </main>
    </div>
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
      --glass: rgba(230, 241, 255, 0.08);
      --glass-border: rgba(230, 241, 255, 0.15);
    }

    .layout-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--space-black);
    }

    .navbar {
      background: linear-gradient(135deg, var(--midnight), var(--space-black));
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--glass-border);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .brand-icon {
      font-size: 1.5rem;
      padding: 0.5rem;
      background: var(--glass);
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      backdrop-filter: blur(10px);
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .brand-main {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--star);
      letter-spacing: 0.5px;
    }

    .brand-accent {
      font-size: 0.75rem;
      font-weight: 600;
      background: linear-gradient(135deg, var(--nasa-blue), var(--accent-blue));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: 1px;
    }

    .nav-links {
      display: flex;
      gap: 0.5rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--star);
      text-decoration: none;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      font-weight: 500;
      font-size: 0.875rem;
      background: transparent;
      border: 1px solid transparent;
      position: relative;
      overflow: hidden;
    }

    .nav-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(230, 241, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    .nav-link:hover::before {
      left: 100%;
    }

    .nav-link:hover {
      background: var(--glass);
      border-color: var(--glass-border);
      color: var(--accent-blue);
      transform: translateY(-1px);
    }

    .nav-link.active {
      background: linear-gradient(135deg, var(--nasa-blue), var(--accent-blue));
      color: white;
      border-color: var(--nasa-blue);
      box-shadow: 0 0 15px var(--glow);
    }

    .nav-link.active:hover {
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 20px var(--glow);
    }

    .nav-icon {
      font-size: 1rem;
    }

    .nav-status {
      display: flex;
      align-items: center;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--glass);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--star);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background: #00C853;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .main-content {
      flex: 1;
      background: var(--space-black);
      min-height: calc(100vh - 80px);
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.1);
      }
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 1rem;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .nav-links {
        order: 3;
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
      }

      .nav-status {
        order: 2;
      }

      .brand-text {
        display: none;
      }

      .nav-link span:not(.nav-icon) {
        display: none;
      }

      .nav-link {
        padding: 0.75rem;
        min-width: 44px;
        justify-content: center;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .nav-link::before {
        display: none;
      }
      
      .nav-link:hover,
      .nav-link.active:hover {
        transform: none;
      }
      
      .status-dot {
        animation: none;
      }
    }
  `]
})
export class AppShellComponent {}