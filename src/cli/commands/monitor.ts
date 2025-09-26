/**
 * 🔍 Monitor command - Real-time bot status monitoring
 */

import { Logger } from '../../utils/logger';
import { SystemDetector } from '../../services/system';
import { BotMonitor } from '../../services/monitor';
import { PromptUtils } from '../../utils/prompt';

export class MonitorCommand {
  private logger: Logger;
  private system: SystemDetector;
  private prompt: PromptUtils;
  private monitor?: BotMonitor;

  constructor(logger: Logger, system: SystemDetector, prompt: PromptUtils) {
    this.logger = logger;
    this.system = system;
    this.prompt = prompt;
  }

  async execute(args?: string[]): Promise<void> {
    const action = args?.[0] || 'start';

    switch (action.toLowerCase()) {
      case 'start':
        await this.startMonitor();
        break;
      case 'stop':
        await this.stopMonitor();
        break;
      case 'status':
        await this.showMonitorStatus();
        break;
      case 'config':
        await this.configureMonitor();
        break;
      default:
        this.showUsage();
    }
  }

  private async startMonitor(): Promise<void> {
    if (this.monitor) {
      this.logger.warning('El monitor ya está en ejecución');
      return;
    }

    this.monitor = new BotMonitor(this.logger);
    
    try {
      await this.monitor.startMonitoring();
      
      // Esperar comandos del usuario
      await this.handleMonitorInteraction();
      
    } catch (error) {
      this.logger.error(`Error iniciando monitor: ${error instanceof Error ? error.message : error}`);
    }
  }

  private async stopMonitor(): Promise<void> {
    if (!this.monitor) {
      this.logger.warning('El monitor no está en ejecución');
      return;
    }

    this.monitor.stopMonitoring();
    this.monitor = undefined;
    this.logger.success('Monitor detenido');
  }

  private async showMonitorStatus(): Promise<void> {
    if (!this.monitor) {
      this.logger.warning('El monitor no está en ejecución');
      return;
    }

    const stats = this.monitor.getStats();
    
    const statusInfo = [
      '📊 Estado del Monitor:',
      '',
      `🤖 Total de hermanas: ${stats.total}`,
      `🟢 Activas: ${stats.running}`,
      `🔴 Detenidas: ${stats.stopped}`,
      `⚠️ Con errores: ${stats.errors}`
    ];

    this.logger.createBox(statusInfo, 'info', 1);
  }

  private async configureMonitor(): Promise<void> {
    this.logger.info('🔧 Configuración del monitor');
    console.log('');

    this.logger.log('Opciones disponibles:', 'accent');
    this.logger.log('  1. Cambiar intervalo de actualización', 'dim');
    this.logger.log('  2. Activar/desactivar notificaciones', 'dim');
    this.logger.log('  3. Configurar rutas de monitoreo', 'dim');
    
    // Aquí iría la lógica de configuración interactiva
    this.logger.info('💡 Configuración avanzada disponible próximamente');
  }

  private async handleMonitorInteraction(): Promise<void> {
    this.logger.info('💡 Presiona [q] para salir del monitor...');
    
    while (true) {
      try {
        const input = await this.prompt.question('');
        
        if (input.toLowerCase() === 'q' || input.toLowerCase() === 'quit') {
          await this.stopMonitor();
          break;
        }
        
        if (input.toLowerCase() === 'r' || input.toLowerCase() === 'refresh') {
          this.logger.info('🔄 Actualizando monitor...');
          continue;
        }
        
      } catch (error) {
        break; // Usuario presionó Ctrl+C
      }
    }
  }

  private showUsage(): void {
    this.logger.createBox([
      '🔍 Comando Monitor - Monitoreo en tiempo real',
      '',
      'Uso:',
      '  celia monitor [comando]',
      '',
      'Comandos disponibles:',
      '  start    - Iniciar monitor en tiempo real',
      '  stop     - Detener monitor',
      '  status   - Ver estado del monitor',
      '  config   - Configurar monitor',
      '',
      'Ejemplo:',
      '  celia monitor start'
    ], 'primary', 1);
  }
}

export default MonitorCommand;