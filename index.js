#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

// Console colors for better UX
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Available Discord bots configuration
const BOTS = {
  nebula: {
    name: 'Nebula',
    url: 'https://github.com/OpceanAI/Nebula-Open-source',
    description: 'Bot multipropósito con música y moderación',
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
    description: 'Bot de IA con Google Gemini',
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
    description: 'Bot kawaii adorable con IA, música y personalidad única',
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
    description: 'Bot de gestión con verificación, bienvenidas y autoroles',
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
    description: 'Bot contador de mensajes con IA y rankings diarios',
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

class DiscordBotInstaller {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // Detect ARM/Termux environment for better compatibility
    this.isTermux = process.env.PREFIX && process.env.PREFIX.includes('com.termux');
    this.isARM = ['arm', 'arm64', 'armv7l', 'aarch64'].includes(os.arch());
    this.platform = os.platform();
  }

  /**
   * Log messages with color formatting
   */
  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
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
   * Display enhanced application banner
   */
  showBanner() {
    const bannerColor = this.isTermux ? 'magenta' : 'cyan';
    this.log('\n╭─────────────────────────────────────────────────╮', bannerColor);
    this.log('│               🌊 OpceanAI CLI ⚡             │', bannerColor);
    this.log('│          ✨ Discord Bot Installer 🤖         │', bannerColor);
    this.log('├─────────────────────────────────────────────────┤', bannerColor);
    this.log('│  💫 Instalación automática de bots Discord 💫  │', 'yellow');
    this.log('│       🔧 Compatible con ARM/Termux 🔧        │', 'green');
    this.log('╰─────────────────────────────────────────────────╯\n', bannerColor);
    
    // Show platform info
    if (this.isARM || this.isTermux) {
      this.log('🎯 Entorno detectado:', 'yellow');
      if (this.isTermux) this.log('   📱 Termux Android', 'green');
      if (this.isARM) this.log('   🔧 Arquitectura ARM', 'green');
      this.log('');
    }
  }

  /**
   * Display enhanced help information
   */
  showHelp() {
    this.log('📚 GUÍA DE COMANDOS', 'yellow');
    this.log('═══════════════════════════════════════════════════\n', 'yellow');
    
    this.log('🎯 INSTALACIÓN INTERACTIVA:', 'green');
    this.log('   opceanaicli install <bot>     - Configuración paso a paso', 'reset');
    this.log('   • opceanaicli install nebula   - Bot de música y moderación', 'cyan');
    this.log('   • opceanaicli install sakura   - Bot kawaii con IA', 'cyan');
    this.log('   • opceanaicli install lumina   - Bot de gestión de servidor', 'cyan');
    this.log('   • opceanaicli install katu     - Bot estadísticas con IA', 'cyan');
    this.log('   • opceanaicli install archan   - Bot de IA Gemini\n', 'cyan');
    
    this.log('⚡ INSTALACIÓN RÁPIDA:', 'green');
    this.log('   opceanaicli quick-install <bot> - Para móviles/Termux', 'reset');
    this.log('   • opceanaicli quick-install sakura', 'yellow');
    this.log('   • opceanaicli quick-install lumina\n', 'yellow');
    
    this.log('📋 INFORMACIÓN:', 'green');
    this.log('   opceanaicli list              - Ver catálogo completo de bots', 'reset');
    this.log('   opceanaicli --version         - Ver versión del CLI', 'reset');
    this.log('   opceanaicli --help            - Mostrar esta ayuda\n', 'reset');
    
    if (this.isARM || this.isTermux) {
      this.log('📱 OPTIMIZADO PARA TERMUX/ARM:', 'magenta');
      this.log('   • Usar quick-install para mejor compatibilidad', 'reset');
      this.log('   • Git y Node.js deben estar instalados', 'reset');
      this.log('   • Instalar con: apt install git nodejs\n', 'reset');
    }
    
    this.log('💡 TIP: Empieza con "opceanaicli list" para ver todos los bots\n', 'cyan');
  }

  /**
   * Display enhanced bots list with categories
   */
  showBotList() {
    this.showBanner();
    this.log('🚀 CATÁLOGO DE BOTS DISPONIBLES', 'yellow');
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
        this.log(`\n  ✨ ${bot.name}`, 'green');
        this.log(`     📝 ${bot.description}`, 'reset');
        this.log(`     💻 Lenguaje: ${bot.language}`, 'blue');
        this.log(`     🔧 Instalar: opceanaicli install ${bot.key}`, 'cyan');
        this.log(`     ⚡ Rápido: opceanaicli quick-install ${bot.key}`, 'yellow');
      });
      this.log('');
    });
    
    this.log('💡 AYUDA:', 'yellow');
    this.log('   • Instalación interactiva: opceanaicli install <bot>', 'reset');
    this.log('   • Instalación rápida: opceanaicli quick-install <bot>', 'reset');
    this.log('   • Ver comandos: opceanaicli --help\n', 'reset');
  }

  /**
   * Clone bot repository from GitHub with ARM/Termux optimizations
   */
  async cloneRepository(bot, targetDir) {
    try {
      this.log(`\n🤖 Instalando ${bot.name}...`, 'blue');
      this.log(`📦 Clonando: ${bot.url}`, 'cyan');
      
      // ARM/Termux specific git configuration for better compatibility
      if (this.isARM || this.isTermux) {
        this.log('🔧 Optimizando para entorno ARM/Termux...', 'yellow');
        try {
          // Prevent git from using system credential helpers that might not work on ARM
          execSync('git config --global credential.helper ""', { stdio: 'ignore' });
        } catch (e) {
          // Ignore if git config fails
        }
      }
      
      execSync(`git clone ${bot.url} "${targetDir}"`, { stdio: 'inherit' });
      
      this.log(`✅ ${bot.name} clonado exitosamente`, 'green');
      return true;
    } catch (error) {
      this.log(`❌ Error: ${error.message}`, 'red');
      
      // Provide ARM/Termux specific troubleshooting
      if (this.isARM || this.isTermux) {
        this.log('💡 Consejo para ARM/Termux:', 'cyan');
        this.log('   - Asegúrate de que git esté instalado: apt install git', 'reset');
        this.log('   - Verifica la conectividad de red', 'reset');
        this.log('   - Algunos entornos ARM pueden requerir --depth 1', 'reset');
      }
      
      return false;
    }
  }

  /**
   * Interactive environment configuration
   */
  async configureEnvironment(bot) {
    this.log(`\n🔧 Configurando ${bot.name}`, 'magenta');
    this.log('═══════════════════════════════════', 'magenta');
    
    const envVars = {};
    const required = bot.envVars.filter(v => v.required);
    const optional = bot.envVars.filter(v => !v.required);
    
    // Configure required variables
    if (required.length > 0) {
      this.log('\n🔴 Variables REQUERIDAS:', 'red');
      
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
              this.log('   ⚠️ Demasiados intentos - saltando campo', 'yellow');
              break;
            } else {
              this.log('   ❌ Este campo es obligatorio', 'red');
            }
          }
        }
        
        envVars[envVar.name] = value;
        this.log(`   ✅ ${envVar.name} configurado`, 'green');
      }
    }
    
    // Configure optional variables
    if (optional.length > 0) {
      this.log('\n🟡 Variables OPCIONALES:', 'yellow');
      
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
   * Create enhanced .env and .env.example files for all bots
   */
  createEnvFile(envVars, targetDir, bot) {
    try {
      const envPath = path.join(targetDir, '.env');
      
      let content = `# ═══════════════════════════════════════════════\n`;
      content += `# 🤖 ${bot.name} Bot - Environment Variables\n`;
      content += `# Generated by OpceanAI CLI v2.0.0\n`;
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
      content += `# 📝 Configuración completada con OpceanAI CLI\n`;
      content += `# 🚀 Para ejecutar: npm start\n`;
      content += `# ═══════════════════════════════════════════════\n`;
      
      fs.writeFileSync(envPath, content);
      this.log('✅ Archivo .env creado con formato mejorado', 'green');
      
      // Create .env.example file
      const exampleContent = content.replace(/=.+$/gm, '=');
      fs.writeFileSync(path.join(targetDir, '.env.example'), exampleContent);
      this.log('✅ Archivo .env.example creado', 'green');
      
      return true;
    } catch (error) {
      this.log(`❌ Error creando .env: ${error.message}`, 'red');
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
   * Display final setup instructions
   */
  showInstructions(bot, targetDir) {
    this.log('\n╭─────────────────────────────────────────────────╮', 'green');
    this.log('│            🎉 ¡INSTALACIÓN EXITOSA! 🎉         │', 'green');
    this.log('╰─────────────────────────────────────────────────╯', 'green');
    this.log(`📁 Proyecto: ${path.resolve(targetDir)}`, 'cyan');
    this.log(`🚀 Comenzar: cd "${targetDir}"`, 'yellow');
    
    // Language-specific run commands
    switch (bot.language) {
      case 'Python':
        this.log('🐍 Ejecutar: python bot_unificado_completo.py', 'yellow');
        this.log('   O si hay install.py: python install.py', 'cyan');
        break;
      case 'TypeScript':
        this.log('📦 Compilar: npm run build', 'yellow');
        this.log('🏃 Ejecutar: npm start', 'yellow');
        break;
      case 'Node.js':
      default:
        this.log('🏃 Ejecutar: npm start', 'yellow');
    }
    
    this.log(`\n🤖 CONFIGURACIÓN DE ${bot.name.toUpperCase()}:`, 'magenta');
    this.log('═'.repeat(50), 'magenta');
    this.log('1️⃣  Discord Developer Portal:', 'reset');
    this.log('   https://discord.com/developers/applications', 'blue');
    this.log('2️⃣  Crear aplicación → Bot → Copiar token', 'reset');
    this.log('3️⃣  General Information → Copiar Application ID', 'reset');
    
    // Bot-specific additional setup
    if (bot.name === 'Nebula') {
      this.log('4️⃣  MongoDB Atlas: https://www.mongodb.com/cloud/atlas', 'reset');
    } else if (bot.name === 'Archan' || bot.name === 'Sakura' || bot.name === 'Katu') {
      this.log('4️⃣  Google AI Studio: https://ai.google.dev/', 'reset');
      this.log('   (Para obtener tu API key de Gemini)', 'cyan');
    } else if (bot.name === 'Lumina') {
      this.log('4️⃣  Base de datos (opcional):', 'reset');
      this.log('   PostgreSQL o MongoDB - funciona sin BD también', 'cyan');
    }
    
    this.log(`\n💡 CARACTERÍSTICAS DE ${bot.name}:`, 'yellow');
    this.log(`   📝 ${bot.description}`, 'reset');
    this.log(`   💻 Lenguaje: ${bot.language}`, 'reset');
    this.log(`   📂 Categoría: ${bot.category}`, 'reset');
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
   * Main CLI entry point
   */
  async run() {
    const args = process.argv.slice(2);
    
    try {
      if (args.length === 0) {
        this.showBanner();
        this.showHelp();
        this.rl.close();
        return;
      }
      
      if (args.includes('--help') || args.includes('-h')) {
        this.showBanner();
        this.showHelp();
        this.rl.close();
        return;
      }
      
      if (args.includes('--version') || args.includes('-v')) {
        this.log('OpceanAI CLI v2.0.0', 'cyan');
        this.rl.close();
        return;
      }
      
      if (args.includes('list')) {
        this.showBotList();
        this.rl.close();
        return;
      }
      
      if (args.includes('install')) {
        const botName = args[args.indexOf('install') + 1];
        if (!botName) {
          this.log('❌ Especifica un bot: opceanaicli install nebula', 'red');
          this.rl.close();
          return;
        }
        await this.installBot(botName);
        return;
      }
      
      if (args.includes('quick-install')) {
        const botName = args[args.indexOf('quick-install') + 1];
        if (!botName) {
          this.log('❌ Especifica un bot: opceanaicli quick-install nebula', 'red');
          this.rl.close();
          return;
        }
        await this.quickInstallBot(botName);
        return;
      }
      
      this.log(`❌ Comando desconocido: ${args.join(' ')}`, 'red');
      this.showHelp();
      this.rl.close();
      
    } catch (error) {
      this.log(`❌ Error: ${error.message}`, 'red');
      this.rl.close();
    }
  }
}

// Execute CLI if run directly
if (require.main === module) {
  const installer = new DiscordBotInstaller();
  installer.run();
}

module.exports = DiscordBotInstaller;
