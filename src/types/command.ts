/**
 * 🌸 Command interface definition for Celia CLI
 */

export interface ICommandArgs {
  [key: string]: string | number | boolean | undefined;
}

export interface ICommand {
  /**
   * Execute the command with given arguments
   */
  execute(args: string[]): Promise<void> | void;
  
  /**
   * Optional: Get command description for help
   */
  getDescription?(): string;
  
  /**
   * Optional: Get command usage information
   */
  getUsage?(): string;
  
  /**
   * Optional: Get command aliases
   */
  getAliases?(): string[];
}

export interface ICommandDefinition {
  aliases: string[];
  description: string;
  usage: string;
  action: (args: string[]) => Promise<void> | void;
}

export interface ICommandRouter {
  register(name: string, definition: ICommandDefinition): void;
  execute(command: string, args: string[]): Promise<void>;
  getCommands(): Map<string, ICommandDefinition>;
  hasCommand(command: string): boolean;
}