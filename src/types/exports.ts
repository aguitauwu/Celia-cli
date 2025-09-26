/**
 * 🌸 Main Export Type Definitions
 */

import { ILogger } from './logger';
import { ISystemDetector } from './system';
import { IPromptUtils } from './prompt';

export interface ICeliaAssistantConfig {
  theme?: string;
  verbose?: boolean;
  interactive?: boolean;
}

export interface ICeliaAssistant {
  logger: ILogger;
  system: ISystemDetector;
  prompt: IPromptUtils;
  interactive: boolean;
  run(): Promise<void>;
}

// Re-export all other types for convenience
export * from './command';
export * from './theme';
export * from './system';
export * from './security';
export * from './bots';
export * from './constants';