/**
 * 🌸 Celia CLI - Main Library Export
 * 
 * This file provides programmatic access to Celia's functionality
 * for users who want to integrate it into their own applications.
 */

// Re-export main classes and interfaces using CommonJS for now
const CeliaAssistant = require('./cli/celia');
const SecurityUtils = require('./security/security');
const Logger = require('./utils/logger');
const SystemDetector = require('./services/system');
const CommandRouter = require('./cli/router');

// Re-export configurations
const { THEMES } = require('./config/themes');
const { BOTS } = require('./config/bots');
const { VERSION, NODE_MIN_VERSION } = require('./config/constants');

// Re-export utility functions
const FileSystemUtils = require('./utils/fs');
const PromptUtils = require('./utils/prompt');

// Export types
export type { 
  ICommand, 
  ICommandArgs, 
  ICommandDefinition, 
  ICommandRouter 
} from './types/command';

// Export classes
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
export const version: string = require('../package.json').version;