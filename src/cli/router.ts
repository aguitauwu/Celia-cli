/**
 * 🌸 Celia's command router
 */

import { ICommand, ICommandDefinition, ICommandRouter } from '../types/command';

export class CommandRouter implements ICommandRouter {
  public commands: Map<string, ICommandDefinition>;

  constructor() {
    this.commands = new Map<string, ICommandDefinition>();
  }
  
  /**
   * Register a command
   */
  register(name: string, config: ICommandDefinition): void {
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
  getCommand(name: string): ICommand | null {
    if (this.commands.has(name)) {
      const config = this.commands.get(name);
      if (config) {
        return { name, config };
      }
    }
    
    // Search by alias
    for (const [cmdName, config] of this.commands.entries()) {
      if (config.aliases && config.aliases.includes(name)) {
        return { name: cmdName, config };
      }
    }
    
    return null;
  }
  
  /**
   * Execute command
   */
  async execute(commandName: string, args: string[] = []): Promise<void> {
    const command = this.getCommand(commandName);
    
    if (!command) {
      throw new Error(`Unknown command: ${commandName}`);
    }
    
    try {
      await command.config.action(args);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Error executing ${command.name}: ${message}`);
    }
  }
  
  /**
   * Get all commands
   */
  getCommands(): Map<string, ICommandDefinition> {
    return this.commands;
  }
  
  /**
   * Get command suggestions for autocompletion
   */
  getSuggestions(input: string): string[] {
    if (!input) return [];
    
    const allCommands: string[] = [];
    
    // Add command names
    for (const [name] of this.commands) {
      allCommands.push(name);
    }
    
    // Add aliases
    for (const [, config] of this.commands) {
      if (config.aliases) {
        allCommands.push(...config.aliases);
      }
    }
    
    return allCommands
      .filter(cmd => cmd.toLowerCase().startsWith(input.toLowerCase()))
      .slice(0, 10);
  }
  
  /**
   * Check if command exists
   */
  hasCommand(name: string): boolean {
    return this.getCommand(name) !== null;
  }
}

export default CommandRouter;