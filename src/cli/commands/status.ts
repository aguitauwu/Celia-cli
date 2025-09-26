/**
 * 🔧 Status command - shows system information
 */

import { ICommand } from '../../types/command';
import { Logger } from '../../utils/logger';
import { ISystemDetector } from '../../types/system';

export class StatusCommand implements ICommand {
  public readonly name = 'status';
  public readonly config = {
    name: 'status',
    description: '🔧 Muestra información del sistema y compatibilidad',
    usage: 'celia status',
    aliases: ['stat', 'info', 'sistema'],
    action: this.execute.bind(this)
  };

  constructor(
    private readonly logger: Logger,
    private readonly system: ISystemDetector
  ) {}

  async execute(args: string[] = []): Promise<void> {
    this.showBanner();
    this.logger.gradientLog('🔧 Información del Sistema', ['primary', 'accent']);
    console.log('');
    
    const systemInfo: string[] = [
      `🖥️  Plataforma: ${this.system.platform.name}`,
      `⚙️  Arquitectura: ${this.system.architecture.raw}`,
      `🔢 CPUs disponibles: ${this.system.cpu.count}`,
      `🌸 Node.js: ${process.version}`,
      `🏠 Directorio: ${process.cwd()}`
    ];
    
    // Add additional system flags if relevant
    if (this.system.isTermux) {
      systemInfo.push('📱 Entorno: Termux (Android)');
    }
    if (this.system.platform.isContainer) {
      systemInfo.push('🐳 Entorno: Contenedorizado');
    }
    if (this.system.platform.isMobile) {
      systemInfo.push('📱 Plataforma móvil detectada');
    }
    
    this.logger.createBox(systemInfo, 'info', 1);
    
    const recommendations = this.system.getPerformanceRecommendations();
    if (recommendations.length > 0) {
      console.log('');
      this.logger.createBox([
        '💡 Recomendaciones:',
        '',
        ...recommendations
      ], 'warning', 1);
    }
    
    // Show compatibility report
    console.log('');
    this.logger.log('📋 Reporte de Compatibilidad:', 'accent');
    console.log('');
    
    const compatReport = this.system.generateCompatibilityReport();
    compatReport.forEach((line: string) => {
      this.logger.log(`  ${line}`, 'text');
    });
    
    console.log('');
  }
  
  private showBanner(): void {
    console.clear();
    console.log('');
    
    this.logger.createBox([
      '✨ ¡Holi! Soy Celia~ ✨',
      '🌸 Tu asistente celestial tierna 🌸',
      '',
      '💖 Ayudo a instalar a mis hermanas bot 💖',
      '(Aunque soy algo torpe, ehehe~)'
    ], 'primary', 2);
    
    console.log('');
    this.logger.log(`🎨 Tema actual: ${this.logger.theme}`, 'dim');
    console.log('');
  }
}

export default StatusCommand;