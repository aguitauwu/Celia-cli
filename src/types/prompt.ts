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

export interface ISelectOptions<T = string> {
  message: string;
  choices: Array<{ name: string; value: T; description?: string }>;
  defaultValue?: T;
}

export interface IPromptUtils {
  // Basic input
  text(options: IPromptOptions): Promise<string>;
  confirm(options: IConfirmOptions): Promise<boolean>;
  select<T = string>(options: ISelectOptions<T>): Promise<T>;
  multiSelect<T = string>(options: ISelectOptions<T>): Promise<T[]>;
  
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