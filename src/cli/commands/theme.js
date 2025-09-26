/**
 * 🎨 Theme command - changes visual appearance
 */

const { THEMES } = require('../../config/themes');

class ThemeCommand {
  constructor(logger) {
    this.logger = logger;
  }
  
  async execute(args = []) {
    const themeName = args[0];
    
    if (!themeName) {
      this.showAvailableThemes();
      return;
    }
    
    if (!THEMES[themeName]) {
      this.logger.log(`🌸 Tema "${themeName}" no existe~ Temas disponibles: ${Object.keys(THEMES).join(', ')}`, 'error');
      return;
    }
    
    // Beautiful theme transition animation
    await this.logger.showLoading(`🎨 Cambiando a tema ${themeName}`, 1500);
    
    this.logger.setTheme(themeName);
    
    // Animated reveal
    console.clear();
    await this.logger.typeText(`✨ ¡Tema "${themeName}" activado!`, 'success', 30);
    this.logger.sparkleLog('¡Qué bonito se ve ahora!~', 'accent');
    console.log('');
    
    // Show new banner after small delay
    setTimeout(() => {
      this.showBanner();
    }, 500);
  }
  
  showAvailableThemes() {
    this.showBanner();
    this.logger.log('🎨 Temas disponibles:', 'primary');
    console.log('');
    
    Object.keys(THEMES).forEach(theme => {
      const isActive = theme === this.logger.theme;
      const indicator = isActive ? '● ' : '○ ';
      this.logger.log(`${indicator}${theme}`, isActive ? 'accent' : 'dim');
    });
    
    console.log('');
    this.logger.log('💡 Uso: celia theme <nombre>', 'info');
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

module.exports = ThemeCommand;