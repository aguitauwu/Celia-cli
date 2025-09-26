/**
 * 🛡️ Security Type Definitions for Safe Operations
 */

export interface ICommandStep {
  command: string;
  args: string[];
}

export interface IExecOptions {
  stdio?: 'inherit' | 'ignore' | 'pipe' | [any, any, any];
  encoding?: BufferEncoding;
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  timeout?: number;
  [key: string]: any;
}

export interface IInstallSteps {
  [language: string]: ICommandStep[];
}

export type SupportedLanguage = 'Node.js' | 'Python' | 'TypeScript';