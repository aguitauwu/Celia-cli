/**
 * 🌸 List command - shows all bot sisters
 */

import { ICommand } from '../../types/command';
import { Logger } from '../../utils/logger';
import { IBotConfig } from '../../types/bots';
import { BOTS } from '../../config/bots';

interface IBotWithKey extends IBotConfig {
  key: string;
}

export class ListCommand implements ICommand {
  public readonly name = 'list';
  public readonly config = {
    name: 'list',
    description: '🌸 Lista todas las hermanas bot disponibles',
    usage: 'celia list',
    aliases: ['l', 'sisters', 'hermanas'],
    action: this.execute.bind(this)
  };

  constructor(private readonly logger: Logger) {}

  async execute(args: string[] = []): Promise<void> {
    this.showBanner();
    
    this.logger.gradientLog('🌸 ¡Mis Hermanas Bot! 🌸', ['primary', 'secondary', 'accent']);
    console.log('');
    
    // Group bots by category with beautiful display
    const categories: { [key: string]: IBotWithKey[] } = {};
    Object.entries(BOTS).forEach(([key, bot]) => {
      const category = bot.category || 'Otros';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push({ key, ...bot });
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
  
  private showBanner(): void {
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

export default ListCommand;