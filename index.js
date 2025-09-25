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
    
    // 🌸 Celia detecta tu entorno para ayudarte mejor~ ✨
    this.isTermux = process.env.PREFIX && process.env.PREFIX.includes('com.termux');
    this.isARM = ['arm', 'arm64', 'armv7l', 'aarch64'].includes(os.arch());
    this.platform = os.platform();
  }

  /**
   * 🌙 Celia te habla con colorcitos tiernos~
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
   * 🌸 Celia te saluda con su banner celestial~
   */
  showBanner() {
    const bannerColor = this.isTermux ? 'magenta' : 'cyan';
    this.log('\n╭─────────────────────────────────────────────────╮', bannerColor);
    this.log('│           🌙 ¡Holi! Soy Celia~ 🌸           │', bannerColor);
    this.log('│       ✨ Tu asistente celestial tierna ✨       │', bannerColor);
    this.log('├─────────────────────────────────────────────────┤', bannerColor);
    this.log('│   💖 Ayudo a instalar a mis hermanas bot 💖   │', 'yellow');
    this.log('│  🌸 (Aunque soy algo torpe, ehehe~) 🌸   │', 'green');
    this.log('╰─────────────────────────────────────────────────╯\n', bannerColor);
    
    // 🌸 Celia detecta tu entorno con amor~
    if (this.isARM || this.isTermux) {
      this.log('🌸 ¡Aww! Detecté tu entorno:', 'yellow');
      if (this.isTermux) this.log('   📱 Termux Android (¡qué genial!)', 'green');
      if (this.isARM) this.log('   🔧 Arquitectura ARM (¡súper cool!)', 'green');
      this.log('');
    }
  }

  /**
   * 🌸 Celia te explica cómo puede ayudarte~
   */
  showHelp() {
    this.log('🌙 ¡Celia te ayuda! - Guía de comanditos~', 'yellow');
    this.log('═══════════════════════════════════════════════════\n', 'yellow');
    
    this.log('🌸 INSTALACIÓN TIERNA (con mucho cariño):', 'green');
    this.log('   opceanaicli install <hermana>     - ¡Te guío paso a pasito!~', 'reset');
    this.log('   • opceanaicli install nebula   - Mi hermana musical 🎵', 'cyan');
    this.log('   • opceanaicli install sakura   - Mi hermana kawaii 🌸 (¡somos parecidas!)', 'cyan');
    this.log('   • opceanaicli install lumina   - Mi hermana organizadora ⚡', 'cyan');
    this.log('   • opceanaicli install katu     - Mi hermana estadística 📊', 'cyan');
    this.log('   • opceanaicli install archan   - Mi hermana inteligente 🤖\n', 'cyan');
    
    this.log('✨ INSTALACIÓN RÁPIDA (cuando tienes prisa!):', 'green');
    this.log('   opceanaicli quick-install <hermana> - ¡Súper rápido para móviles!', 'reset');
    this.log('   • opceanaicli quick-install sakura (¡mi favorita! ehehe~)', 'yellow');
    this.log('   • opceanaicli quick-install lumina (¡muy ordenadita!)\n', 'yellow');
    
    this.log('🌙 INFORMACIÓN TIERNA:', 'green');
    this.log('   opceanaicli list              - ¡Conoce a todas mis hermanas!~', 'reset');
    this.log('   opceanaicli --version         - ¿Qué versión de Celia soy?', 'reset');
    this.log('   opceanaicli --help            - ¡Celia te ayuda siempre!\n', 'reset');
    
    if (this.isARM || this.isTermux) {
      this.log('🌸 ESPECIAL PARA TU MÓVIL/ARM:', 'magenta');
      this.log('   • ¡Usa quick-install para mejor compatibilidad!~', 'reset');
      this.log('   • Necesitas Git y Node.js (¡yo te ayudo a conseguirlos!)', 'reset');
      this.log('   • Instalar con: apt install git nodejs\n', 'reset');
    }
    
    this.log('🌸 CONSEJITO DE CELIA: Empieza con "opceanaicli list" para conocer a mis hermanas~\n', 'cyan');
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

// 🌸 Ejecutar Celia si se llama directamente~
if (require.main === module) {
  const celia = new CeliaAssistant();
  celia.run();
}

module.exports = CeliaAssistant;
