/**
 * 🌸 Celia's beautiful logging system
 */

const { THEMES, DEFAULT_THEME } = require('../config/themes');

class Logger {
  constructor(theme = DEFAULT_THEME) {
    this.theme = theme;
  }
  
  /**
   * Set current theme
   */
  setTheme(theme) {
    if (THEMES[theme]) {
      this.theme = theme;
    }
  }
  
  /**
   * Get current theme colors
   */
  getTheme() {
    return THEMES[this.theme];
  }
  
  /**
   * 🌙 Celia's beautiful theming system~
   */
  log(message, style = 'text') {
    const theme = this.getTheme();
    console.log(`${theme[style]}${message}${theme.reset}`);
  }
  
  /**
   * ✨ Animated typing effect~
   */
  async typeText(message, style = 'text', speed = 50) {
    const theme = this.getTheme();
    process.stdout.write(theme[style]);
    
    for (const char of message) {
      process.stdout.write(char);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    process.stdout.write(theme.reset + '\n');
  }
  
  /**
   * ✨ Beautiful loading animation~
   */
  async showLoading(message, duration = 2000) {
    const theme = this.getTheme();
    const frames = ['⠂', '⠆', '⠎', '⠜', '⠸', '⠰', '⠠', '⠀'];
    const colors = ['primary', 'secondary', 'accent'];
    
    process.stdout.write(theme.dim + message + ' ');
    
    let i = 0;
    const interval = setInterval(() => {
      const frame = frames[i % frames.length];
      const color = colors[i % colors.length];
      process.stdout.write(`\r${theme.dim}${message} ${theme[color]}${frame}${theme.reset}`);
      i++;
    }, 100);
    
    await new Promise(resolve => setTimeout(resolve, duration));
    clearInterval(interval);
    process.stdout.write(`\r${theme.success}${message} ✓${theme.reset}\n`);
  }
  
  /**
   * 🌟 Create beautiful boxes~
   */
  createBox(content, style = 'primary', padding = 1) {
    const theme = this.getTheme();
    const lines = Array.isArray(content) ? content : [content];
    const maxLength = Math.max(...lines.map(line => line.length));
    const width = maxLength + (padding * 2);
    
    const top = '╭' + '─'.repeat(width) + '╮';
    const bottom = '╰' + '─'.repeat(width) + '╯';
    
    console.log(`${theme[style]}${top}${theme.reset}`);
    lines.forEach(line => {
      const padded = line.padEnd(maxLength);
      const spaces = ' '.repeat(padding);
      console.log(`${theme[style]}│${spaces}${theme.reset}${theme.bright}${padded}${theme.reset}${theme[style]}${spaces}│${theme.reset}`);
    });
    console.log(`${theme[style]}${bottom}${theme.reset}`);
  }
  
  /**
   * 🌈 Gradient text effect~
   */
  gradientLog(text, colorKeys = ['primary', 'secondary', 'accent']) {
    const theme = this.getTheme();
    const colors = colorKeys.map(key => theme[key]);
    const chars = text.split('');
    const colorStep = colors.length / chars.length;
    
    let output = '';
    chars.forEach((char, index) => {
      const colorIndex = Math.floor(index * colorStep) % colors.length;
      output += `${colors[colorIndex]}${char}`;
    });
    output += theme.reset;
    
    console.log(output);
  }
  
  /**
   * ✨ Sparkle text effect~
   */
  sparkleLog(text, style = 'primary') {
    const theme = this.getTheme();
    const sparkles = ['✨', '💫', '⭐', '🌟'];
    const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
    console.log(`${theme[style]}${randomSparkle} ${text} ${randomSparkle}${theme.reset}`);
  }
  
  /**
   * 🌊 Wave text effect~
   */
  async waveText(text, style = 'primary', speed = 100) {
    const theme = this.getTheme();
    const chars = text.split('');
    
    for (let wave = 0; wave < 3; wave++) {
      process.stdout.write('\r' + ' '.repeat(text.length + 10));
      process.stdout.write('\r');
      
      for (let i = 0; i < chars.length; i++) {
        const char = Math.sin(wave + i * 0.5) > 0 ? chars[i].toUpperCase() : chars[i];
        process.stdout.write(`${theme[style]}${char}${theme.reset}`);
      }
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    process.stdout.write('\n');
  }
  
  /**
   * 💓 Pulse text effect~
   */
  async pulseText(text, style = 'accent', pulses = 3) {
    const theme = this.getTheme();
    
    for (let i = 0; i < pulses; i++) {
      process.stdout.write(`\r${theme[style]}${text}${theme.reset}`);
      await new Promise(resolve => setTimeout(resolve, 300));
      process.stdout.write(`\r${theme.dim}${text}${theme.reset}`);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    process.stdout.write(`\r${theme[style]}${text}${theme.reset}\n`);
  }
  
  /**
   * 📊 Progress bar~
   */
  async showProgressBar(message, duration = 2000, width = 30) {
    const theme = this.getTheme();
    const startTime = Date.now();
    
    while (Date.now() - startTime < duration) {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const filled = Math.floor(progress * width);
      const empty = width - filled;
      
      const bar = '█'.repeat(filled) + '░'.repeat(empty);
      const percentage = Math.floor(progress * 100);
      
      process.stdout.write(`\r${theme.info}${message} ${theme.accent}[${bar}] ${percentage}%${theme.reset}`);
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    process.stdout.write(`\r${theme.success}${message} [${'█'.repeat(width)}] 100% ✓${theme.reset}\n`);
  }
  
  // Convenience methods for common log types
  info(message) { this.log(message, 'info'); }
  success(message) { this.log(message, 'success'); }
  warning(message) { this.log(message, 'warning'); }
  error(message) { this.log(message, 'error'); }
  dim(message) { this.log(message, 'dim'); }
  bright(message) { this.log(message, 'bright'); }
}

module.exports = Logger;