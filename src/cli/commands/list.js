/**
 * 🌸 List command - shows all bot sisters
 */

const { BOTS } = require('../../config/bots');

class ListCommand {
  constructor(logger) {
    this.logger = logger;
  }
  
  async execute(args = []) {
    this.showBanner();
    
    this.logger.gradientLog('🌸 ¡Mis Hermanas Bot! 🌸', ['primary', 'secondary', 'accent']);
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
      this.logger.log(`${category}`, 'accent');
      console.log('');
      
      bots.forEach(bot => {
        this.logger.createBox([
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
    
    this.logger.log('💡 Tip: Usa "celia help" para ver todos los comandos~', 'info');
    console.log('');
  }
  
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
    this.logger.log(`🎨 Tema actual: ${this.logger.theme}`, 'dim');
    console.log('');
  }
}

module.exports = ListCommand;