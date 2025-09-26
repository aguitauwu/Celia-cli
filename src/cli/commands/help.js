/**
 * 💫 Help command - shows available commands and usage
 */

class HelpCommand {
  constructor(logger, commandRouter) {
    this.logger = logger;
    this.commandRouter = commandRouter;
  }
  
  async execute(args = []) {
    const specificCommand = args[0];
    
    this.showBanner();
    
    if (specificCommand && this.commandRouter.hasCommand(specificCommand)) {
      this.showSpecificHelp(specificCommand);
      return;
    }
    
    this.showGeneralHelp();
  }
  
  showSpecificHelp(commandName) {
    const command = this.commandRouter.getCommand(commandName);
    
    this.logger.createBox([
      `Comando: ${commandName}`,
      '',
      command.config.description,
      '',
      `Uso: ${command.config.usage}`,
      command.config.aliases.length > 0 ? `Alias: ${command.config.aliases.join(', ')}` : ''
    ].filter(Boolean), 'primary', 2);
  }
  
  showGeneralHelp() {
    this.logger.gradientLog('💫 Comandos de Celia 💫', ['primary', 'secondary', 'accent']);
    console.log('');
    
    // Group commands by category
    const categories = {
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
          this.logger.log(`  ${command.config.usage}`, 'primary');
          this.logger.log(`    ${command.config.description}`, 'dim');
          if (command.config.aliases.length > 0) {
            this.logger.log(`    Alias: ${command.config.aliases.join(', ')}`, 'dim');
          }
          console.log('');
        }
      });
    });
    
    this.logger.log('💡 Tip: Usa "celia help <comando>" para ayuda específica~', 'info');
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

module.exports = HelpCommand;