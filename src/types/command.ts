/**
 * 🌸 Command Type Definitions for Celia CLI
 */

/**
 * Command arguments interface
 */
export interface ICommandArgs {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Base command interface  
 */
export interface ICommand {
  name: string;
  config: ICommandDefinition;
}

/**
 * Command definition interface
 */
export interface ICommandDefinition {
  aliases?: string[];
  description?: string;
  usage?: string;
  action: (args?: string[]) => Promise<void> | void;
}

/**
 * Command router interface
 */
export interface ICommandRouter {
  commands: Map<string, ICommandDefinition>;
  register(name: string, config: ICommandDefinition): void;
  getCommand(name: string): ICommand | null;
  execute(commandName: string, args?: string[]): Promise<void>;
  getCommands(): Map<string, ICommandDefinition>;
  getSuggestions(input: string): string[];
  hasCommand(name: string): boolean;
}