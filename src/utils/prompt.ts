/**
 * 🌸 Celia's interactive prompt utilities
 */

import * as readline from 'readline';
import { ICommandDefinition } from '../types/command';

export class PromptUtils {
  private rl: readline.Interface | null = null;

  /**
   * Initialize readline interface
   */
  init(): readline.Interface {
    if (!this.rl) {
      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    }
    return this.rl;
  }
  
  /**
   * Close readline interface
   */
  close(): void {
    if (this.rl) {
      this.rl.close();
      this.rl = null;
    }
  }
  
  /**
   * Prompt user for input with readline
   */
  async question(prompt: string, timeout: number = 30000): Promise<string> {
    const rl = this.init();
    
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        console.log('\n⏰ Timeout - usando valor por defecto');
        resolve('');
      }, timeout);
      
      rl.question(prompt, (answer) => {
        clearTimeout(timer);
        resolve(answer.trim());
      });
    });
  }

  /**
   * Prompt user for sensitive input (hidden characters)
   */
  async questionHidden(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      const stdin = process.stdin;
      const stdout = process.stdout;
      
      stdout.write(prompt);
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');
      
      let input = '';
      const onData = (char: string) => {
        switch (char) {
          case '\n':
          case '\r':
          case '\u0004':
            stdin.setRawMode(false);
            stdin.removeListener('data', onData);
            stdin.pause();
            stdout.write('\n');
            resolve(input);
            break;
          case '\u0003':
            process.exit(1);
            break;
          case '\u007f': // backspace
            if (input.length > 0) {
              input = input.slice(0, -1);
              stdout.write('\b \b');
            }
            break;
          default:
            input += char;
            stdout.write('*');
            break;
        }
      };
      
      stdin.on('data', onData);
    });
  }
  
  /**
   * Get command suggestions for autocompletion
   */
  getCommandSuggestions(input: string, commands: Map<string, ICommandDefinition>): string[] {
    if (!input || !commands) return [];
    
    const allCommands: string[] = [];
    
    // Add command names
    for (const [name] of commands) {
      allCommands.push(name);
    }
    
    // Add aliases
    for (const [, cmd] of commands) {
      if (cmd.aliases) {
        allCommands.push(...cmd.aliases);
      }
    }
    
    // Filter and return suggestions
    return allCommands
      .filter(cmd => cmd.toLowerCase().startsWith(input.toLowerCase()))
      .slice(0, 10); // Limit to 10 suggestions
  }
  
  /**
   * Confirm action with user
   */
  async confirm(message: string, defaultValue: boolean = false): Promise<boolean> {
    const suffix = defaultValue ? ' (Y/n)' : ' (y/N)';
    const answer = await this.question(`${message}${suffix}: `);
    
    if (!answer.trim()) {
      return defaultValue;
    }
    
    return ['y', 'yes', 'si', 'sí'].includes(answer.toLowerCase());
  }
  
  /**
   * Select from multiple options
   */
  async select(message: string, options: string[]): Promise<string | null> {
    console.log(`\n${message}`);
    options.forEach((option, index) => {
      console.log(`  ${index + 1}. ${option}`);
    });
    
    const answer = await this.question('\nSelecciona una opción (número): ');
    const index = parseInt(answer.trim()) - 1;
    
    if (index >= 0 && index < options.length) {
      return options[index] || null;
    }
    
    return null;
  }
  
  /**
   * Multi-line input
   */
  async multiline(prompt: string, endMarker: string = 'END'): Promise<string> {
    console.log(`${prompt} (termina con '${endMarker}' en una línea nueva):`);
    
    const lines: string[] = [];
    let line = '';
    
    while (line !== endMarker) {
      line = await this.question('> ');
      if (line !== endMarker) {
        lines.push(line);
      }
    }
    
    return lines.join('\n');
  }
}

export default PromptUtils;