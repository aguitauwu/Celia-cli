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
    url: 'https://github.com/OpceanAI/Nebula-Open-source-',
    description: 'Bot multipropósito con música y moderación',
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
    url: 'https://github.com/OpceanAI/Archan-Open-source-',
    description: 'Bot de IA con Google Gemini',
    envVars: [
      { name: 'ARCHAN_BOT_TOKEN', description: 'Discord Bot Token para Archan', required: true, sensitive: true },
      { name: 'ARCHAN_CLIENT_ID', description: 'Discord Client ID para Archan', required: true, sensitive: false },
      { name: 'GEMINI_API_KEY', description: 'Google Gemini AI API Key', required: true, sensitive: true }
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
   * Display application banner
   */
  showBanner() {
    this.log('\n╔════════════════════════════════════════════╗', 'cyan');
    this.log('║              🤖 OpceanAI CLI               ║', 'cyan');
    this.log('║         Open Source Discord Bots          ║', 'cyan');
    this.log('╚════════════════════════════════════════════╝\n', 'cyan');
  }

  /**
   * Display help information
   */
  showHelp() {
    this.log('📖 Comandos disponibles:', 'yellow');
    this.log('  opceanaicli install nebula      - Instalar Nebula Bot (interactivo)', 'reset');
    this.log('  opceanaicli install archan      - Instalar Archan Bot (interactivo)', 'reset');
    this.log('  opceanaicli quick-install nebula - Instalar Nebula Bot (rápido)', 'reset');
    this.log('  opceanaicli quick-install archan - Instalar Archan Bot (rápido)', 'reset');
    this.log('  opceanaicli list               - Ver bots disponibles', 'reset');
    this.log('  opceanaicli --help             - Mostrar ayuda', 'reset');
    this.log('  opceanaicli --version          - Mostrar versión\n', 'reset');
  }

  /**
   * Display available bots list
   */
  showBotList() {
    this.showBanner();
    this.log('🤖 Bots Disponibles:\n', 'yellow');
    
    Object.entries(BOTS).forEach(([key, bot]) => {
      this.log(`📋 ${bot.name}`, 'green');
      this.log(`   Descripción: ${bot.description}`, 'reset');
      this.log(`   Comando: opceanaicli install ${key}\n`, 'cyan');
    });
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
   * Create .env and .env.example files
   */
  createEnvFile(envVars, targetDir, bot) {
    try {
      const envPath = path.join(targetDir, '.env');
      
      let content = `# ${bot.name} Environment Variables\n`;
      content += `# Generated by Discord Bot Installer CLI\n\n`;
      
      if (bot.name === 'Nebula') {
        content += '# Bot Configuration\n';
        ['BOT_TOKEN', 'CLIENT_ID', 'OWNER_ID'].forEach(key => {
          if (envVars[key]) content += `${key}=${envVars[key]}\n`;
        });
        
        content += '\n# Database\n';
        if (envVars.MONGO_CONNECTION) content += `MONGO_CONNECTION=${envVars.MONGO_CONNECTION}\n`;
        
        content += '\n# Music (Optional)\n';
        ['LAVALINK_HOST', 'LAVALINK_PORT', 'LAVALINK_PASSWORD'].forEach(key => {
          if (envVars[key]) content += `${key}=${envVars[key]}\n`;
        });
        
        content += '\n# APIs (Optional)\n';
        ['WEATHER_API_KEY', 'TRANSLATE_API_KEY'].forEach(key => {
          if (envVars[key]) content += `${key}=${envVars[key]}\n`;
        });
      } else if (bot.name === 'Archan') {
        content += '# Bot Configuration\n';
        ['ARCHAN_BOT_TOKEN', 'ARCHAN_CLIENT_ID'].forEach(key => {
          if (envVars[key]) content += `${key}=${envVars[key]}\n`;
        });
        
        content += '\n# AI Configuration\n';
        if (envVars.GEMINI_API_KEY) content += `GEMINI_API_KEY=${envVars.GEMINI_API_KEY}\n`;
      }
      
      fs.writeFileSync(envPath, content);
      this.log('✅ Archivo .env creado', 'green');
      
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

  /**
   * Install npm dependencies
   */
  async installDependencies(targetDir) {
    try {
      if (!fs.existsSync(path.join(targetDir, 'package.json'))) {
        this.log('ℹ️  No hay package.json', 'yellow');
        return true;
      }
      
      const install = await this.question('\n📦 ¿Instalar dependencias? (Y/n): ');
      if (install.toLowerCase() === 'n') return true;
      
      this.log('🔄 Instalando dependencias...', 'cyan');
      execSync('npm install', { stdio: 'inherit', cwd: targetDir });
      this.log('✅ Dependencias instaladas', 'green');
      
      return true;
    } catch (error) {
      this.log(`❌ Error: ${error.message}`, 'red');
      return false;
    }
  }

  /**
   * Display final setup instructions
   */
  showInstructions(bot, targetDir) {
    this.log('\n🎉 ¡Instalación completada!', 'green');
    this.log('═══════════════════════════════', 'green');
    this.log(`📁 Proyecto: ${path.resolve(targetDir)}`, 'cyan');
    this.log(`🚀 Comenzar: cd "${targetDir}"`, 'yellow');
    this.log('🏃 Ejecutar: npm start', 'yellow');
    
    this.log(`\n🤖 Configuración de ${bot.name}:`, 'magenta');
    this.log('1️⃣  Discord Developer Portal: https://discord.com/developers/applications', 'reset');
    this.log('2️⃣  Crear aplicación → Bot → Copiar token', 'reset');
    this.log('3️⃣  General Information → Copiar Application ID', 'reset');
    
    if (bot.name === 'Nebula') {
      this.log('4️⃣  MongoDB Atlas: https://www.mongodb.com/cloud/atlas', 'reset');
    } else if (bot.name === 'Archan') {
      this.log('4️⃣  Google AI Studio: https://ai.google.dev/', 'reset');
    }
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
   * Create .env template without interaction
   */
  createEnvTemplate(bot, targetDir) {
    try {
      const envPath = path.join(targetDir, '.env');
      
      let content = `# ${bot.name} Environment Variables\n`;
      content += `# Generated by Discord Bot Installer CLI\n`;
      content += `# IMPORTANTE: Completa estos valores antes de ejecutar el bot\n\n`;
      
      if (bot.name === 'Nebula') {
        content += '# Bot Configuration (REQUERIDO)\n';
        content += 'BOT_TOKEN=your_discord_bot_token_here\n';
        content += 'CLIENT_ID=your_discord_client_id_here\n';
        content += 'OWNER_ID=your_discord_user_id_here\n';
        content += '\n# Database (REQUERIDO)\n';
        content += 'MONGO_CONNECTION=mongodb://localhost:27017/nebula\n';
        content += '\n# Music (Opcional)\n';
        content += 'LAVALINK_HOST=localhost\n';
        content += 'LAVALINK_PORT=2333\n';
        content += 'LAVALINK_PASSWORD=youshallnotpass\n';
        content += '\n# APIs (Opcional)\n';
        content += '# WEATHER_API_KEY=your_weather_api_key\n';
        content += '# TRANSLATE_API_KEY=your_translate_api_key\n';
      } else if (bot.name === 'Archan') {
        content += '# Bot Configuration (REQUERIDO)\n';
        content += 'ARCHAN_BOT_TOKEN=your_discord_bot_token_here\n';
        content += 'ARCHAN_CLIENT_ID=your_discord_client_id_here\n';
        content += '\n# AI Configuration (REQUERIDO)\n';
        content += 'GEMINI_API_KEY=your_google_gemini_api_key_here\n';
      }
      
      fs.writeFileSync(envPath, content);
      this.log('✅ Archivo .env template creado', 'green');
      
      // Create .env.example
      const exampleContent = content.replace(/=.+$/gm, '=');
      fs.writeFileSync(path.join(targetDir, '.env.example'), exampleContent);
      this.log('✅ Archivo .env.example creado', 'green');
      
      return true;
    } catch (error) {
      this.log(`❌ Error creando .env: ${error.message}`, 'red');
      return false;
    }
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
    await this.installDependencies(targetDir);
    
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
        this.log('OpceanAI CLI v1.0.1', 'cyan');
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
