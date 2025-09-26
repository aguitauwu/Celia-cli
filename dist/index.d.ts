/**
 * 🌸 Command Type Definitions for Celia CLI
 */
/**
 * Command arguments interface
 */
interface ICommandArgs {
    [key: string]: string | number | boolean | undefined;
}
/**
 * Base command interface
 */
interface ICommand {
    name: string;
    config: ICommandDefinition;
}
/**
 * Command definition interface
 */
interface ICommandDefinition {
    aliases?: string[];
    description?: string;
    usage?: string;
    action: (args?: string[]) => Promise<void> | void;
}
/**
 * Command router interface
 */
interface ICommandRouter {
    commands: Map<string, ICommandDefinition>;
    register(name: string, config: ICommandDefinition): void;
    getCommand(name: string): ICommand | null;
    execute(commandName: string, args?: string[]): Promise<void>;
    getCommands(): Map<string, ICommandDefinition>;
    getSuggestions(input: string): string[];
    hasCommand(name: string): boolean;
}

/**
 * 🌸 Celia CLI - Main Library Export
 *
 * This file provides programmatic access to Celia's functionality
 * for users who want to integrate it into their own applications.
 */
declare const CeliaAssistant: any;
declare const SecurityUtils: any;
declare const Logger: any;
declare const SystemDetector: any;
declare const CommandRouter: any;
declare const THEMES: any;
declare const BOTS: any;
declare const VERSION: any;
declare const NODE_MIN_VERSION: any;
declare const FileSystemUtils: any;
declare const PromptUtils: any;

declare const version: string;

export { BOTS, CeliaAssistant, CommandRouter, FileSystemUtils, type ICommand, type ICommandArgs, type ICommandDefinition, type ICommandRouter, Logger, NODE_MIN_VERSION, PromptUtils, SecurityUtils, SystemDetector, THEMES, VERSION, version };
