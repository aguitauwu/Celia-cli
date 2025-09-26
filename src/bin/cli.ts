#!/usr/bin/env node

/**
 * 🌸 Celia CLI Entry Point
 */

const CeliaAssistant = require('../cli/celia');

// 🌸 Ejecutar Celia
async function main() {
  try {
    // 🛡️ Verificar prerrequisitos críticos primero
    CeliaAssistant.checkCriticalPrerequisites();
    
    const celia = new CeliaAssistant();
    await celia.run();
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

module.exports = main;