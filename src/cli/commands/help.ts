/**
 * 💫 Help command - shows available commands and usage
 */

import { ICommand } from '../../types/command';
import { Logger } from '../../utils/logger';
import { CommandRouter } from '../router';

export class HelpCommand implements ICommand {
  public readonly name = 'help';
  public readonly config = {
    name: 'help',
    description: '💫 Muestra ayuda y comandos disponibles',
    usage: 'celia help [comando]',
    aliases: ['h', '?', 'ayuda'],
    action: this.execute.bind(this)
  };

  constructor(
    private readonly logger: Logger,
    private readonly commandRouter: CommandRouter
  ) {}

  async execute(args: string[] = []): Promise<void> {
    const specificCommand = args[0];
    
    this.showBanner();
    
    if (specificCommand && this.commandRouter.hasCommand(specificCommand)) {
      this.showSpecificHelp(specificCommand);
      return;
    }
    
    this.showGeneralHelp();
  }
  
  private showSpecificHelp(commandName: string): void {
    const command = this.commandRouter.getCommand(commandName);
    
    if (!command) {
      this.logger.log(`🌸 Comando "${commandName}" no encontrado~`, 'error');
      return;
    }
    
    const boxContent: string[] = [
      `Comando: ${commandName}`,
      '',
      command.config.description || '',
      '',
      `Uso: ${command.config.usage || ''}`,
      command.config.aliases && command.config.aliases.length > 0 ? `Alias: ${command.config.aliases.join(', ')}` : ''
    ].filter(Boolean) as string[];
    
    this.logger.createBox(boxContent, 'primary', 2);
  }
  
  private showGeneralHelp(): void {
    this.logger.gradientLog('💫 Comandos de Celia 💫', ['primary', 'secondary', 'accent']);
    console.log('');
    
    // Group commands by category
    const categories: { [key: string]: string[] } = {
      '🌸 Hermanas': ['sisters', 'install', 'quick'],
      '🎨 Personalización': ['theme'],
      '💬 Interacción': ['interactive', 'help'],
      '🔧 Información': ['status', 'tips', 'about']
    };
    
    Object.entries(categories).forEach(([category, commandNames]) => {
      this.logger.log(category, 'accent');
      console.log('');
      
      commandNames.forEach(cmdName => {
        const command = this.commandRouter.getCommand(cmdName);
        if (command) {
          this.logger.log(`  ${command.config.usage || ''}`, 'primary');
          this.logger.log(`    ${command.config.description || ''}`, 'dim');
          if (command.config.aliases && command.config.aliases.length > 0) {
            this.logger.log(`    Alias: ${command.config.aliases.join(', ')}`, 'dim');
          }
          console.log('');
        }
      });
    });
    
    this.logger.log('💡 Tip: Usa "celia help <comando>" para ayuda específica~', 'info');
    console.log('');
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

export default HelpCommand;