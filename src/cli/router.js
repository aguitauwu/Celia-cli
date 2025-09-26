/**
 * 🌸 Celia's command router
 */

class CommandRouter {
  constructor() {
    this.commands = new Map();
  }
  
  /**
   * Register a command
   */
  register(name, config) {
    if (!name || !config || typeof config.action !== 'function') {
      throw new Error('Invalid command configuration');
    }
    
    this.commands.set(name, {
      aliases: config.aliases || [],
      description: config.description || '',
      usage: config.usage || `celia ${name}`,
      action: config.action
    });
  }
  
  /**
   * Get command by name or alias
   */
  getCommand(name) {
    if (this.commands.has(name)) {
      return { name, config: this.commands.get(name) };
    }
    
    // Search by alias
    for (const [cmdName, config] of this.commands.entries()) {
      if (config.aliases.includes(name)) {
        return { name: cmdName, config };
      }
    }
    
    return null;
  }
  
  /**
   * Execute command
   */
  async execute(commandName, args = []) {
    const command = this.getCommand(commandName);
    
    if (!command) {
      throw new Error(`Unknown command: ${commandName}`);
    }
    
    try {
      await command.config.action(args);
    } catch (error) {
      throw new Error(`Error executing ${command.name}: ${error.message}`);
    }
  }
  
  /**
   * Get all commands
   */
  getCommands() {
    return this.commands;
  }
  
  /**
   * Get command suggestions for autocompletion
   */
  getSuggestions(input) {
    if (!input) return [];
    
    const allCommands = [];
    
    // Add command names
    for (const [name] of this.commands) {
      allCommands.push(name);
    }
    
    // Add aliases
    for (const [, config] of this.commands) {
      allCommands.push(...config.aliases);
    }
    
    return allCommands
      .filter(cmd => cmd.toLowerCase().startsWith(input.toLowerCase()))
      .slice(0, 10);
  }
  
  /**
   * Check if command exists
   */
  hasCommand(name) {
    return this.getCommand(name) !== null;
  }
}

module.exports = CommandRouter;