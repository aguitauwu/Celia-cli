/**
 * 🔍 Monitor de estado en tiempo real de las hermanas bot
 */

import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '../utils/logger';
import { BOTS } from '../config/bots';
import { IBotConfig } from '../types/bots';

export interface IBotStatus {
  name: string;
  status: 'running' | 'stopped' | 'error' | 'unknown';
  pid?: number;
  uptime?: number;
  lastCheck: Date;
  memory?: number;
  cpu?: number;
  logs?: string[];
  errors?: string[];
}

export interface IMonitorConfig {
  refreshInterval: number;
  maxLogLines: number;
  enableNotifications: boolean;
  watchPaths: string[];
}

export class BotMonitor {
  private logger: Logger;
  private isRunning: boolean = false;
  private monitorInterval?: NodeJS.Timeout;
  private botStatuses: Map<string, IBotStatus> = new Map();
  private config: IMonitorConfig;

  constructor(logger: Logger, config?: Partial<IMonitorConfig>) {
    this.logger = logger;
    this.config = {
      refreshInterval: 5000, // 5 segundos
      maxLogLines: 50,
      enableNotifications: true,
      watchPaths: [],
      ...config
    };
  }

  /**
   * 🚀 Iniciar monitoreo en tiempo real
   */
  async startMonitoring(): Promise<void> {
    if (this.isRunning) {
      this.logger.warning('El monitor ya está en ejecución');
      return;
    }

    this.isRunning = true;
    this.logger.success('🔍 Iniciando monitor de hermanas bot...');
    
    // Mostrar banner de monitor
    await this.showMonitorBanner();
    
    // Inicializar estados
    await this.initializeBotStatuses();
    
    // Iniciar loop de monitoreo
    this.startMonitorLoop();
    
    // Mostrar dashboard inicial
    await this.displayDashboard();
    
    this.logger.info('✅ Monitor en tiempo real activo');
  }

  /**
   * ⏹️ Detener monitoreo
   */
  stopMonitoring(): void {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
    }
    
    this.logger.info('🛑 Monitor detenido');
  }

  /**
   * 🔄 Loop principal de monitoreo
   */
  private startMonitorLoop(): void {
    this.monitorInterval = setInterval(async () => {
      if (!this.isRunning) return;
      
      await this.updateBotStatuses();
      await this.displayDashboard();
      
      // Verificar alertas
      this.checkAlerts();
      
    }, this.config.refreshInterval);
  }

  /**
   * 📊 Mostrar dashboard en tiempo real
   */
  private async displayDashboard(): Promise<void> {
    // Limpiar pantalla y mostrar dashboard
    console.clear();
    
    this.logger.gradientLog('🔍 Monitor en Tiempo Real de Hermanas Bot', ['primary', 'accent']);
    console.log('');
    
    // Mostrar timestamp
    const timestamp = new Date().toLocaleTimeString();
    this.logger.log(`⏰ Última actualización: ${timestamp}`, 'dim');
    console.log('');
    
    // Mostrar estadísticas generales
    await this.showGeneralStats();
    
    // Mostrar estado de cada hermana
    await this.showBotStatuses();
    
    // Mostrar comandos disponibles
    this.showMonitorCommands();
  }

  /**
   * 📈 Mostrar estadísticas generales
   */
  private async showGeneralStats(): Promise<void> {
    const totalBots = this.botStatuses.size;
    const runningBots = Array.from(this.botStatuses.values()).filter(b => b.status === 'running').length;
    const stoppedBots = Array.from(this.botStatuses.values()).filter(b => b.status === 'stopped').length;
    const errorBots = Array.from(this.botStatuses.values()).filter(b => b.status === 'error').length;
    
    const stats = [
      `📊 Total de Hermanas: ${totalBots}`,
      `🟢 Activas: ${runningBots}`,
      `🔴 Detenidas: ${stoppedBots}`,
      `⚠️  Con Errores: ${errorBots}`,
      `📡 Intervalo: ${this.config.refreshInterval / 1000}s`
    ];
    
    this.logger.createBox(stats, 'info', 1);
    console.log('');
  }

  /**
   * 🤖 Mostrar estado de cada hermana bot
   */
  private async showBotStatuses(): Promise<void> {
    this.logger.log('🌸 Estado de las Hermanas:', 'accent');
    console.log('');
    
    for (const [botKey, status] of this.botStatuses.entries()) {
      const bot = BOTS[botKey as keyof typeof BOTS];
      if (!bot) continue;
      
      const statusIcon = this.getStatusIcon(status.status);
      const statusColor = this.getStatusColor(status.status);
      const uptime = status.uptime ? this.formatUptime(status.uptime) : 'N/A';
      const memory = status.memory ? `${(status.memory / 1024 / 1024).toFixed(1)}MB` : 'N/A';
      
      const statusInfo = [
        `${statusIcon} ${bot.name} (${bot.language})`,
        `   Estado: ${status.status}`,
        `   Tiempo activo: ${uptime}`,
        `   Memoria: ${memory}`,
        `   Última verificación: ${status.lastCheck.toLocaleTimeString()}`
      ];
      
      if (status.errors && status.errors.length > 0) {
        statusInfo.push(`   ⚠️ Últimos errores: ${status.errors.slice(-2).join(', ')}`);
      }
      
      this.logger.createBox(statusInfo, statusColor, 1);
      console.log('');
    }
  }

  /**
   * ⌨️ Mostrar comandos disponibles del monitor
   */
  private showMonitorCommands(): void {
    const commands = [
      '⌨️  Comandos disponibles:',
      '   [q] Salir del monitor',
      '   [r] Refrescar manualmente',
      '   [c] Configurar intervalo',
      '   [l] Ver logs detallados',
      '   [s] Iniciar/detener hermana'
    ];
    
    this.logger.createBox(commands, 'warning', 1);
  }

  /**
   * 🔄 Actualizar estados de los bots
   */
  private async updateBotStatuses(): Promise<void> {
    for (const botKey of Object.keys(BOTS)) {
      try {
        const status = await this.checkBotStatus(botKey);
        this.botStatuses.set(botKey, status);
      } catch (error) {
        // En caso de error, mantener estado anterior con error
        const currentStatus = this.botStatuses.get(botKey);
        if (currentStatus) {
          currentStatus.status = 'error';
          currentStatus.lastCheck = new Date();
          if (!currentStatus.errors) currentStatus.errors = [];
          currentStatus.errors.push(error instanceof Error ? error.message : String(error));
          currentStatus.errors = currentStatus.errors.slice(-5); // Mantener solo los últimos 5 errores
        }
      }
    }
  }

  /**
   * 🔍 Verificar estado de un bot específico
   */
  private async checkBotStatus(botKey: string): Promise<IBotStatus> {
    const bot = BOTS[botKey as keyof typeof BOTS];
    if (!bot) {
      throw new Error(`Bot ${botKey} no encontrado`);
    }

    // Buscar directorio del bot
    const possiblePaths = [
      `./${bot.name.toLowerCase()}-bot`,
      `./${botKey}-bot`,
      `./${bot.name.toLowerCase()}`,
      `./${botKey}`
    ];

    let botPath: string | null = null;
    for (const pathCandidate of possiblePaths) {
      if (fs.existsSync(pathCandidate)) {
        botPath = pathCandidate;
        break;
      }
    }

    const status: IBotStatus = {
      name: bot.name,
      status: 'unknown',
      lastCheck: new Date(),
      logs: [],
      errors: []
    };

    if (!botPath) {
      status.status = 'stopped';
      status.errors = ['Directorio del bot no encontrado'];
      return status;
    }

    // Verificar si existe package.json o archivos principales
    const packageJsonPath = path.join(botPath, 'package.json');
    const hasPackageJson = fs.existsSync(packageJsonPath);

    if (hasPackageJson) {
      // Verificar si node_modules existe (instalado)
      const nodeModulesPath = path.join(botPath, 'node_modules');
      const hasNodeModules = fs.existsSync(nodeModulesPath);
      
      if (!hasNodeModules) {
        status.status = 'stopped';
        status.errors = ['Dependencias no instaladas'];
        return status;
      }

      // Verificar .env file
      const envPath = path.join(botPath, '.env');
      const hasEnv = fs.existsSync(envPath);
      
      if (!hasEnv) {
        status.status = 'stopped';
        status.errors = ['Archivo .env no encontrado'];
        return status;
      }

      // Verificar configuración en .env
      try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const requiredVars = bot.envVars.filter(v => v.required).map(v => v.name);
        const missingVars = requiredVars.filter(varName => !envContent.includes(`${varName}=`));
        
        if (missingVars.length > 0) {
          status.status = 'error';
          status.errors = [`Variables faltantes: ${missingVars.join(', ')}`];
          return status;
        }
      } catch (error) {
        status.status = 'error';
        status.errors = ['Error leyendo .env'];
        return status;
      }

      // Si todo está bien configurado
      status.status = 'stopped'; // Por defecto stopped, se puede extender para detectar procesos corriendo
    } else {
      status.status = 'stopped';
      status.errors = ['package.json no encontrado'];
    }

    return status;
  }

  /**
   * ⚠️ Verificar alertas y notificar
   */
  private checkAlerts(): void {
    if (!this.config.enableNotifications) return;

    for (const [botKey, status] of this.botStatuses.entries()) {
      if (status.status === 'error' && status.errors && status.errors.length > 0) {
        // Solo notificar errores nuevos (podrías implementar un sistema de cache)
        this.logger.fireLog(`⚠️ ${status.name} tiene errores: ${status.errors[status.errors.length - 1]}`, 'error');
      }
    }
  }

  /**
   * 🔧 Inicializar estados de los bots
   */
  private async initializeBotStatuses(): Promise<void> {
    for (const botKey of Object.keys(BOTS)) {
      const bot = BOTS[botKey as keyof typeof BOTS];
      if (!bot) continue;
      
      this.botStatuses.set(botKey, {
        name: bot.name,
        status: 'unknown',
        lastCheck: new Date(),
        logs: [],
        errors: []
      });
    }
  }

  /**
   * 🎨 Banner del monitor
   */
  private async showMonitorBanner(): Promise<void> {
    this.logger.gradientLog('🔍 Monitor de Hermanas Bot', ['primary', 'secondary']);
    await this.logger.typeText('Iniciando sistemas de monitoreo...', 'info', 30);
    await this.logger.showLoading('Preparando dashboard', 1500);
  }

  /**
   * 🎯 Obtener icono de estado
   */
  private getStatusIcon(status: string): string {
    const icons = {
      running: '🟢',
      stopped: '🔴',
      error: '⚠️',
      unknown: '⚫'
    };
    return icons[status as keyof typeof icons] || icons.unknown;
  }

  /**
   * 🎨 Obtener color de estado
   */
  private getStatusColor(status: string): 'success' | 'error' | 'warning' | 'dim' {
    const colors = {
      running: 'success' as const,
      stopped: 'dim' as const,
      error: 'error' as const,
      unknown: 'warning' as const
    };
    return colors[status as keyof typeof colors] || colors.unknown;
  }

  /**
   * ⏰ Formatear tiempo de actividad
   */
  private formatUptime(uptimeMs: number): string {
    const seconds = Math.floor(uptimeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }

  /**
   * 📊 Obtener estadísticas del monitor
   */
  getStats(): {
    total: number;
    running: number;
    stopped: number;
    errors: number;
  } {
    const statuses = Array.from(this.botStatuses.values());
    return {
      total: statuses.length,
      running: statuses.filter(s => s.status === 'running').length,
      stopped: statuses.filter(s => s.status === 'stopped').length,
      errors: statuses.filter(s => s.status === 'error').length
    };
  }
}

export default BotMonitor;