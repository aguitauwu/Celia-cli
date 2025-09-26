/**
 * 🎨 Theme command - changes visual appearance
 */

import { ICommand } from '../../types/command';
import { Logger } from '../../utils/logger';
import { ThemeName } from '../../types/theme';
import { THEMES } from '../../config/themes';

export class ThemeCommand implements ICommand {
  public readonly name = 'theme';
  public readonly config = {
    name: 'theme',
    description: '🎨 Cambia el tema visual de la interfaz',
    usage: 'celia theme [nombre]',
    aliases: ['tema', 'color', 'colors'],
    action: this.execute.bind(this)
  };

  constructor(private readonly logger: Logger) {}

  async execute(args: string[] = []): Promise<void> {
    const themeName = args[0] as ThemeName;
    
    if (!themeName) {
      this.showAvailableThemes();
      return;
    }
    
    if (!THEMES[themeName]) {
      this.logger.log(
        `🌸 Tema "${themeName}" no existe~ Temas disponibles: ${Object.keys(THEMES).join(', ')}`, 
        'error'
      );
      return;
    }
    
    await this.changeTheme(themeName);
  }
  
  private async changeTheme(themeName: ThemeName): Promise<void> {
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
  
  private showAvailableThemes(): void {
    this.showBanner();
    this.logger.log('🎨 Temas disponibles:', 'primary');
    console.log('');
    
    const availableThemes = Object.keys(THEMES) as ThemeName[];
    availableThemes.forEach(theme => {
      const isActive = theme === this.logger.theme;
      const indicator = isActive ? '● ' : '○ ';
      this.logger.log(`${indicator}${theme}`, isActive ? 'accent' : 'dim');
    });
    
    console.log('');
    this.logger.log('💡 Uso: celia theme <nombre>', 'info');
  }
  
  private showBanner(): void {
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

export default ThemeCommand;