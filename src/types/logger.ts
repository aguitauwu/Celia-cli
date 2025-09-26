/**
 * 🌸 Logger Type Definitions
 */

import { ThemeStyle, ThemeName, ITheme } from './theme';

export interface ILogger {
  theme: ThemeName;
  
  // Core methods
  setTheme(theme: ThemeName): void;
  getTheme(): ITheme;
  log(message: string, style?: ThemeStyle): void;
  
  // Animated methods
  typeText(message: string, style?: ThemeStyle, speed?: number): Promise<void>;
  sparkleLog(message: string, style?: ThemeStyle, sparkles?: string[]): void;
  gradientLog(message: string, styles: ThemeStyle[]): void;
  fadeInText(message: string, style?: ThemeStyle, steps?: number): Promise<void>;
  rainbowText(text: string, speed?: number): Promise<void>;
  matrixEffect(lines: string[], duration?: number): Promise<void>;
  
  // Display methods
  createBox(content: string | string[], style?: ThemeStyle, padding?: number): void;
  showLoading(message: string, duration?: number): Promise<void>;
  
  // Utility methods
  success(message: string): void;
  error(message: string): void;
  warning(message: string): void;
  info(message: string): void;
}

export interface ILoggerConstructor {
  new (theme?: ThemeName): ILogger;
}