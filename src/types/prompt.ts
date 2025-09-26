/**
 * 🌸 Prompt/Input Type Definitions
 */

export interface IPromptOptions {
  message: string;
  defaultValue?: string;
  validate?: (value: string) => boolean | string;
  transform?: (value: string) => string;
  choices?: string[];
  multiple?: boolean;
}

export interface IConfirmOptions {
  message: string;
  defaultValue?: boolean;
}

export interface ISelectOptions {
  message: string;
  choices: Array<{ name: string; value: any; description?: string }>;
  defaultValue?: any;
}

export interface IPromptUtils {
  // Basic input
  text(options: IPromptOptions): Promise<string>;
  confirm(options: IConfirmOptions): Promise<boolean>;
  select(options: ISelectOptions): Promise<any>;
  multiSelect(options: ISelectOptions): Promise<any[]>;
  
  // Specialized prompts
  password(message: string): Promise<string>;
  number(message: string, defaultValue?: number): Promise<number>;
  email(message: string): Promise<string>;
  url(message: string): Promise<string>;
  
  // Utility methods
  validateEmail(email: string): boolean;
  validateUrl(url: string): boolean;
  validateRequired(value: string): boolean | string;
}

export interface IPromptConstructor {
  new (): IPromptUtils;
}