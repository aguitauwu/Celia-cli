/**
 * 🔧 Instalador automático de dependencias por sistema operativo
 */

import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '../utils/logger';
import { SecurityUtils } from '../security/security';
import { SystemDetector } from './system';
import { IBotConfig } from '../types/bots';

export interface IDependencyRequirement {
  name: string;
  version?: string;
  required: boolean;
  platforms: string[];
  installMethods: IInstallMethod[];
}

export interface IInstallMethod {
  platform: string;
  packageManager: string;
  commands: string[];
  preInstall?: string[];
  postInstall?: string[];
  validateCommand?: string;
}

export interface ISystemDependencies {
  git: IDependencyRequirement;
  nodejs: IDependencyRequirement;
  npm: IDependencyRequirement;
  python: IDependencyRequirement;
  pip: IDependencyRequirement;
  mongodb?: IDependencyRequirement;
  postgresql?: IDependencyRequirement;
}

export class DependencyInstaller {
  private logger: Logger;
  private system: SystemDetector;
  private readonly SYSTEM_DEPENDENCIES: ISystemDependencies;

  constructor(logger: Logger, system: SystemDetector) {
    this.logger = logger;
    this.system = system;
    this.SYSTEM_DEPENDENCIES = this.initializeSystemDependencies();
  }

  /**
   * 🚀 Instalar todas las dependencias del sistema automáticamente
   */
  async installSystemDependencies(interactive: boolean = true): Promise<boolean> {
    this.logger.gradientLog('🔧 Instalador Automático de Dependencias', ['primary', 'accent']);
    console.log('');

    await this.logger.showLoading('Detectando sistema operativo', 1500);

    // Mostrar información del sistema
    this.showSystemInfo();

    // Verificar dependencias actuales
    const missingDeps = await this.checkSystemDependencies();

    if (missingDeps.length === 0) {
      this.logger.sparkleLog('✅ Todas las dependencias están instaladas!', 'success');
      return true;
    }

    this.logger.warning(`⚠️ Dependencias faltantes: ${missingDeps.length}`);
    console.log('');

    // Mostrar dependencias faltantes
    this.showMissingDependencies(missingDeps);

    if (interactive) {
      console.log('');
      this.logger.info('🤔 ¿Deseas que instale las dependencias automáticamente?');
      this.logger.log('   [Y] Sí, instalar todo automáticamente', 'success');
      this.logger.log('   [S] Sí, pero seleccionar qué instalar', 'warning');
      this.logger.log('   [N] No, mostrar instrucciones manuales', 'dim');
      
      // En un entorno real, aquí usarías el prompt para obtener la respuesta del usuario
      // Para esta implementación, asumiremos instalación automática
    }

    // Proceder con la instalación
    return await this.performInstallation(missingDeps);
  }

  /**
   * 🔍 Verificar dependencias del sistema
   */
  async checkSystemDependencies(): Promise<string[]> {
    const missing: string[] = [];

    for (const [depName, requirement] of Object.entries(this.SYSTEM_DEPENDENCIES)) {
      if (!requirement.required) continue;
      
      const isInstalled = await this.isDependencyInstalled(depName, requirement);
      if (!isInstalled) {
        missing.push(depName);
      }
    }

    return missing;
  }

  /**
   * 🛠️ Realizar instalación de dependencias
   */
  private async performInstallation(missingDeps: string[]): Promise<boolean> {
    this.logger.info('🚀 Iniciando instalación automática...');
    console.log('');

    let successCount = 0;
    let failCount = 0;

    for (const depName of missingDeps) {
      const requirement = this.SYSTEM_DEPENDENCIES[depName as keyof ISystemDependencies];
      if (!requirement) continue;

      try {
        this.logger.info(`📦 Instalando ${depName}...`);
        
        const success = await this.installSingleDependency(depName, requirement);
        
        if (success) {
          this.logger.success(`✅ ${depName} instalado correctamente`);
          successCount++;
        } else {
          this.logger.error(`❌ Falló la instalación de ${depName}`);
          failCount++;
        }

      } catch (error) {
        this.logger.error(`❌ Error instalando ${depName}: ${error instanceof Error ? error.message : error}`);
        failCount++;
      }

      console.log('');
    }

    // Resumen final
    this.showInstallationSummary(successCount, failCount);

    return failCount === 0;
  }

  /**
   * 📦 Instalar una dependencia específica
   */
  private async installSingleDependency(depName: string, requirement: IDependencyRequirement): Promise<boolean> {
    const method = this.getInstallMethodForCurrentSystem(requirement);
    
    if (!method) {
      this.logger.error(`No hay método de instalación disponible para ${depName} en ${this.system.platform.name}`);
      return false;
    }

    try {
      // Ejecutar comandos pre-instalación
      if (method.preInstall) {
        for (const cmd of method.preInstall) {
          await this.executeCommand(cmd);
        }
      }

      // Ejecutar comandos de instalación
      for (const cmd of method.commands) {
        await this.executeCommand(cmd);
      }

      // Ejecutar comandos post-instalación
      if (method.postInstall) {
        for (const cmd of method.postInstall) {
          await this.executeCommand(cmd);
        }
      }

      // Validar instalación
      if (method.validateCommand) {
        return await this.validateInstallation(method.validateCommand);
      }

      return true;

    } catch (error) {
      this.logger.error(`Error ejecutando instalación: ${error instanceof Error ? error.message : error}`);
      return false;
    }
  }

  /**
   * ✅ Verificar si una dependencia está instalada
   */
  private async isDependencyInstalled(depName: string, requirement: IDependencyRequirement): Promise<boolean> {
    const method = this.getInstallMethodForCurrentSystem(requirement);
    
    if (!method || !method.validateCommand) {
      // Si no hay comando de validación, intentar comando básico
      try {
        await SecurityUtils.execSafe(depName, ['--version'], { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    }

    return await this.validateInstallation(method.validateCommand);
  }

  /**
   * ✅ Validar que la instalación funcionó
   */
  private async validateInstallation(validateCommand: string): Promise<boolean> {
    try {
      const parts = validateCommand.split(' ');
      const command = parts[0];
      const args = parts.slice(1);
      
      await SecurityUtils.execSafe(command || '', args, { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 🎯 Obtener método de instalación para el sistema actual
   */
  private getInstallMethodForCurrentSystem(requirement: IDependencyRequirement): IInstallMethod | null {
    const platformName = this.system.platform.name.toLowerCase();
    
    // Buscar método específico para la plataforma
    const method = requirement.installMethods.find(m => 
      m.platform.toLowerCase() === platformName ||
      m.platform === 'all'
    );

    return method || null;
  }

  /**
   * 🖥️ Mostrar información del sistema
   */
  private showSystemInfo(): void {
    const systemInfo = [
      `🖥️ Sistema: ${this.system.platform.name} ${this.system.platform.release}`,
      `⚙️ Arquitectura: ${this.system.architecture.family} ${this.system.architecture.bits}-bit`,
      `🔧 Procesador: ${this.system.cpu.vendor} (${this.system.cpu.count} cores)`,
      `📱 Entorno: ${this.getEnvironmentType()}`
    ];

    this.logger.createBox(systemInfo, 'info', 1);
    console.log('');
  }

  /**
   * 📋 Mostrar dependencias faltantes
   */
  private showMissingDependencies(missingDeps: string[]): void {
    this.logger.log('📋 Dependencias faltantes:', 'error');
    console.log('');

    for (const depName of missingDeps) {
      const requirement = this.SYSTEM_DEPENDENCIES[depName as keyof ISystemDependencies];
      if (!requirement) continue;

      const method = this.getInstallMethodForCurrentSystem(requirement);
      const installCmd = method ? method.commands.join(' && ') : 'No disponible para este sistema';

      const depInfo = [
        `📦 ${requirement.name}`,
        `   Requerido: ${requirement.required ? 'Sí' : 'No'}`,
        `   Comando: ${installCmd}`,
        ...(requirement.version ? [`   Versión: ${requirement.version}`] : [])
      ];

      this.logger.createBox(depInfo, 'warning', 1);
      console.log('');
    }
  }

  /**
   * 📊 Mostrar resumen de instalación
   */
  private showInstallationSummary(successCount: number, failCount: number): void {
    console.log('');
    this.logger.gradientLog('📊 Resumen de Instalación', ['primary', 'secondary']);
    
    const summary = [
      `✅ Instalaciones exitosas: ${successCount}`,
      `❌ Instalaciones fallidas: ${failCount}`,
      `📈 Tasa de éxito: ${Math.round((successCount / (successCount + failCount)) * 100)}%`
    ];

    const boxStyle = failCount === 0 ? 'success' : failCount > successCount ? 'error' : 'warning';
    this.logger.createBox(summary, boxStyle, 1);

    if (failCount > 0) {
      console.log('');
      this.logger.warning('💡 Para las dependencias que fallaron, intenta instalarlas manualmente');
      this.logger.info('🔧 O ejecuta: celia dependencies --manual para ver instrucciones');
    }
  }

  /**
   * 🏃‍♂️ Ejecutar comando de instalación
   */
  private async executeCommand(command: string): Promise<void> {
    const parts = command.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    
    if (!cmd) throw new Error('Comando vacío');

    await this.logger.showLoading(`Ejecutando: ${command}`, 1000);
    
    try {
      SecurityUtils.execSafe(cmd, args, { stdio: 'inherit' });
    } catch (error) {
      throw new Error(`Comando falló: ${command}`);
    }
  }

  /**
   * 🌍 Obtener tipo de entorno
   */
  private getEnvironmentType(): string {
    if (this.system.isTermux) return 'Termux Android';
    if (this.system.platform.isMobile) return 'Móvil';
    if (this.system.isEmbedded) return 'Sistema embebido';
    if (this.system.platform.isContainer) return 'Contenedor';
    return 'Desktop';
  }

  /**
   * 🔧 Inicializar definiciones de dependencias del sistema
   */
  private initializeSystemDependencies(): ISystemDependencies {
    return {
      git: {
        name: 'Git',
        required: true,
        platforms: ['linux', 'darwin', 'win32'],
        installMethods: [
          {
            platform: 'linux',
            packageManager: 'apt',
            commands: ['sudo apt update', 'sudo apt install -y git'],
            validateCommand: 'git --version'
          },
          {
            platform: 'darwin',
            packageManager: 'brew',
            commands: ['brew install git'],
            validateCommand: 'git --version'
          },
          {
            platform: 'win32',
            packageManager: 'manual',
            commands: ['echo "Descarga Git desde https://git-scm.com/download/win"'],
            validateCommand: 'git --version'
          }
        ]
      },
      nodejs: {
        name: 'Node.js',
        version: '>=14.0.0',
        required: true,
        platforms: ['linux', 'darwin', 'win32'],
        installMethods: [
          {
            platform: 'linux',
            packageManager: 'curl',
            commands: [
              'curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -',
              'sudo apt-get install -y nodejs'
            ],
            validateCommand: 'node --version'
          },
          {
            platform: 'darwin',
            packageManager: 'brew',
            commands: ['brew install node'],
            validateCommand: 'node --version'
          },
          {
            platform: 'win32',
            packageManager: 'manual',
            commands: ['echo "Descarga Node.js desde https://nodejs.org"'],
            validateCommand: 'node --version'
          }
        ]
      },
      npm: {
        name: 'NPM',
        required: true,
        platforms: ['linux', 'darwin', 'win32'],
        installMethods: [
          {
            platform: 'all',
            packageManager: 'nodejs',
            commands: ['echo "NPM viene incluido con Node.js"'],
            validateCommand: 'npm --version'
          }
        ]
      },
      python: {
        name: 'Python',
        version: '>=3.7',
        required: false,
        platforms: ['linux', 'darwin', 'win32'],
        installMethods: [
          {
            platform: 'linux',
            packageManager: 'apt',
            commands: ['sudo apt update', 'sudo apt install -y python3 python3-pip'],
            validateCommand: 'python3 --version'
          },
          {
            platform: 'darwin',
            packageManager: 'brew',
            commands: ['brew install python'],
            validateCommand: 'python3 --version'
          },
          {
            platform: 'win32',
            packageManager: 'manual',
            commands: ['echo "Descarga Python desde https://python.org"'],
            validateCommand: 'python --version'
          }
        ]
      },
      pip: {
        name: 'Pip',
        required: false,
        platforms: ['linux', 'darwin', 'win32'],
        installMethods: [
          {
            platform: 'all',
            packageManager: 'python',
            commands: ['echo "Pip viene incluido con Python 3.7+"'],
            validateCommand: 'pip --version'
          }
        ]
      }
    };
  }

  /**
   * 📱 Instalar dependencias específicas para bot
   */
  async installBotDependencies(bot: IBotConfig, botPath: string): Promise<boolean> {
    this.logger.info(`📦 Instalando dependencias para ${bot.name}...`);
    
    try {
      switch (bot.language) {
        case 'Node.js':
        case 'TypeScript':
          return await this.installNodeDependencies(botPath);
        case 'Python':
          return await this.installPythonDependencies(botPath);
        default:
          this.logger.warning(`Lenguaje ${bot.language} no soportado para instalación automática`);
          return false;
      }
    } catch (error) {
      this.logger.error(`Error instalando dependencias: ${error instanceof Error ? error.message : error}`);
      return false;
    }
  }

  /**
   * 📦 Instalar dependencias de Node.js
   */
  private async installNodeDependencies(botPath: string): Promise<boolean> {
    const packageJsonPath = path.join(botPath, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      this.logger.warning('package.json no encontrado');
      return false;
    }

    const optimizedArgs = this.system.isARM || this.system.isEmbedded 
      ? ['install', '--maxsockets', '1', '--progress', 'false']
      : ['install', '--progress', 'false'];

    try {
      SecurityUtils.execSafe('npm', optimizedArgs, { cwd: botPath, stdio: 'inherit' });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 🐍 Instalar dependencias de Python
   */
  private async installPythonDependencies(botPath: string): Promise<boolean> {
    const requirementsPath = path.join(botPath, 'requirements.txt');
    
    if (!fs.existsSync(requirementsPath)) {
      this.logger.warning('requirements.txt no encontrado');
      return false;
    }

    const optimizedArgs = this.system.cpu.count === 1
      ? ['-m', 'pip', 'install', '-r', 'requirements.txt', '--no-cache-dir']
      : ['-m', 'pip', 'install', '-r', 'requirements.txt'];

    try {
      SecurityUtils.execSafe('python3', optimizedArgs, { cwd: botPath, stdio: 'inherit' });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default DependencyInstaller;