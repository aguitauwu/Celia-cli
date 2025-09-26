/**
 * 🌸 Bot Configuration Type Definitions
 */

export interface IEnvVar {
  name: string;
  description: string;
  required: boolean;
  sensitive: boolean;
  default?: string;
}

export interface IBotConfig {
  name: string;
  url: string;
  description: string;
  language: 'Node.js' | 'Python' | 'TypeScript';
  category: string;
  envVars: IEnvVar[];
}

export interface IBots {
  [botKey: string]: IBotConfig;
}

export type BotLanguage = 'Node.js' | 'Python' | 'TypeScript';
export type BotKey = 'nebula' | 'archan' | 'sakura' | 'lumina' | 'katu';