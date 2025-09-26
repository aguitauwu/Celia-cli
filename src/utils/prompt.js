/**
 * 🌸 Celia's interactive prompt utilities
 */

const readline = require('readline');

class PromptUtils {
  constructor() {
    this.rl = null;
  }
  
  /**
   * Initialize readline interface
   */
  init() {
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
  close() {
    if (this.rl) {
      this.rl.close();
      this.rl = null;
    }
  }
  
  /**
   * Prompt user for input with readline
   */
  async question(prompt, timeout = 30000) {
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
  async questionHidden(prompt) {
    return new Promise((resolve) => {
      const stdin = process.stdin;
      const stdout = process.stdout;
      
      stdout.write(prompt);
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');
      
      let input = '';
      const onData = (char) => {
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
  getCommandSuggestions(input, commands) {
    if (!input || !commands) return [];
    
    const allCommands = [];
    
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
}

module.exports = PromptUtils;