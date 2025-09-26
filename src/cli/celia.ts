/**
 * 🌸 Celia - Main CLI Application Class
 */

// Import configurations and classes
import { VERSION, NODE_MIN_VERSION } from '../config/constants';
import { THEMES } from '../config/themes';
import { BOTS } from '../config/bots';
import { Logger } from '../utils/logger';
import { SystemDetector } from '../services/system';
import { SecurityUtils } from '../security/security';
import { PromptUtils } from '../utils/prompt';
import { CommandRouter } from './router';

// Import command classes
import { ListCommand } from './commands/list';
import { HelpCommand } from './commands/help';
import { ThemeCommand } from './commands/theme';
import { StatusCommand } from './commands/status';
import { MonitorCommand } from './commands/monitor';
import { BackupCommand } from './commands/backup';
import { DependenciesCommand } from './commands/dependencies';

export class CeliaAssistant {
  public logger: Logger;
  public system: SystemDetector;
  public prompt: PromptUtils
  public router: CommandRouter;
  public interactive: boolean = false;

  constructor() {
    // Initialize core components
    this.logger = new Logger();
    this.system = new SystemDetector();
    this.prompt = new PromptUtils();
    this.router = new CommandRouter();
    
    // 🌙 Initialize Celia's beautiful commands~
    this.initializeCommands();
  }
  
  /**
   * 🛡️ Verificar prerrequisitos críticos
   */
  static checkCriticalPrerequisites(): void {
    // Verificar versión de Node.js
    if (!SecurityUtils.validateNodeVersion(NODE_MIN_VERSION)) {
      throw new Error(`Versión de Node.js muy antigua. Se requiere >= ${NODE_MIN_VERSION}. Versión actual: ${process.version}`);
    }
  }
  
  /**
   * 🛡️ Mostrar estado de prerrequisitos
   */
  showPrerequisiteStatus(): void {
    const missing = SecurityUtils.checkPrerequisites();
    
    if (missing.length > 0) {
      this.logger.log('\n⚠️  Prerrequisitos faltantes:', 'warning');
      missing.forEach((cmd: string) => {
        this.logger.log(`   - ${cmd}`, 'error');
      });
      this.logger.log('\n💡 Instala los comandos faltantes antes de continuar', 'info');
    } else {
      this.logger.log('\n✅ Todos los prerrequisitos disponibles', 'dim');
    }
  }
  
  /**
   * 🌸 Initialize Celia's modern command system~
   */
  initializeCommands(): void {
    // Initialize command instances
    const listCommand = new ListCommand(this.logger);
    const helpCommand = new HelpCommand(this.logger, this.router);
    const themeCommand = new ThemeCommand(this.logger);
    const statusCommand = new StatusCommand(this.logger, this.system);
    const monitorCommand = new MonitorCommand(this.logger, this.system, this.prompt);
    const backupCommand = new BackupCommand(this.logger, this.prompt);
    const dependenciesCommand = new DependenciesCommand(this.logger, this.system, this.prompt);
    
    // Register commands
    this.router.register('sisters', {
      aliases: ['list', 'hermanas'],
      description: '🌸 Conoce a todas mis hermanas bot',
      usage: 'celia sisters',
      action: (args?: string[]) => listCommand.execute(args)
    });
    
    this.router.register('help', {
      aliases: ['h', 'ayuda'],
      description: '💫 Obtén ayuda de Celia',
      usage: 'celia help [comando]',
      action: (args?: string[]) => helpCommand.execute(args)
    });
    
    this.router.register('theme', {
      aliases: ['themes', 'style'],
      description: '🎨 Cambia mi apariencia visual',
      usage: 'celia theme [celestial|kawaii|dreamy]',
      action: async (args?: string[]) => await themeCommand.execute(args)
    });
    
    this.router.register('status', {
      aliases: ['info', 'system'],
      description: '🔧 Información del sistema y entorno',
      usage: 'celia status',
      action: (args?: string[]) => statusCommand.execute(args)
    });
    
    // Placeholder commands for now
    this.router.register('install', {
      aliases: ['add', 'setup'],
      description: '💖 Instala a una de mis hermanas con mucho amor',
      usage: 'celia install <hermana>',
      action: (args?: string[]) => this.modernInstall(args?.[0])
    });
    
    this.router.register('quick', {
      aliases: ['fast', 'rapido'],
      description: '⚡ Instalación súper rápida',
      usage: 'celia quick <hermana>',
      action: (args?: string[]) => this.quickInstallBot(args?.[0])
    });
    
    // Register new advanced commands
    this.router.register('monitor', {
      aliases: ['watch', 'observe'],
      description: '🔍 Monitor en tiempo real de las hermanas',
      usage: 'celia monitor [start|stop|status]',
      action: async (args?: string[]) => await monitorCommand.execute(args)
    });
    
    this.router.register('backup', {
      aliases: ['save', 'restore'],
      description: '🗄️ Sistema de backup de configuraciones',
      usage: 'celia backup [create|restore|list]',
      action: async (args?: string[]) => await backupCommand.execute(args)
    });
    
    this.router.register('dependencies', {
      aliases: ['deps', 'install-deps'],
      description: '🔧 Instalador automático de dependencias',
      usage: 'celia dependencies [check|install|manual]',
      action: async (args?: string[]) => await dependenciesCommand.execute(args)
    });
  }
  
  /**
   * 🌟 Modern CLI entry point with beautiful parsing~
   */
  async run(): Promise<void> {
    const args = process.argv.slice(2);
    
    try {
      // Handle no arguments - start interactive mode
      if (args.length === 0) {
        await this.startInteractiveMode();
        return;
      }
      
      // Handle version flag
      if (args.includes('--version') || args.includes('-v')) {
        this.showVersion();
        return;
      }
      
      // Parse modern command structure
      const command = args[0] || '';
      const commandArgs = args.slice(1);
      
      // Handle legacy commands for compatibility
      if (command === 'list') {
        await this.router.execute('sisters', []);
        return;
      }
      
      if (command === 'quick-install') {
        await this.router.execute('quick', commandArgs);
        return;
      }
      
      // Execute modern command
      await this.router.execute(command, commandArgs);
      
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.log(`🌸 Aww, algo salió mal: ${message}`, 'error');
      console.log('');
      this.logger.log('💡 Intenta "celia help" para ver los comandos disponibles~', 'info');
    } finally {
      this.prompt.close();
    }
  }
  
  /**
   * Show version information
   */
  showVersion(): void {
    this.showBanner();
    this.logger.gradientLog(`Celia v${VERSION} 💖`, ['primary', 'secondary']);
    console.log('');
    this.logger.log('Tu asistente celestial tierna~', 'dim');
    this.showPrerequisiteStatus();
    console.log('');
  }
  
  /**
   * 🌸 Celia's beautiful modern banner~
   */
  showBanner(): void {
    console.clear();
    console.log('');
    
    // Beautiful gradient banner
    this.logger.createBox([
      '✨ ¡Holi! Soy Celia~ ✨',
      '🌸 Tu asistente celestial tierna 🌸',
      '',
      '💖 Ayudo a instalar a mis hermanas bot 💖',
      '(Aunque soy algo torpe, ehehe~)'
    ], 'primary', 2);
    
    console.log('');
    
    // Theme indicator
    this.logger.log(`🎨 Tema actual: ${this.logger.theme}`, 'dim');
    
    // Enhanced environment detection with love~
    if (this.system.isARM || this.system.isTermux || this.system.isEmbedded || this.system.platform.isMobile) {
      console.log('');
      this.logger.log('🌸 Entorno especializado detectado:', 'info');
      if (this.system.isTermux) this.logger.log('   📱 Termux Android', 'success');
      if (this.system.platform.isMobile) this.logger.log('   📱 Plataforma móvil', 'success');
      if (this.system.isARM) this.logger.log(`   🔧 Arquitectura ARM ${this.system.architecture.bits}-bit`, 'success');
      if (this.system.isRISCV) this.logger.log('   ⚙️ Arquitectura RISC-V', 'success');
      if (this.system.isEmbedded) this.logger.log('   🤖 Sistema embebido detectado', 'success');
      if (this.system.platform.isContainer) this.logger.log('   🐳 Entorno contenedorizado', 'success');
    }
    
    console.log('');
  }
  
  
  /**
   * 💬 Enhanced interactive mode~
   */
  async startInteractiveMode(): Promise<void> {
    this.interactive = true;
    this.showBanner();
    
    this.logger.gradientLog('💬 Modo Interactivo Activado', ['primary', 'accent']);
    console.log('');
    
    const welcomeMessages = [
      '¡Ahora puedes hablar conmigo! 💖',
      'Usa comandos como "sisters", "help", "theme"...',
      'Para salir, escribe "exit" o presiona Ctrl+C'
    ];
    
    welcomeMessages.forEach(msg => this.logger.log(msg, 'info'));
    console.log('');
    
    while (this.interactive) {
      try {
        const input = await this.prompt.question('🌸 Celia> ');
        
        if (!input.trim()) {
          this.logger.log('💡 Tip: Usa "help" para ver comandos disponibles~', 'dim');
          continue;
        }
        
        // Handle exit commands
        if (['exit', 'quit', 'bye'].includes(input.trim().toLowerCase())) {
          this.logger.log('🌸 ¡Hasta luego! ¡Que tengas un día celestial!~', 'primary');
          break;
        }
        
        // Parse and execute command
        const args = input.trim().split(' ');
        const command = args[0] || '';
        const commandArgs = args.slice(1);
        
        await this.router.execute(command, commandArgs);
        console.log('');
        
      } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'SIGINT') {
          this.logger.log('\n🌸 ¡Hasta luego! ¡Que tengas un día celestial!~', 'primary');
          break;
        }
        const message = error instanceof Error ? error.message : String(error);
        this.logger.log(`🌸 Error: ${message}`, 'error');
        console.log('');
      }
    }
    
    this.interactive = false;
  }
  
  // Placeholder methods for install commands (to be implemented later)
  async modernInstall(botName?: string): Promise<void> {
    this.logger.log('🚧 Función de instalación en desarrollo...', 'warning');
    this.logger.log(`Instalando: ${botName || 'bot no especificado'}`, 'info');
  }
  
  async quickInstallBot(botName?: string): Promise<void> {
    this.logger.log('🚧 Función de instalación rápida en desarrollo...', 'warning');
    this.logger.log(`Instalación rápida: ${botName || 'bot no especificado'}`, 'info');
  }
}

export default CeliaAssistant;