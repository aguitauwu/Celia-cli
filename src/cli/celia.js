/**
 * 🌸 Celia - Main CLI Application Class
 */

const { VERSION, NODE_MIN_VERSION } = require('../config/constants');
const { THEMES } = require('../config/themes');
const { BOTS } = require('../config/bots');
const Logger = require('../utils/logger');
const SystemDetector = require('../services/system');
const SecurityUtils = require('../security/security');
const PromptUtils = require('../utils/prompt');
const CommandRouter = require('./router');
const ListCommand = require('./commands/list');
const HelpCommand = require('./commands/help');
const ThemeCommand = require('./commands/theme');
const StatusCommand = require('./commands/status');

class CeliaAssistant {
  constructor() {
    // Initialize core components
    this.logger = new Logger();
    this.system = new SystemDetector();
    this.prompt = new PromptUtils();
    this.router = new CommandRouter();
    
    // Initialize state
    this.interactive = false;
    
    // 🌙 Initialize Celia's beautiful commands~
    this.initializeCommands();
  }
  
  /**
   * 🛡️ Verificar prerrequisitos críticos
   */
  static checkCriticalPrerequisites() {
    // Verificar versión de Node.js
    if (!SecurityUtils.validateNodeVersion(NODE_MIN_VERSION)) {
      throw new Error(`Versión de Node.js muy antigua. Se requiere >= ${NODE_MIN_VERSION}. Versión actual: ${process.version}`);
    }
  }
  
  /**
   * 🛡️ Mostrar estado de prerrequisitos
   */
  showPrerequisiteStatus() {
    const missing = SecurityUtils.checkPrerequisites();
    
    if (missing.length > 0) {
      this.logger.log('\n⚠️  Prerrequisitos faltantes:', 'warning');
      missing.forEach(cmd => {
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
  initializeCommands() {
    // Initialize command instances
    const listCommand = new ListCommand(this.logger);
    const helpCommand = new HelpCommand(this.logger, this.router);
    const themeCommand = new ThemeCommand(this.logger);
    const statusCommand = new StatusCommand(this.logger, this.system);
    
    // Register commands
    this.router.register('sisters', {
      aliases: ['list', 'hermanas'],
      description: '🌸 Conoce a todas mis hermanas bot',
      usage: 'celia sisters',
      action: (args) => listCommand.execute(args)
    });
    
    this.router.register('help', {
      aliases: ['h', 'ayuda'],
      description: '💫 Obtén ayuda de Celia',
      usage: 'celia help [comando]',
      action: (args) => helpCommand.execute(args)
    });
    
    this.router.register('theme', {
      aliases: ['themes', 'style'],
      description: '🎨 Cambia mi apariencia visual',
      usage: 'celia theme [celestial|kawaii|dreamy]',
      action: async (args) => await themeCommand.execute(args)
    });
    
    this.router.register('status', {
      aliases: ['info', 'system'],
      description: '🔧 Información del sistema y entorno',
      usage: 'celia status',
      action: (args) => statusCommand.execute(args)
    });
    
    // Placeholder commands for now
    this.router.register('install', {
      aliases: ['add', 'setup'],
      description: '💖 Instala a una de mis hermanas con mucho amor',
      usage: 'celia install <hermana>',
      action: (args) => this.modernInstall(args[0])
    });
    
    this.router.register('quick', {
      aliases: ['fast', 'rapido'],
      description: '⚡ Instalación súper rápida',
      usage: 'celia quick <hermana>',
      action: (args) => this.quickInstallBot(args[0])
    });
  }
  
  /**
   * 🌟 Modern CLI entry point with beautiful parsing~
   */
  async run() {
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
      const command = args[0];
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
      this.logger.log(`🌸 Aww, algo salió mal: ${error.message}`, 'error');
      console.log('');
      this.logger.log('💡 Intenta "celia help" para ver los comandos disponibles~', 'info');
    } finally {
      this.prompt.close();
    }
  }
  
  /**
   * Show version information
   */
  showVersion() {
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
  showBanner() {
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
  async startInteractiveMode() {
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
        const command = args[0];
        const commandArgs = args.slice(1);
        
        await this.router.execute(command, commandArgs);
        console.log('');
        
      } catch (error) {
        if (error.code === 'SIGINT') {
          this.logger.log('\n🌸 ¡Hasta luego! ¡Que tengas un día celestial!~', 'primary');
          break;
        }
        this.logger.log(`🌸 Error: ${error.message}`, 'error');
        console.log('');
      }
    }
    
    this.interactive = false;
  }
  
  // Placeholder methods for install commands (to be implemented later)
  async modernInstall(botName) {
    this.logger.log('🚧 Función de instalación en desarrollo...', 'warning');
    this.logger.log(`Instalando: ${botName}`, 'info');
  }
  
  async quickInstallBot(botName) {
    this.logger.log('🚧 Función de instalación rápida en desarrollo...', 'warning');
    this.logger.log(`Instalación rápida: ${botName}`, 'info');
  }
}

module.exports = CeliaAssistant;