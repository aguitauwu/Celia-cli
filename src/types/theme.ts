/**
 * 🎨 Theme Type Definitions for Celia's Beautiful Theming System
 */

export interface ITheme {
  // Base colors
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Text styles
  text: string;
  bright: string;
  dim: string;
  
  // Formatting
  bold: string;
  underline: string;
  italic: string;
  strikethrough: string;
  
  // Special
  reset: string;
  
  // Allow additional string keys for flexibility
  [key: string]: string;
}

export interface IThemes {
  [themeName: string]: ITheme;
}

export type ThemeStyle = keyof ITheme | string;
export type ThemeName = string;