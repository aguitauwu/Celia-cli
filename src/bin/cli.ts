#!/usr/bin/env node
/**
 * 🌸 Celia CLI Entry Point
 */

import { CeliaAssistant } from '../cli/celia';
import { VERSION } from '../config/constants';

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const flags = {
    help: false,
    version: false,
    interactive: false
  };

  for (const arg of args) {
    switch (arg) {
      case '--help':
      case '-h':
        flags.help = true;
        break;
      case '--version':
      case '-v':
        flags.version = true;
        break;
      case '--interactive':
      case '-i':
        flags.interactive = true;
        break;
    }
  }

  return { flags, args };
}

// Show help information
function showHelp() {
  console.log(`
🌸 Celia CLI v${VERSION}
Tu asistente celestial para instalar bots de Discord

Uso:
  celia [comando] [opciones]
  celia --interactive           Modo interactivo
  
Comandos:
  help                         Muestra ayuda detallada
  list                         Lista todas las hermanas bot
  theme [nombre]               Cambia el tema visual
  status                       Información del sistema
  
Opciones:
  --version, -v                Muestra la versión
  --help, -h                   Muestra esta ayuda
  --interactive, -i            Inicia modo interactivo
  
Ejemplos:
  celia list                   Lista bots disponibles
  celia help                   Ayuda detallada
  celia theme kawaii          Cambia al tema kawaii
  
🌸 ¡Holi! Soy Celia, tu asistente celestial tierna~
`);
}

// 🌸 Ejecutar Celia
async function main(): Promise<void> {
  try {
    const { flags, args } = parseArgs();
    
    // Handle flags first
    if (flags.version) {
      console.log(VERSION);
      process.exit(0);
    }
    
    if (flags.help) {
      showHelp();
      process.exit(0);
    }
    
    // 🛡️ Verificar prerrequisitos críticos primero
    CeliaAssistant.checkCriticalPrerequisites();
    
    const celia = new CeliaAssistant();
    
    // Start interactive mode if flag is set or no command provided
    if (flags.interactive || args.length === 0) {
      await celia.startInteractiveMode();
    } else {
      // Execute command directly
      await celia.run();
    }
    
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('🌸 Fatal error:', message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🌸 ¡Hasta luego! ¡Que tengas un día celestial!~');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🌸 ¡Hasta luego! ¡Que tengas un día celestial!~');
  process.exit(0);
});

// Run if called directly
if (require.main === module) {
  main();
}

export default main;