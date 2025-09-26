/**
 * 🔧 Dependencies command - Automatic system dependency installer
 */

import { Logger } from '../../utils/logger';
import { SystemDetector } from '../../services/system';
import { DependencyInstaller } from '../../services/dependency-installer';
import { PromptUtils } from '../../utils/prompt';

export class DependenciesCommand {
  private logger: Logger;
  private system: SystemDetector;
  private prompt: PromptUtils;
  private installer: DependencyInstaller;

  constructor(logger: Logger, system: SystemDetector, prompt: PromptUtils) {
    this.logger = logger;
    this.system = system;
    this.prompt = prompt;
    this.installer = new DependencyInstaller(logger, system);
  }

  async execute(args?: string[]): Promise<void> {
    const action = args?.[0] || 'check';

    switch (action.toLowerCase()) {
      case 'install':
        await this.installDependencies();
        break;
      case 'check':
        await this.checkDependencies();
        break;
      case 'manual':
        await this.showManualInstructions();
        break;
      case 'system':
        await this.showSystemInfo();
        break;
      default:
        this.showUsage();
    }
  }

  private async installDependencies(): Promise<void> {
    try {
      this.logger.gradientLog('🔧 Instalación Automática de Dependencias', ['primary', 'accent']);
      console.log('');

      const success = await this.installer.installSystemDependencies(true);
      
      if (success) {
        this.logger.sparkleLog('🎉 Todas las dependencias instaladas correctamente!', 'success');
        console.log('');
        this.logger.info('✅ Tu sistema está listo para usar Celia y sus hermanas');
      } else {
        this.logger.warning('⚠️ Algunas dependencias no se pudieron instalar automáticamente');
        console.log('');
        this.logger.info('💡 Ejecuta "celia dependencies manual" para ver instrucciones');
      }

    } catch (error) {
      this.logger.error(`❌ Error en instalación: ${error instanceof Error ? error.message : error}`);
    }
  }

  private async checkDependencies(): Promise<void> {
    this.logger.gradientLog('🔍 Verificando Dependencias del Sistema', ['primary', 'secondary']);
    console.log('');

    try {
      const missing = await this.installer.checkSystemDependencies();
      
      if (missing.length === 0) {
        this.logger.sparkleLog('✅ Todas las dependencias están instaladas!', 'success');
        this.showSystemSummary();
      } else {
        this.logger.warning(`⚠️ Faltan ${missing.length} dependencias:`);
        console.log('');
        
        missing.forEach(dep => {
          this.logger.log(`❌ ${dep}`, 'error');
        });
        
        console.log('');
        this.logger.info('💡 Ejecuta "celia dependencies install" para instalar automáticamente');
      }

    } catch (error) {
      this.logger.error(`❌ Error verificando dependencias: ${error instanceof Error ? error.message : error}`);
    }
  }

  private async showManualInstructions(): Promise<void> {
    this.logger.gradientLog('📖 Instrucciones Manuales de Instalación', ['accent', 'primary']);
    console.log('');

    const platform = this.system.platform.name;
    
    this.logger.createBox([
      `📱 Sistema detectado: ${platform} ${this.system.architecture.family}`,
      '',
      'Dependencias requeridas y cómo instalarlas:'
    ], 'info', 1);
    
    console.log('');

    // Git
    this.showManualInstallInstructions('Git', this.getGitInstructions(platform));
    
    // Node.js
    this.showManualInstallInstructions('Node.js', this.getNodeInstructions(platform));
    
    // Python (opcional)
    this.showManualInstallInstructions('Python (opcional)', this.getPythonInstructions(platform));

    console.log('');
    this.logger.info('🔄 Después de instalar, ejecuta "celia dependencies check" para verificar');
  }

  private showManualInstallInstructions(title: string, instructions: string[]): void {
    this.logger.log(`🔧 ${title}:`, 'accent');
    instructions.forEach(instruction => {
      this.logger.log(`   ${instruction}`, 'dim');
    });
    console.log('');
  }

  private getGitInstructions(platform: string): string[] {
    const instructions: { [key: string]: string[] } = {
      'Linux': [
        'sudo apt update',
        'sudo apt install git',
        'git --version  # verificar instalación'
      ],
      'macOS': [
        'brew install git',
        'git --version  # verificar instalación'
      ],
      'Windows': [
        'Descargar desde: https://git-scm.com/download/win',
        'Ejecutar instalador y seguir instrucciones',
        'git --version  # verificar en cmd/powershell'
      ]
    };

    return instructions[platform] || instructions['Linux'] || [];
  }

  private getNodeInstructions(platform: string): string[] {
    const instructions: { [key: string]: string[] } = {
      'Linux': [
        'curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -',
        'sudo apt-get install -y nodejs',
        'node --version && npm --version  # verificar'
      ],
      'macOS': [
        'brew install node',
        'node --version && npm --version  # verificar'
      ],
      'Windows': [
        'Descargar desde: https://nodejs.org',
        'Ejecutar instalador LTS',
        'node --version && npm --version  # verificar en cmd'
      ]
    };

    return instructions[platform] || instructions['Linux'] || [];
  }

  private getPythonInstructions(platform: string): string[] {
    const instructions: { [key: string]: string[] } = {
      'Linux': [
        'sudo apt update',
        'sudo apt install python3 python3-pip',
        'python3 --version && pip3 --version  # verificar'
      ],
      'macOS': [
        'brew install python',
        'python3 --version && pip3 --version  # verificar'
      ],
      'Windows': [
        'Descargar desde: https://python.org',
        'Ejecutar instalador (marcar "Add to PATH")',
        'python --version && pip --version  # verificar en cmd'
      ]
    };

    return instructions[platform] || instructions['Linux'] || [];
  }

  private async showSystemInfo(): Promise<void> {
    this.logger.gradientLog('🖥️ Información del Sistema', ['primary', 'secondary']);
    console.log('');

    const systemInfo = [
      `🖥️ Sistema Operativo: ${this.system.platform.name} ${this.system.platform.release}`,
      `⚙️ Arquitectura: ${this.system.architecture.family} ${this.system.architecture.bits}-bit`,
      `🔧 Procesador: ${this.system.cpu.vendor} ${this.system.cpu.model}`,
      `🧮 Núcleos de CPU: ${this.system.cpu.count}`,
      `📱 Entorno: ${this.getEnvironmentInfo()}`,
      `🏷️ Endianness: ${this.system.architecture.endianness}`,
    ];

    this.logger.createBox(systemInfo, 'info', 1);
    
    // Mostrar recomendaciones específicas del sistema
    const recommendations = this.getSystemRecommendations();
    if (recommendations.length > 0) {
      console.log('');
      this.logger.createBox([
        '💡 Recomendaciones del Sistema:',
        '',
        ...recommendations
      ], 'warning', 1);
    }
  }

  private showSystemSummary(): void {
    console.log('');
    const summary = [
      '🎉 Sistema listo para Celia!',
      '',
      '✅ Git instalado',
      '✅ Node.js instalado', 
      '✅ NPM disponible',
      '',
      '🚀 Puedes instalar hermanas bot sin problemas'
    ];

    this.logger.createBox(summary, 'success', 1);
  }

  private getEnvironmentInfo(): string {
    if (this.system.isTermux) return 'Termux Android';
    if (this.system.platform.isMobile) return 'Dispositivo móvil';
    if (this.system.isEmbedded) return 'Sistema embebido';
    if (this.system.platform.isContainer) return 'Contenedor Docker/LXC';
    return 'Escritorio/Servidor';
  }

  private getSystemRecommendations(): string[] {
    const recommendations: string[] = [];

    if (this.system.isARM) {
      recommendations.push('🔧 ARM detectado: Las compilaciones pueden tomar más tiempo');
    }

    if (this.system.isTermux) {
      recommendations.push('📱 Termux: Instala dependencias con "pkg install git nodejs python"');
    }

    if (this.system.isEmbedded) {
      recommendations.push('🤖 Sistema embebido: Funciones optimizadas automáticamente');
    }

    if (this.system.cpu.count === 1) {
      recommendations.push('🐌 Un solo núcleo: Instalaciones serán más lentas');
    }

    if (this.system.isRISCV) {
      recommendations.push('⚙️ RISC-V: Usa instalaciones rápidas para mejor compatibilidad');
    }

    return recommendations;
  }

  private showUsage(): void {
    this.logger.createBox([
      '🔧 Comando Dependencies - Gestión de dependencias',
      '',
      'Uso:',
      '  celia dependencies [comando]',
      '',
      'Comandos disponibles:',
      '  check    - Verificar dependencias instaladas',
      '  install  - Instalar dependencias automáticamente',
      '  manual   - Ver instrucciones manuales',
      '  system   - Mostrar información del sistema',
      '',
      'Ejemplos:',
      '  celia dependencies check',
      '  celia dependencies install',
      '  celia dependencies manual'
    ], 'primary', 1);
  }
}

export default DependenciesCommand;