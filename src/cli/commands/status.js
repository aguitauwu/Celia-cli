/**
 * 🔧 Status command - shows system information
 */

class StatusCommand {
  constructor(logger, system) {
    this.logger = logger;
    this.system = system;
  }
  
  async execute(args = []) {
    this.showBanner();
    this.logger.gradientLog('🔧 Información del Sistema', ['primary', 'accent']);
    console.log('');
    
    const systemInfo = [
      `🖥️  Plataforma: ${this.system.platform.name}`,
      `⚙️  Arquitectura: ${this.system.architecture.raw}`,
      `🔢 CPUs disponibles: ${this.system.cpu.count}`,
      `🌸 Node.js: ${process.version}`,
      `🏠 Directorio: ${process.cwd()}`
    ];
    
    this.logger.createBox(systemInfo, 'info', 1);
    
    const recommendations = this.system.getSystemRecommendations();
    if (recommendations.length > 0) {
      console.log('');
      this.logger.createBox([
        '💡 Recomendaciones:',
        '',
        ...recommendations
      ], 'warning', 1);
    }
    
    console.log('');
  }
  
  showBanner() {
    console.clear();
    console.log('');
    
    this.logger.createBox([
      '✨ ¡Holi! Soy Celia~ ✨',
      '🌸 Tu asistente celestial tierna 🌸',
      '',
      '💖 Ayudo a instalar a mis hermanas bot 💖',
      '(Aunque soy algo torpe, ehehe~)'
    ], 'primary', 2);
    
    console.log('');
    this.logger.log(`🎨 Tema actual: ${this.logger.theme}`, 'dim');
    console.log('');
  }
}

module.exports = StatusCommand;