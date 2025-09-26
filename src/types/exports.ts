/**
 * 🌸 Main Export Type Definitions
 */

export interface ICeliaAssistantConfig {
  theme?: string;
  verbose?: boolean;
  interactive?: boolean;
  [key: string]: any;
}

export interface ICeliaAssistant {
  logger: any; // Will be typed properly in logger interface
  system: any; // Will be typed properly in system interface
  prompt: any; // Will be typed properly in prompt interface
  run(args: string[]): Promise<void>;
}

// Re-export all other types for convenience
export * from './command';
export * from './theme';
export * from './system';
export * from './security';
export * from './bots';
export * from './constants';