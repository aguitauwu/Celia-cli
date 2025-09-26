/**
 * 🌸 Celia CLI - Main Library Export
 * 
 * This file provides programmatic access to Celia's functionality
 * for users who want to integrate it into their own applications.
 */

// Import main classes using proper TypeScript imports
import { CeliaAssistant } from './cli/celia';
import { SecurityUtils } from './security/security';
import { Logger } from './utils/logger';
import { SystemDetector } from './services/system';
import { CommandRouter } from './cli/router';
import { FileSystemUtils } from './utils/fs';
import { PromptUtils } from './utils/prompt';

// Import configurations
import { THEMES } from './config/themes';
import { BOTS } from './config/bots';
import { VERSION, NODE_MIN_VERSION } from './config/constants';

// Export all types
export type {
  // Command types
  ICommand,
  ICommandArgs,
  ICommandDefinition,
  ICommandRouter
} from './types/command';

export type {
  // Theme types
  ITheme,
  IThemes,
  ThemeStyle,
  ThemeName
} from './types/theme';

export type {
  // System types
  ISystemArchitecture,
  ISystemPlatform,
  ISystemCPU,
  ISystemDetector
} from './types/system';

export type {
  // Security types
  ICommandStep,
  IExecOptions,
  IInstallSteps,
  SupportedLanguage
} from './types/security';

export type {
  // Bot types
  IEnvVar,
  IBotConfig,
  IBots,
  BotLanguage,
  BotKey
} from './types/bots';

export type {
  // Constants types
  IPackageManagerConfig,
  IPackageManagers,
  IConstants,
  PackageManagerName,
  SupportedPlatform,
  SupportedArchitecture
} from './types/constants';

export type {
  // Logger types
  ILogger,
  ILoggerConstructor
} from './types/logger';

export type {
  // File system types
  IFileSystemUtils,
  IFileSystemConstructor
} from './types/fs';

export type {
  // Prompt types
  IPromptOptions,
  IConfirmOptions,
  ISelectOptions,
  IPromptUtils,
  IPromptConstructor
} from './types/prompt';

export type {
  // Export types
  ICeliaAssistantConfig,
  ICeliaAssistant
} from './types/exports';

// Export main classes
export {
  CeliaAssistant,
  SecurityUtils,
  Logger,
  SystemDetector,
  CommandRouter,
  FileSystemUtils,
  PromptUtils
};

// Export configurations
export {
  THEMES,
  BOTS,
  VERSION,
  NODE_MIN_VERSION
};

// Version info for programmatic usage
export const version: string = VERSION;