#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

// 🌸 Celia's beautiful theme system~
const THEMES = {
  celestial: {
    primary: '\x1b[38;5;147m',     // Light purple
    secondary: '\x1b[38;5;183m',   // Pink
    accent: '\x1b[38;5;219m',      // Rose
    success: '\x1b[38;5;157m',     // Mint green
    warning: '\x1b[38;5;221m',     // Golden
    error: '\x1b[38;5;210m',       // Soft red
    info: '\x1b[38;5;159m',        // Sky blue
    text: '\x1b[38;5;250m',        // Light gray
    dim: '\x1b[38;5;244m',         // Dim gray
    bright: '\x1b[38;5;15m',       // White
    reset: '\x1b[0m'
  },
  kawaii: {
    primary: '\x1b[38;5;213m',     // Hot pink
    secondary: '\x1b[38;5;225m',   // Light pink
    accent: '\x1b[38;5;207m',      // Deep pink
    success: '\x1b[38;5;121m',     // Bright green
    warning: '\x1b[38;5;226m',     // Bright yellow
    error: '\x1b[38;5;203m',       // Red
    info: '\x1b[38;5;117m',        // Light blue
    text: '\x1b[38;5;255m',        // Bright white
    dim: '\x1b[38;5;242m',         // Medium gray
    bright: '\x1b[38;5;15m',       // White
    reset: '\x1b[0m'
  },
  dreamy: {
    primary: '\x1b[38;5;140m',     // Purple
    secondary: '\x1b[38;5;176m',   // Lavender
    accent: '\x1b[38;5;104m',      // Deep purple
    success: '\x1b[38;5;151m',     // Soft green
    warning: '\x1b[38;5;179m',     // Peach
    error: '\x1b[38;5;167m',       // Soft coral
    info: '\x1b[38;5;109m',        // Soft blue
    text: '\x1b[38;5;252m',        // Off white
    dim: '\x1b[38;5;240m',         // Dark gray
    bright: '\x1b[38;5;15m',       // White
    reset: '\x1b[0m'
  }
};

// Default theme
let currentTheme = 'celestial';
const colors = THEMES[currentTheme];

// 🌸 Mis hermanas bot (¡Las cuido con mucho amor!) - Celia ✨
const BOTS = {
  nebula: {
    name: 'Nebula',
    url: 'https://github.com/OpceanAI/Nebula-Open-source',
    description: 'Mi hermana musical súper responsable~ ¡Toca música y modera servidores!',
    language: 'Node.js',
    category: '🎵 Música & Moderación',
    envVars: [
      { name: 'BOT_TOKEN', description: 'Discord Bot Token', required: true, sensitive: true },
      { name: 'CLIENT_ID', description: 'Discord Client ID', required: true, sensitive: false },
      { name: 'OWNER_ID', description: 'Discord Owner ID', required: true, sensitive: false },
      { name: 'MONGO_CONNECTION', description: 'MongoDB Connection URL', required: true, sensitive: true },
      { name: 'LAVALINK_HOST', description: 'Lavalink Host', required: false, default: 'localhost' },
      { name: 'LAVALINK_PORT', description: 'Lavalink Port', required: false, default: '2333' },
      { name: 'LAVALINK_PASSWORD', description: 'Lavalink Password', required: false, default: 'youshallnotpass', sensitive: true },
      { name: 'WEATHER_API_KEY', description: 'Weather API Key', required: false, sensitive: true },
      { name: 'TRANSLATE_API_KEY', description: 'Translation API Key', required: false, sensitive: true }
    ]
  },
  archan: {
    name: 'Archan',
    url: 'https://github.com/OpceanAI/Archan-Open-source',
    description: 'Mi hermana súper inteligente~ ¡Habla usando Google Gemini!',
    language: 'Node.js',
    category: '🤖 Inteligencia Artificial',
    envVars: [
      { name: 'ARCHAN_BOT_TOKEN', description: 'Discord Bot Token para Archan', required: true, sensitive: true },
      { name: 'ARCHAN_CLIENT_ID', description: 'Discord Client ID para Archan', required: true, sensitive: false },
      { name: 'GEMINI_API_KEY', description: 'Google Gemini AI API Key', required: true, sensitive: true }
    ]
  },
  sakura: {
    name: 'Sakura',
    url: 'https://github.com/OpceanAI/Sakura-Open-source',
    description: 'Mi hermana kawaii~ ¡Somos muy parecidas! Adorable con IA y música',
    language: 'Python',
    category: '🌸 Kawaii & IA',
    envVars: [
      { name: 'BOT_TOKEN', description: 'Discord Bot Token', required: true, sensitive: true },
      { name: 'CLIENT_ID', description: 'Discord Client ID', required: true, sensitive: false },
      { name: 'GEMINI_API_KEY', description: 'Google Gemini AI API Key', required: true, sensitive: true },
      { name: 'POSTGRESQL_URL', description: 'PostgreSQL Database URL', required: false, sensitive: true },
      { name: 'WEATHER_API_KEY', description: 'API Key para servicio de clima', required: false, sensitive: true },
      { name: 'NEWS_API_KEY', description: 'API Key para noticias', required: false, sensitive: true },
      { name: 'DEEPSEEK_API_KEY', description: 'DeepSeek AI API Key (alternativo)', required: false, sensitive: true }
    ]
  },
  lumina: {
    name: 'Lumina',
    url: 'https://github.com/aguitauwu/Lumina',
    description: 'Mi hermana organizadora~ ¡Mantiene todo ordenadito en los servidores!',
    language: 'TypeScript',
    category: '⚡ Gestión de Servidor',
    envVars: [
      { name: 'DISCORD_TOKEN', description: 'Discord Bot Token', required: true, sensitive: true },
      { name: 'DISCORD_CLIENT_ID', description: 'Discord Application ID', required: true, sensitive: false },
      { name: 'DATABASE_URL', description: 'PostgreSQL Database URL (opcional)', required: false, sensitive: true },
      { name: 'MONGODB_URI', description: 'MongoDB Connection URI (alternativo)', required: false, sensitive: true }
    ]
  },
  katu: {
    name: 'Katu',
    url: 'https://github.com/aguitauwu/Katu-bot',
    description: 'Mi hermana estadística~ ¡Cuenta mensajes y hace rankings súper cool!',
    language: 'TypeScript', 
    category: '📊 Estadísticas & IA',
    envVars: [
      { name: 'DISCORD_TOKEN', description: 'Discord Bot Token', required: true, sensitive: true },
      { name: 'GEMINI_API_KEY', description: 'Google Gemini AI API Key', required: true, sensitive: true },
      { name: 'MONGODB_URI', description: 'MongoDB Connection URI (recomendado)', required: false, sensitive: true },
      { name: 'DATABASE_URL', description: 'PostgreSQL Database URL (alternativo)', required: false, sensitive: true }
    ]
  }
};

class CeliaAssistant {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 🌸 Celia's enhanced environment detection~
    this.isTermux = process.env.PREFIX && process.env.PREFIX.includes('com.termux');
    this.isARM = ['arm', 'arm64', 'armv7l', 'aarch64'].includes(os.arch());
    this.platform = os.platform();
    this.theme = currentTheme;
    this.interactive = false;
    this.commands = new Map();
    
    // 🌙 Initialize Celia's beautiful commands~
    this.initializeCommands();
  }

  /**
   * 🌙 Celia's beautiful theming system~
   */
  log(message, style = 'text') {
    const theme = THEMES[this.theme];
    console.log(`${theme[style]}${message}${theme.reset}`);
  }

  /**
   * 🌸 Beautiful gradient text effect~
   */
  gradientLog(message, styles = ['primary', 'secondary', 'accent']) {
    const theme = THEMES[this.theme];
    const words = message.split(' ');
    let output = '';
    
    words.forEach((word, i) => {
      const style = styles[i % styles.length];
      output += `${theme[style]}${word}${theme.reset} `;
    });
    
    console.log(output.trim());
  }

  /**
   * 🌟 Create beautiful boxes~
   */
  createBox(content, style = 'primary', padding = 1) {
    const theme = THEMES[this.theme];
    const lines = Array.isArray(content) ? content : [content];
    const maxLength = Math.max(...lines.map(line => line.length));
    const width = maxLength + (padding * 2);
    
    const top = '╭' + '─'.repeat(width) + '╮';
    const bottom = '╰' + '─'.repeat(width) + '╯';
    
    console.log(`${theme[style]}${top}${theme.reset}`);
    lines.forEach(line => {
      const padded = line.padEnd(maxLength);
      const spaces = ' '.repeat(padding);
      console.log(`${theme[style]}│${spaces}${theme.reset}${theme.bright}${padded}${theme.reset}${theme[style]}${spaces}│${theme.reset}`);
    });
    console.log(`${theme[style]}${bottom}${theme.reset}`);
  }

  /**
   * 🌸 Initialize Celia's modern command system~
   */
  initializeCommands() {
    // Modern command structure like Gemini CLI
    this.commands.set('sisters', {
      aliases: ['list', 'hermanas'],
      description: '🌸 Conoce a todas mis hermanas bot',
      usage: 'celia sisters',
      action: () => this.showSistersGrid()
    });
    
    this.commands.set('install', {
      aliases: ['add', 'setup'],
      description: '💖 Instala a una de mis hermanas con mucho amor',
      usage: 'celia install <hermana>',
      action: (args) => this.modernInstall(args[0])
    });
    
    this.commands.set('quick', {
      aliases: ['fast', 'rapido'],
      description: '⚡ Instalación súper rápida',
      usage: 'celia quick <hermana>',
      action: (args) => this.quickInstallBot(args[0])
    });
    
    this.commands.set('theme', {
      aliases: ['themes', 'style'],
      description: '🎨 Cambia mi apariencia visual',
      usage: 'celia theme [celestial|kawaii|dreamy]',
      action: (args) => this.handleTheme(args[0])
    });
    
    this.commands.set('help', {
      aliases: ['h', 'ayuda'],
      description: '💫 Obtén ayuda de Celia',
      usage: 'celia help [comando]',
      action: (args) => this.modernHelp(args[0])
    });
    
    this.commands.set('interactive', {
      aliases: ['chat', 'talk'],
      description: '💬 Modo conversacional con Celia',
      usage: 'celia interactive',
      action: () => this.startInteractiveMode()
    });
    
    this.commands.set('status', {
      aliases: ['info', 'system'],
      description: '🔧 Información del sistema y entorno',
      usage: 'celia status',
      action: () => this.showSystemInfo()
    });
    
    this.commands.set('tips', {
      aliases: ['consejos', 'ayuda'],
      description: '💡 Consejos útiles de Celia',
      usage: 'celia tips',
      action: () => this.showTips()
    });
    
    this.commands.set('about', {
      aliases: ['acerca', 'info'],
      description: '💖 Información sobre Celia',
      usage: 'celia about',
      action: () => this.showAbout()
    });
  }

  /**
   * Cross-platform directory removal with ARM/Termux compatibility
   */
  removeDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    
    try {
      // Use Node.js native recursive removal (Node 14.14+)
      if (fs.rmSync) {
        fs.rmSync(dirPath, { recursive: true, force: true });
      } else {
        // Fallback for older Node versions
        this.removeDirectoryRecursive(dirPath);
      }
    } catch (error) {
      // Enhanced platform-specific commands with ARM/Termux support
      let command;
      if (this.platform === 'win32') {
        command = `rmdir /s /q "${dirPath}"`;
      } else if (this.isTermux) {
        // Termux may have different rm behavior
        command = `rm -rf "${dirPath}" 2>/dev/null || rm -r "${dirPath}"`;
      } else {
        command = `rm -rf "${dirPath}"`;
      }
      
      try {
        execSync(command);
      } catch (cmdError) {
        // Final fallback for ARM/mobile environments
        if (this.isARM || this.isTermux) {
          this.log('⚠️  Usando eliminación manual en entorno ARM/Termux', 'yellow');
          this.removeDirectoryRecursive(dirPath);
        } else {
          throw cmdError;
        }
      }
    }
  }

  /**
   * Recursive directory removal fallback
   */
  removeDirectoryRecursive(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.removeDirectoryRecursive(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    
    fs.rmdirSync(dirPath);
  }

  /**
   * Prompt user for input with readline
   */
  async question(prompt, timeout = 30000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.log('\n⏰ Timeout - usando valor por defecto', 'yellow');
        resolve('');
      }, timeout);
      
      this.rl.question(prompt, (answer) => {
        clearTimeout(timer);
        resolve(answer.trim());
      });
    });
  }

  /**
   * Prompt user for sensitive input (hidden characters)
   */
  async questionHidden(prompt) {
    return new Promise((resolve) => {
      const stdin = process.stdin;
      const stdout = process.stdout;
      
      stdout.write(prompt);
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');
      
      let input = '';
      const onData = (char) => {
        switch (char) {
          case '\n':
          case '\r':
          case '\u0004':
            stdin.setRawMode(false);
            stdin.removeListener('data', onData);
            stdin.pause();
            stdout.write('\n');
            resolve(input);
            break;
          case '\u0003':
            process.exit(1);
            break;
          case '\u007f': // backspace
            if (input.length > 0) {
              input = input.slice(0, -1);
              stdout.write('\b \b');
            }
            break;
          default:
            input += char;
            stdout.write('*');
            break;
        }
      };
      
      stdin.on('data', onData);
    });
  }

  /**
   * 🌸 Celia's beautiful modern banner~
   */
  showBanner() {
    console.clear();
    console.log('');
    
    // Beautiful gradient banner
    this.createBox([
      '✨ ¡Holi! Soy Celia~ ✨',
      '🌸 Tu asistente celestial tierna 🌸',
      '',
      '💖 Ayudo a instalar a mis hermanas bot 💖',
      '(Aunque soy algo torpe, ehehe~)'
    ], 'primary', 2);
    
    console.log('');
    
    // Theme indicator
    this.log(`🎨 Tema actual: ${this.theme}`, 'dim');
    
    // Environment detection with love~
    if (this.isARM || this.isTermux) {
      console.log('');
      this.log('🌸 Entorno detectado:', 'info');
      if (this.isTermux) this.log('   📱 Termux Android', 'success');
      if (this.isARM) this.log('   🔧 Arquitectura ARM', 'success');
    }
    
    console.log('');
  }

  /**
   * 🌟 Beautiful sisters grid display~
   */
  showSistersGrid() {
    this.showBanner();
    
    this.gradientLog('🌸 ¡Mis Hermanas Bot! 🌸', ['primary', 'secondary', 'accent']);
    console.log('');
    
    // Group bots by category with beautiful display
    const categories = {};
    Object.entries(BOTS).forEach(([key, bot]) => {
      if (!categories[bot.category]) {
        categories[bot.category] = [];
      }
      categories[bot.category].push({ key, ...bot });
    });
    
    Object.entries(categories).forEach(([category, bots]) => {
      this.log(`${category}`, 'accent');
      console.log('');
      
      bots.forEach(bot => {
        this.createBox([
          `${bot.name} 💖`,
          `${bot.description}`,
          '',
          `💻 ${bot.language}`,
          `🌸 celia install ${bot.key}`,
          `⚡ celia quick ${bot.key}`
        ], 'secondary', 1);
        console.log('');
      });
    });
    
    this.log('💡 Tip: Usa "celia help" para ver todos los comandos~', 'info');
    console.log('');
  }

  /**
   * 🌸 Modern help system~
   */
  modernHelp(specificCommand = null) {
    this.showBanner();
    
    if (specificCommand && this.commands.has(specificCommand)) {
      const cmd = this.commands.get(specificCommand);
      this.createBox([
        `Comando: ${specificCommand}`,
        '',
        cmd.description,
        '',
        `Uso: ${cmd.usage}`,
        cmd.aliases.length > 0 ? `Alias: ${cmd.aliases.join(', ')}` : ''
      ].filter(Boolean), 'primary', 2);
      return;
    }
    
    this.gradientLog('💫 Comandos de Celia 💫', ['primary', 'secondary', 'accent']);
    console.log('');
    
    // Group commands by category
    const categories = {
      '🌸 Hermanas': ['sisters', 'install', 'quick'],
      '🎨 Personalización': ['theme'],
      '💬 Interacción': ['interactive', 'help'],
      '🔧 Información': ['status', 'tips', 'about']
    };
    
    Object.entries(categories).forEach(([category, commandNames]) => {
      this.log(category, 'accent');
      console.log('');
      
      commandNames.forEach(cmdName => {
        if (this.commands.has(cmdName)) {
          const cmd = this.commands.get(cmdName);
          this.log(`  ${cmd.usage}`, 'primary');
          this.log(`    ${cmd.description}`, 'dim');
          if (cmd.aliases.length > 0) {
            this.log(`    Alias: ${cmd.aliases.join(', ')}`, 'dim');
          }
          console.log('');
        }
      });
    });
    
    // Special mobile tips
    if (this.isARM || this.isTermux) {
      this.createBox([
        '📱 Consejos para móviles:',
        '',
        '• Usa "celia quick" para mejor compatibilidad',
        '• Instala: apt install git nodejs',
        '• El modo interactivo funciona genial en móviles!'
      ], 'warning', 1);
      console.log('');
    }
    
    this.log('💡 Tip: Usa "celia help <comando>" para ayuda específica~', 'info');
    console.log('');
  }

  /**
   * 🌸 Celia te presenta a todas sus hermanas~
   */
  showBotList() {
    this.showBanner();
    this.log('🌸 ¡Conoce a mis hermanas bot! (¡Las amo muchisimo!)', 'yellow');
    this.log('═══════════════════════════════════════════════════\n', 'yellow');
    
    // Group bots by category
    const categories = {};
    Object.entries(BOTS).forEach(([key, bot]) => {
      if (!categories[bot.category]) {
        categories[bot.category] = [];
      }
      categories[bot.category].push({ key, ...bot });
    });
    
    // Display by category
    Object.entries(categories).forEach(([category, bots]) => {
      this.log(`${category}`, 'magenta');
      this.log('─'.repeat(50), 'magenta');
      
      bots.forEach(bot => {
        this.log(`\n  🌸 ${bot.name} (¡mi hermana querida!)`, 'green');
        this.log(`     💖 ${bot.description}`, 'reset');
        this.log(`     💻 Lenguaje: ${bot.language}`, 'blue');
        this.log(`     🌸 Instalar tierno: opceanaicli install ${bot.key}`, 'cyan');
        this.log(`     ✨ Rápido como el viento: opceanaicli quick-install ${bot.key}`, 'yellow');
      });
      this.log('');
    });
    
    this.log('🌙 ¡CELIA TE AYUDA SIEMPRE!:', 'yellow');
    this.log('   • Instalación tierna: opceanaicli install <hermana> (¡te guío paso a paso!)', 'reset');
    this.log('   • Instalación rápida: opceanaicli quick-install <hermana> (¡para cuando tienes prisa!)', 'reset');
    this.log('   • Ver ayuda: opceanaicli --help (¡siempre estaré aquí!)\n', 'reset');
  }

  /**
   * 🌸 Celia trae a tu hermana de su casita en GitHub~
   */
  async cloneRepository(bot, targetDir) {
    try {
      this.log(`\n🌸 ¡Trayendo a ${bot.name} a tu computadora!~`, 'blue');
      this.log(`🌙 Visitando su casita: ${bot.url}`, 'cyan');
      
      // 🌸 Celia optimiza para tu móvil/ARM con amor~
      if (this.isARM || this.isTermux) {
        this.log('🌸 Optimizando para tu móvil con amor...', 'yellow');
        try {
          // Prevent git from using system credential helpers that might not work on ARM
          execSync('git config --global credential.helper ""', { stdio: 'ignore' });
        } catch (e) {
          // Ignore if git config fails
        }
      }
      
      execSync(`git clone ${bot.url} "${targetDir}"`, { stdio: 'inherit' });
      
      this.log(`✅ ¡${bot.name} ya está contigo! (¡qué felicidad!)`, 'green');
      return true;
    } catch (error) {
      this.log(`🌸 Aww, algo salió mal: ${error.message} (¡no te preocupes!)`, 'red');
      
      // 🌸 Celia te ayuda con consejos para tu móvil~
      if (this.isARM || this.isTermux) {
        this.log('🌸 No te preocupes, ¡Celia te ayuda!:', 'cyan');
        this.log('   - ¿Tienes git? Proba: apt install git (¡yo te espero!)', 'reset');
        this.log('   - ¿Tu internet funciona bien?~ (¡revísalo por favor!)', 'reset');
        this.log('   - A veces los móviles necesitan truquitos especiales', 'reset');
      }
      
      return false;
    }
  }

  /**
   * 🌸 Celia te ayuda a configurar a tu hermana con amor~
   */
  async configureEnvironment(bot) {
    this.log(`\n🌸 ¡Configuremos a ${bot.name} juntos!~`, 'magenta');
    this.log('═══════════════════════════════════', 'magenta');
    
    const envVars = {};
    const required = bot.envVars.filter(v => v.required);
    const optional = bot.envVars.filter(v => !v.required);
    
    // 🌸 Configurar cositas importantes primero~
    if (required.length > 0) {
      this.log('\n🌸 Cositas IMPORTANTES (no podemos olvidarlas!):', 'red');
      
      for (const envVar of required) {
        this.log(`\n📝 ${envVar.name}`, 'yellow');
        this.log(`   ${envVar.description}`, 'reset');
        
        let value = '';
        let attempts = 0;
        while (!value && attempts < 3) {
          attempts++;
          if (envVar.sensitive) {
            value = await this.questionHidden('🔐 Valor (oculto): ');
          } else {
            value = await this.question('📋 Valor: ');
          }
          
          if (!value) {
            if (attempts >= 3) {
              this.log('   🌸 Aww, saltemos esto por ahora~ (¡lo arreglaremos después!)', 'yellow');
              break;
            } else {
              this.log('   🌸 ¡Esto es súper importante! (¡por favor ponlo!)~', 'red');
            }
          }
        }
        
        envVars[envVar.name] = value;
        this.log(`   ✅ ¡${envVar.name} listo! (¡qué bien!)~`, 'green');
      }
    }
    
    // 🌸 Cositas opcionales (si quieres, ehehe~)
    if (optional.length > 0) {
      this.log('\n🌙 Cositas OPCIONALES (¡puedes elegir!):', 'yellow');
      
      for (const envVar of optional) {
        this.log(`\n📝 ${envVar.name}`, 'yellow');
        this.log(`   ${envVar.description}`, 'reset');
        if (envVar.default) {
          this.log(`   Por defecto: ${envVar.default}`, 'cyan');
        }
        
        const configure = await this.question('   ¿Configurar? (y/N): ');
        
        if (configure.toLowerCase() === 'y') {
          let value = '';
          if (envVar.sensitive) {
            value = await this.questionHidden('🔐 Valor (oculto): ');
          } else {
            const prompt = envVar.default ? `📋 Valor (${envVar.default}): ` : '📋 Valor: ';
            value = await this.question(prompt);
            if (!value && envVar.default) {
              value = envVar.default;
            }
          }
          
          if (value) {
            envVars[envVar.name] = value;
            this.log(`   ✅ ${envVar.name} configurado`, 'green');
          }
        }
      }
    }
    
    return envVars;
  }

  /**
   * 🌸 Celia crea archivitos bonitos para tu hermana~
   */
  createEnvFile(envVars, targetDir, bot) {
    try {
      const envPath = path.join(targetDir, '.env');
      
      let content = `# ═══════════════════════════════════════════════\n`;
      content += `# 🌸 ${bot.name} - Configuración creada por Celia con amor~\n`;
      content += `# ✨ Generado por Celia CLI v2.0.0 (¡con muchísimo cariño!)\n`;
      content += `# ═══════════════════════════════════════════════\n\n`;
      
      switch (bot.name) {
        case 'Nebula':
          content += this.generateNebulaEnv(envVars);
          break;
        case 'Archan':
          content += this.generateArchanEnv(envVars);
          break;
        case 'Sakura':
          content += this.generateSakuraEnv(envVars);
          break;
        case 'Lumina':
          content += this.generateLuminaEnv(envVars);
          break;
        case 'Katu':
          content += this.generateKatuEnv(envVars);
          break;
        default:
          content += this.generateGenericEnv(envVars, bot);
      }
      
      content += `\n# ═══════════════════════════════════════════════\n`;
      content += `# 🌸 ¡Configuración completada por Celia con mucho amor!\n`;
      content += `# ✨ Para que tu hermana cobre vida: npm start\n`;
      content += `# ═══════════════════════════════════════════════\n`;
      
      fs.writeFileSync(envPath, content);
      this.log('✅ ¡Archivito .env listo! (¡qué bonito quedó!)~', 'green');
      
      // 🌸 Crear ejemplo para que no te olvides~
      const exampleContent = content.replace(/=.+$/gm, '=');
      fs.writeFileSync(path.join(targetDir, '.env.example'), exampleContent);
      this.log('✅ ¡Archivo .env.example también! (¡soy muy ordenadita!)~', 'green');
      
      return true;
    } catch (error) {
      this.log(`🌸 Aww, algo salió mal creando .env: ${error.message} (¡no te preocupes!)`, 'red');
      return false;
    }
  }
  
  generateNebulaEnv(envVars) {
    let content = '# 🎵 CONFIGURACIÓN PRINCIPAL DE NEBULA\n';
    ['BOT_TOKEN', 'CLIENT_ID', 'OWNER_ID'].forEach(key => {
      if (envVars[key]) content += `${key}=${envVars[key]}\n`;
    });
    
    content += '\n# 🗄️ BASE DE DATOS\n';
    if (envVars.MONGO_CONNECTION) content += `MONGO_CONNECTION=${envVars.MONGO_CONNECTION}\n`;
    
    content += '\n# 🎶 SISTEMA DE MÚSICA (Opcional)\n';
    ['LAVALINK_HOST', 'LAVALINK_PORT', 'LAVALINK_PASSWORD'].forEach(key => {
      if (envVars[key]) content += `${key}=${envVars[key]}\n`;
    });
    
    content += '\n# 🌐 APIS EXTERNAS (Opcional)\n';
    ['WEATHER_API_KEY', 'TRANSLATE_API_KEY'].forEach(key => {
      if (envVars[key]) content += `${key}=${envVars[key]}\n`;
    });
    
    return content;
  }
  
  generateArchanEnv(envVars) {
    let content = '# 🤖 CONFIGURACIÓN PRINCIPAL DE ARCHAN\n';
    ['ARCHAN_BOT_TOKEN', 'ARCHAN_CLIENT_ID'].forEach(key => {
      if (envVars[key]) content += `${key}=${envVars[key]}\n`;
    });
    
    content += '\n# 🧠 CONFIGURACIÓN DE IA\n';
    if (envVars.GEMINI_API_KEY) content += `GEMINI_API_KEY=${envVars.GEMINI_API_KEY}\n`;
    
    return content;
  }
  
  generateSakuraEnv(envVars) {
    let content = '# 🌸 CONFIGURACIÓN PRINCIPAL DE SAKURA\n';
    ['BOT_TOKEN', 'CLIENT_ID'].forEach(key => {
      if (envVars[key]) content += `${key}=${envVars[key]}\n`;
    });
    
    content += '\n# 🧠 INTELIGENCIA ARTIFICIAL\n';
    if (envVars.GEMINI_API_KEY) content += `GEMINI_API_KEY=${envVars.GEMINI_API_KEY}\n`;
    if (envVars.DEEPSEEK_API_KEY) content += `DEEPSEEK_API_KEY=${envVars.DEEPSEEK_API_KEY}\n`;
    
    content += '\n# 🗄️ BASE DE DATOS (Opcional)\n';
    if (envVars.POSTGRESQL_URL) content += `POSTGRESQL_URL=${envVars.POSTGRESQL_URL}\n`;
    
    content += '\n# 🌐 APIS EXTERNAS (Opcional)\n';
    ['WEATHER_API_KEY', 'NEWS_API_KEY'].forEach(key => {
      if (envVars[key]) content += `${key}=${envVars[key]}\n`;
    });
    
    return content;
  }
  
  generateLuminaEnv(envVars) {
    let content = '# ⚡ CONFIGURACIÓN PRINCIPAL DE LUMINA\n';
    ['DISCORD_TOKEN', 'DISCORD_CLIENT_ID'].forEach(key => {
      if (envVars[key]) content += `${key}=${envVars[key]}\n`;
    });
    
    content += '\n# 🗄️ BASE DE DATOS (Opcional - Auto-detección)\n';
    if (envVars.DATABASE_URL) content += `DATABASE_URL=${envVars.DATABASE_URL}\n`;
    if (envVars.MONGODB_URI) content += `MONGODB_URI=${envVars.MONGODB_URI}\n`;
    
    content += '# Lumina funciona sin base de datos externa (almacenamiento local)\n';
    
    return content;
  }
  
  generateKatuEnv(envVars) {
    let content = '# 📊 CONFIGURACIÓN PRINCIPAL DE KATU\n';
    if (envVars.DISCORD_TOKEN) content += `DISCORD_TOKEN=${envVars.DISCORD_TOKEN}\n`;
    
    content += '\n# 🧠 INTELIGENCIA ARTIFICIAL\n';
    if (envVars.GEMINI_API_KEY) content += `GEMINI_API_KEY=${envVars.GEMINI_API_KEY}\n`;
    
    content += '\n# 🗄️ BASE DE DATOS (MongoDB recomendado)\n';
    if (envVars.MONGODB_URI) content += `MONGODB_URI=${envVars.MONGODB_URI}\n`;
    if (envVars.DATABASE_URL) content += `DATABASE_URL=${envVars.DATABASE_URL}\n`;
    
    content += '# Katu puede usar memoria si no hay base de datos\n';
    
    return content;
  }
  
  generateGenericEnv(envVars, bot) {
    let content = `# ${bot.name.toUpperCase()} CONFIGURATION\n`;
    Object.entries(envVars).forEach(([key, value]) => {
      if (value) content += `${key}=${value}\n`;
    });
    return content;
  }

  /**
   * Create .env template for quick installation
   */
  createEnvTemplate(bot, targetDir) {
    try {
      const envPath = path.join(targetDir, '.env');
      
      let content = `# ═══════════════════════════════════════════════\n`;
      content += `# 🤖 ${bot.name} Bot - Plantilla de Configuración\n`;
      content += `# Generated by OpceanAI CLI v2.0.0\n`;
      content += `# ⚠️  COMPLETA ESTOS VALORES ANTES DE USAR\n`;
      content += `# ═══════════════════════════════════════════════\n\n`;
      
      switch (bot.name) {
        case 'Nebula':
          content += this.generateNebulaTemplate();
          break;
        case 'Archan':
          content += this.generateArchanTemplate();
          break;
        case 'Sakura':
          content += this.generateSakuraTemplate();
          break;
        case 'Lumina':
          content += this.generateLuminaTemplate();
          break;
        case 'Katu':
          content += this.generateKatuTemplate();
          break;
        default:
          content += this.generateGenericTemplate(bot);
      }
      
      content += `\n# ═══════════════════════════════════════════════\n`;
      content += `# 📝 Para completar la configuración:\n`;
      content += `#    1. Rellena las variables REQUERIDAS\n`;
      content += `#    2. Ejecuta: npm start\n`;
      content += `#    3. ¡Disfruta tu bot!\n`;
      content += `# ═══════════════════════════════════════════════\n`;
      
      fs.writeFileSync(envPath, content);
      this.log('✅ Plantilla .env creada (requiere configuración)', 'yellow');
      
      // Create .env.example
      fs.writeFileSync(path.join(targetDir, '.env.example'), content);
      this.log('✅ Archivo .env.example creado', 'green');
      
      return true;
    } catch (error) {
      this.log(`❌ Error creando plantilla .env: ${error.message}`, 'red');
      return false;
    }
  }
  
  generateNebulaTemplate() {
    return `# 🎵 CONFIGURACIÓN PRINCIPAL (REQUERIDO)
BOT_TOKEN=tu_token_de_discord_aqui
CLIENT_ID=tu_client_id_de_discord_aqui
OWNER_ID=tu_id_de_usuario_discord_aqui

# 🗄️ BASE DE DATOS (REQUERIDO)
MONGO_CONNECTION=mongodb://localhost:27017/nebula

# 🎶 SISTEMA DE MÚSICA (Opcional)
LAVALINK_HOST=localhost
LAVALINK_PORT=2333
LAVALINK_PASSWORD=youshallnotpass

# 🌐 APIS EXTERNAS (Opcional)
# WEATHER_API_KEY=tu_api_key_clima
# TRANSLATE_API_KEY=tu_api_key_traduccion`;
  }
  
  generateArchanTemplate() {
    return `# 🤖 CONFIGURACIÓN PRINCIPAL (REQUERIDO)
ARCHAN_BOT_TOKEN=tu_token_de_discord_aqui
ARCHAN_CLIENT_ID=tu_client_id_de_discord_aqui

# 🧠 CONFIGURACIÓN DE IA (REQUERIDO)
GEMINI_API_KEY=tu_api_key_de_google_gemini_aqui`;
  }
  
  generateSakuraTemplate() {
    return `# 🌸 CONFIGURACIÓN PRINCIPAL (REQUERIDO)
BOT_TOKEN=tu_token_de_discord_aqui
CLIENT_ID=tu_client_id_de_discord_aqui

# 🧠 INTELIGENCIA ARTIFICIAL (REQUERIDO)
GEMINI_API_KEY=tu_api_key_de_google_gemini_aqui

# 🗄️ BASE DE DATOS (Opcional)
# POSTGRESQL_URL=postgresql://user:pass@host:5432/sakura

# 🌐 APIS EXTERNAS (Opcional)
# WEATHER_API_KEY=tu_api_key_clima
# NEWS_API_KEY=tu_api_key_noticias
# DEEPSEEK_API_KEY=tu_api_key_deepseek`;
  }
  
  generateLuminaTemplate() {
    return `# ⚡ CONFIGURACIÓN PRINCIPAL (REQUERIDO)
DISCORD_TOKEN=tu_token_de_discord_aqui
DISCORD_CLIENT_ID=tu_application_id_de_discord_aqui

# 🗄️ BASE DE DATOS (Opcional - elige una opción)
# DATABASE_URL=postgresql://user:pass@host:5432/lumina
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/lumina
# Si no configuras base de datos, Lumina usará almacenamiento local`;
  }
  
  generateKatuTemplate() {
    return `# 📊 CONFIGURACIÓN PRINCIPAL (REQUERIDO)
DISCORD_TOKEN=tu_token_de_discord_aqui

# 🧠 INTELIGENCIA ARTIFICIAL (REQUERIDO)
GEMINI_API_KEY=tu_api_key_de_google_gemini_aqui

# 🗄️ BASE DE DATOS (Opcional - elige una opción)
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/katu
# DATABASE_URL=postgresql://user:pass@host:5432/katu
# Si no configuras base de datos, Katu usará memoria interna`;
  }
  
  generateGenericTemplate(bot) {
    let content = `# ${bot.name.toUpperCase()} CONFIGURACIÓN (REQUERIDO)\n`;
    bot.envVars.forEach(envVar => {
      if (envVar.required) {
        content += `${envVar.name}=valor_requerido_aqui\n`;
      } else {
        content += `# ${envVar.name}=valor_opcional\n`;
      }
    });
    return content;
  }

  /**
   * Install npm dependencies
   */
  async installDependencies(targetDir, bot) {
    try {
      const install = await this.question('\n📦 ¿Instalar dependencias? (Y/n): ');
      if (install.toLowerCase() === 'n') return true;
      
      this.log('🔄 Instalando dependencias...', 'cyan');
      
      switch (bot.language) {
        case 'Python':
          return await this.installPythonDeps(targetDir);
        case 'TypeScript':
          return await this.installTypescriptDeps(targetDir);
        case 'Node.js':
        default:
          return await this.installNodeDeps(targetDir);
      }
    } catch (error) {
      this.log(`❌ Error: ${error.message}`, 'red');
      return false;
    }
  }

  async installNodeDeps(targetDir) {
    if (!fs.existsSync(path.join(targetDir, 'package.json'))) {
      this.log('ℹ️  No hay package.json', 'yellow');
      return true;
    }
    
    execSync('npm install', { stdio: 'inherit', cwd: targetDir });
    this.log('✅ Dependencias Node.js instaladas', 'green');
    return true;
  }

  async installPythonDeps(targetDir) {
    const reqFile = path.join(targetDir, 'requirements.txt');
    if (fs.existsSync(reqFile)) {
      execSync('pip install -r requirements.txt', { stdio: 'inherit', cwd: targetDir });
      this.log('✅ Dependencias Python instaladas', 'green');
    } else {
      this.log('ℹ️  No hay requirements.txt', 'yellow');
    }
    return true;
  }

  async installTypescriptDeps(targetDir) {
    if (!fs.existsSync(path.join(targetDir, 'package.json'))) {
      this.log('ℹ️  No hay package.json', 'yellow');
      return true;
    }
    
    execSync('npm install', { stdio: 'inherit', cwd: targetDir });
    
    try {
      execSync('npm run build', { stdio: 'inherit', cwd: targetDir });
      this.log('✅ TypeScript compilado', 'green');
    } catch {
      this.log('⚠️  No se pudo compilar automáticamente', 'yellow');
    }
    
    this.log('✅ Dependencias TypeScript instaladas', 'green');
    return true;
  }

  /**
   * 🌸 Celia te felicita y te guía para el siguiente paso~
   */
  showInstructions(bot, targetDir) {
    this.log('\n╭─────────────────────────────────────────────────╮', 'green');
    this.log('│     🌸 ¡YAAAY! ¡LO LOGRAMOS JUNTOS! 🌸      │', 'green');
    this.log('╰─────────────────────────────────────────────────╯', 'green');
    this.log(`🌸 Tu hermana vive aquí: ${path.resolve(targetDir)}`, 'cyan');
    this.log(`🌙 ¡Vamos ahí!: cd "${targetDir}"`, 'yellow');
    
    // Language-specific run commands
    switch (bot.language) {
      case 'Python':
        this.log('🌸 Dale vida: python bot_unificado_completo.py', 'yellow');
        this.log('   ✨ O también: python install.py', 'cyan');
        break;
      case 'TypeScript':
        this.log('🌙 Preparar: npm run build', 'yellow');
        this.log('✨ ¡A vivir!: npm start', 'yellow');
        break;
      case 'Node.js':
      default:
        this.log('✨ ¡Que cobre vida!: npm start', 'yellow');
    }
    
    this.log(`\n🌸 CÓMO PREPARAR A ${bot.name.toUpperCase()}:`, 'magenta');
    this.log('═'.repeat(50), 'magenta');
    this.log('1️⃣  🌙 Ir al Discord Developer Portal:', 'reset');
    this.log('   https://discord.com/developers/applications', 'blue');
    this.log('2️⃣  🌸 Crear aplicación → Bot → Copiar token', 'reset');
    this.log('3️⃣  ✨ General Information → Copiar Application ID', 'reset');
    
    // 🌸 Cositas especiales para cada hermana~
    if (bot.name === 'Nebula') {
      this.log('4️⃣  🌸 MongoDB Atlas: https://www.mongodb.com/cloud/atlas', 'reset');
    } else if (bot.name === 'Archan' || bot.name === 'Sakura' || bot.name === 'Katu') {
      this.log('4️⃣  🌙 Google AI Studio: https://ai.google.dev/', 'reset');
      this.log('   (¡Para que tu hermana sea súper inteligente!)~', 'cyan');
    } else if (bot.name === 'Lumina') {
      this.log('4️⃣  🌸 Base de datos (opcional):', 'reset');
      this.log('   PostgreSQL o MongoDB - ¡también funciona sin nada!', 'cyan');
    }
    
    this.log(`\n🌸 ¿QUÉ HACE ${bot.name}? (¡la amo!)`, 'yellow');
    this.log(`   💖 ${bot.description}`, 'reset');
    this.log(`   🌙 Lenguaje: ${bot.language}`, 'reset');
    this.log(`   🌸 Categoría: ${bot.category}`, 'reset');
  }

  /**
   * Quick install with minimal interaction
   */
  async quickInstallBot(botName) {
    const bot = BOTS[botName.toLowerCase()];
    
    if (!bot) {
      this.log(`❌ Bot "${botName}" no encontrado`, 'red');
      this.log('Usa: opceanaicli list', 'yellow');
      this.rl.close();
      return;
    }
    
    this.showBanner();
    this.log(`🚀 Instalación rápida de ${bot.name}`, 'yellow');
    this.log(`📋 ${bot.description}\n`, 'reset');
    
    const defaultDir = `${bot.name.toLowerCase()}-bot`;
    
    // Clone repository
    if (!(await this.cloneRepository(bot, defaultDir))) {
      this.rl.close();
      return;
    }
    
    // Create basic .env template
    this.createEnvTemplate(bot, defaultDir);
    
    // Show instructions
    this.log('\n🎉 ¡Instalación rápida completada!', 'green');
    this.log('═══════════════════════════════════', 'green');
    this.log(`📁 Proyecto: ${path.resolve(defaultDir)}`, 'cyan');
    this.log(`🚀 Siguiente: cd "${defaultDir}"`, 'yellow');
    this.log('🔧 Editar: .env (configurar tokens)', 'yellow');
    this.log('🏃 Ejecutar: npm install && npm start', 'yellow');
    
    this.rl.close();
  }
  

  /**
   * Install specified bot
   */
  async installBot(botName) {
    const bot = BOTS[botName.toLowerCase()];
    
    if (!bot) {
      this.log(`❌ Bot "${botName}" no encontrado`, 'red');
      this.log('Usa: opceanaicli list', 'yellow');
      return;
    }
    
    this.showBanner();
    this.log(`🤖 Instalando ${bot.name}`, 'yellow');
    this.log(`📋 ${bot.description}\n`, 'reset');
    
    const defaultDir = `${bot.name.toLowerCase()}-bot`;
    let targetDir = await this.question(`📁 Directorio (${defaultDir}): `);
    if (!targetDir) targetDir = defaultDir;
    
    // Validate directory name
    if (!/^[a-zA-Z0-9_-]+$/.test(targetDir)) {
      this.log('❌ Nombre de directorio inválido', 'red');
      this.rl.close();
      return;
    }
    
    // Handle existing directory
    if (fs.existsSync(targetDir)) {
      const overwrite = await this.question(`⚠️  '${targetDir}' existe. ¿Sobrescribir? (y/N): `);
      if (overwrite.toLowerCase() !== 'y') {
        this.log('❌ Cancelado', 'yellow');
        this.rl.close();
        return;
      }
      try {
        this.removeDirectory(targetDir);
      } catch (error) {
        this.log(`❌ No se pudo eliminar: ${error.message}`, 'red');
        this.rl.close();
        return;
      }
    }
    
    // Clone repository
    if (!(await this.cloneRepository(bot, targetDir))) {
      this.rl.close();
      return;
    }
    
    // Configure environment variables
    const envVars = await this.configureEnvironment(bot);
    
    // Create .env files
    if (Object.keys(envVars).length > 0) {
      this.createEnvFile(envVars, targetDir, bot);
    }
    
    // Install dependencies
    await this.installDependencies(targetDir, bot);
    
    // Show final instructions
    this.showInstructions(bot, targetDir);
    
    this.rl.close();
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
        this.showBanner();
        this.gradientLog('Celia v2.0.0 💖', ['primary', 'secondary']);
        console.log('');
        this.log('Tu asistente celestial tierna~', 'dim');
        console.log('');
        return;
      }
      
      // Parse modern command structure
      const command = args[0];
      const commandArgs = args.slice(1);
      
      // Handle legacy commands for compatibility
      if (command === 'list') {
        await this.executeCommand('sisters', []);
        return;
      }
      
      if (command === 'quick-install') {
        await this.executeCommand('quick', commandArgs);
        return;
      }
      
      // Execute modern command
      await this.executeCommand(command, commandArgs);
      
    } catch (error) {
      this.log(`🌸 Aww, algo salió mal: ${error.message}`, 'error');
      console.log('');
      this.log('💡 Intenta "celia help" para ver los comandos disponibles~', 'info');
    }
  }
  
  /**
   * 🌟 Execute commands with beautiful error handling~
   */
  async executeCommand(commandName, args) {
    // Find command by name or alias
    let command = null;
    let actualCommandName = commandName;
    
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    } else {
      // Search by alias
      for (const [name, cmd] of this.commands.entries()) {
        if (cmd.aliases.includes(commandName)) {
          command = cmd;
          actualCommandName = name;
          break;
        }
      }
    }
    
    if (!command) {
      this.showBanner();
      this.log(`🌸 No conozco el comando "${commandName}"~ `, 'error');
      console.log('');
      this.log('💡 Comandos disponibles:', 'info');
      for (const [name, cmd] of this.commands.entries()) {
        this.log(`   • ${name} - ${cmd.description}`, 'dim');
      }
      console.log('');
      return;
    }
    
    try {
      await command.action(args);
    } catch (error) {
      this.log(`🌸 Error ejecutando ${actualCommandName}: ${error.message}`, 'error');
    }
  }

  /**
   * 🎨 Handle theme changes~
   */
  handleTheme(themeName = null) {
    if (!themeName) {
      this.showBanner();
      this.log('🎨 Temas disponibles:', 'primary');
      console.log('');
      
      Object.keys(THEMES).forEach(theme => {
        const isActive = theme === this.theme;
        const indicator = isActive ? '● ' : '○ ';
        this.log(`${indicator}${theme}`, isActive ? 'accent' : 'dim');
      });
      
      console.log('');
      this.log('💡 Uso: celia theme <nombre>', 'info');
      return;
    }
    
    if (!THEMES[themeName]) {
      this.log(`🌸 Tema "${themeName}" no existe~ Temas disponibles: ${Object.keys(THEMES).join(', ')}`, 'error');
      return;
    }
    
    this.theme = themeName;
    currentTheme = themeName;
    this.showBanner();
    this.log(`✨ Tema cambiado a "${themeName}"! ¡Qué bonito!~`, 'success');
    console.log('');
  }
  
  /**
   * 💬 Enhanced interactive mode like Gemini CLI~
   */
  async startInteractiveMode() {
    this.interactive = true;
    this.showBanner();
    
    this.gradientLog('💬 Modo Interactivo Activado', ['primary', 'accent']);
    console.log('');
    
    // Show welcome tips with animation
    const welcomeMessages = [
      '¡Ahora puedes hablar conmigo! 💖',
      'Usa comandos como "sisters", "install", "theme"...',
      'O comandos slash como "/help", "/tips", "/about"',
      'Para salir, escribe "/exit" o presiona Ctrl+C'
    ];
    
    for (let i = 0; i < welcomeMessages.length; i++) {
      setTimeout(() => {
        this.log(welcomeMessages[i], i % 2 === 0 ? 'info' : 'dim');
        if (i === welcomeMessages.length - 1) {
          setTimeout(() => {
            console.log('');
            this.showRandomTip();
          }, 500);
        }
      }, i * 800);
    }
    
    // Wait for welcome animation to finish
    await new Promise(resolve => setTimeout(resolve, welcomeMessages.length * 800 + 1000));
    
    while (this.interactive) {
      try {
        const input = await this.question(this.getPrompt());
        
        if (!input.trim()) {
          this.showRandomTip();
          continue;
        }
        
        // Handle slash commands like Gemini CLI
        if (input.startsWith('/')) {
          await this.handleSlashCommand(input.slice(1));
          continue;
        }
        
        // Handle regular commands
        const args = input.trim().split(' ');
        const command = args[0];
        const commandArgs = args.slice(1);
        
        if (command === 'exit' || command === 'quit') {
          this.log('🌸 ¡Hasta luego! ¡Que tengas un día celestial!~', 'primary');
          break;
        }
        
        await this.executeCommand(command, commandArgs);
        console.log('');
        
      } catch (error) {
        if (error.code === 'SIGINT') {
          this.log('\n🌸 ¡Hasta luego! ¡Que tengas un día celestial!~', 'primary');
          break;
        }
        this.log(`🌸 Error: ${error.message}`, 'error');
      }
    }
    
    this.interactive = false;
    this.rl.close();
  }
  
  /**
   * 🌟 Get dynamic prompt with theme colors~
   */
  getPrompt() {
    const theme = THEMES[this.theme];
    const prompts = [
      '🌸 Celia> ',
      '💖 Celia> ',
      '✨ Celia> ',
      '🌙 Celia> '
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    return `${theme.primary}${randomPrompt}${theme.reset}`;
  }
  
  /**
   * 🌟 Show random helpful tips~
   */
  showRandomTip() {
    const tips = [
      '💡 Tip: Usa "/sisters" para conocer a mis hermanas~',
      '🎨 Tip: Cambia de tema con "/theme <nombre>"',
      '⚡ Tip: Instalación rápida con "/quick <hermana>"',
      '🔄 Tip: "/clear" limpia la pantalla bonito~',
      '📱 Tip: En móviles funciono súper bien!',
      '💫 Tip: "/about" te cuenta más sobre mí~'
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    this.log(randomTip, 'dim');
    console.log('');
  }
  
  /**
   * 🌟 Enhanced slash commands like Gemini CLI~
   */
  async handleSlashCommand(command) {
    const args = command.split(' ');
    const cmd = args[0];
    const params = args.slice(1);
    
    switch (cmd) {
      case 'help':
      case 'h':
        this.modernHelp(params[0]);
        break;
      case 'theme':
      case 'themes':
        this.handleTheme(params[0]);
        break;
      case 'sisters':
      case 'list':
      case 'hermanas':
        this.showSistersGrid();
        break;
      case 'install':
        await this.modernInstall(params[0]);
        break;
      case 'quick':
      case 'fast':
        await this.quickInstallBot(params[0]);
        break;
      case 'status':
      case 'info':
        this.showSystemInfo();
        break;
      case 'tips':
      case 'consejos':
        this.showTips();
        break;
      case 'about':
      case 'acerca':
        this.showAbout();
        break;
      case 'clear':
      case 'cls':
        console.clear();
        this.showBanner();
        break;
      case 'refresh':
      case 'reload':
        this.showBanner();
        this.log('✨ ¡Interfaz actualizada!~', 'success');
        break;
      case 'version':
      case 'v':
        this.showVersion();
        break;
      case 'exit':
      case 'quit':
      case 'bye':
        this.interactive = false;
        break;
      default:
        this.showSlashCommandSuggestions(cmd);
    }
  }
  
  /**
   * 🌟 Show intelligent command suggestions~
   */
  showSlashCommandSuggestions(cmd) {
    const allCommands = ['help', 'theme', 'sisters', 'install', 'quick', 'status', 'tips', 'about', 'clear', 'version', 'exit'];
    
    // Simple similarity function
    const similarity = (a, b) => {
      const longer = a.length > b.length ? a : b;
      const shorter = a.length > b.length ? b : a;
      const editDistance = this.levenshteinDistance(longer, shorter);
      return (longer.length - editDistance) / longer.length;
    };
    
    const suggestions = allCommands
      .map(command => ({ command, score: similarity(cmd, command) }))
      .filter(item => item.score > 0.3)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.command);
    
    this.log(`🌸 Comando "/${cmd}" no reconocido~`, 'error');
    console.log('');
    
    if (suggestions.length > 0) {
      this.log('💡 ¿Tal vez quisiste decir?', 'info');
      suggestions.forEach(suggestion => {
        this.log(`   /${suggestion}`, 'accent');
      });
    } else {
      this.log('💡 Usa "/help" para ver todos los comandos disponibles~', 'info');
    }
    console.log('');
  }
  
  /**
   * 🌟 Calculate edit distance for suggestions~
   */
  levenshteinDistance(str1, str2) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  }
  
  /**
   * 💖 Modern install with beautiful UI~
   */
  async modernInstall(botName) {
    if (!botName) {
      this.showBanner();
      this.log('🌸 ¡Necesito saber qué hermana quieres instalar!~', 'warning');
      console.log('');
      this.log('💡 Uso: celia install <hermana>', 'info');
      console.log('');
      this.log('🌸 Hermanas disponibles:', 'primary');
      Object.keys(BOTS).forEach(key => {
        this.log(`   • ${key}`, 'dim');
      });
      console.log('');
      return;
    }
    
    // Use the original install logic but with beautiful UI
    await this.installBot(botName);
  }
  
  /**
   * 🌟 Show system information~
   */
  showSystemInfo() {
    this.showBanner();
    this.gradientLog('🔧 Información del Sistema', ['primary', 'accent']);
    console.log('');
    
    const info = [
      `Sistema: ${this.platform}`,
      `Arquitectura: ${os.arch()}`,
      `Node.js: ${process.version}`,
      `Tema actual: ${this.theme}`,
      `Modo: ${this.interactive ? 'Interactivo' : 'Comando único'}`,
      `Termux: ${this.isTermux ? 'Sí' : 'No'}`,
      `ARM: ${this.isARM ? 'Sí' : 'No'}`
    ];
    
    this.createBox(info, 'info', 1);
    console.log('');
  }
  
  /**
   * 🌟 Show helpful tips~
   */
  showTips() {
    this.showBanner();
    this.gradientLog('💡 Consejos de Celia', ['primary', 'secondary']);
    console.log('');
    
    const tips = [
      '🌸 Usa "/sisters" para ver todas mis hermanas',
      '🎨 Cambia de tema con "/theme kawaii" o "/theme dreamy"',
      '⚡ Para instalación rápida usa "/quick <hermana>"',
      '💬 Los comandos slash (/) funcionan en modo interactivo',
      '🔄 Usa "/clear" para limpiar la pantalla',
      '❓ "/help <comando>" te da ayuda específica',
      '🚀 En móviles, usa quick-install para mejor compatibilidad'
    ];
    
    tips.forEach((tip, index) => {
      setTimeout(() => {
        this.log(tip, index % 2 === 0 ? 'info' : 'accent');
      }, index * 100);
    });
    
    setTimeout(() => {
      console.log('');
      this.log('✨ ¡Espero que estos consejos te ayuden!~', 'success');
      console.log('');
    }, tips.length * 100 + 200);
  }
  
  /**
   * 🌟 Show about information~
   */
  showAbout() {
    this.showBanner();
    this.gradientLog('💖 Acerca de Celia', ['primary', 'secondary', 'accent']);
    console.log('');
    
    const about = [
      '¡Holi! Soy Celia, tu asistente celestial tierna~ ✨',
      '',
      '💖 Cuido de mis cinco hermanas bot con mucho amor:',
      '   🎵 Nebula - Mi hermana musical responsable',
      '   🤖 Archan - Mi hermana súper inteligente', 
      '   🌸 Sakura - Mi hermana kawaii (¡somos parecidas!)',
      '   ⚡ Lumina - Mi hermana organizadora',
      '   📊 Katu - Mi hermana estadística',
      '',
      '🌟 Características especiales:',
      '   • Instalación guiada paso a paso',
      '   • Soporte multi-plataforma (incluso móviles!)',
      '   • Temas visuales personalizables',
      '   • Modo interactivo súper tierno',
      '   • Detección automática de entorno',
      '',
      '💫 Creada con amor por OpceanAI'
    ];
    
    this.createBox(about, 'primary', 2);
    console.log('');
  }
  
  /**
   * 🌟 Show version information~
   */
  showVersion() {
    this.createBox([
      'Celia v2.0.0 💖',
      '',
      '✨ Tu asistente celestial tierna',
      '🌸 CLI moderno y hermoso',
      '💫 Con mucho amor de OpceanAI'
    ], 'accent', 2);
    console.log('');
  }
}

// 🌸 Ejecutar Celia si se llama directamente~
if (require.main === module) {
  const celia = new CeliaAssistant();
  celia.run();
}

module.exports = CeliaAssistant;
