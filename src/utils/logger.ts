/**
 * 🌸 Celia's beautiful logging system
 */

import { ITheme, ThemeStyle, ThemeName } from '../types/theme';
const { THEMES, DEFAULT_THEME } = require('../config/themes');

export class Logger {
  public theme: ThemeName;

  constructor(theme: ThemeName = DEFAULT_THEME) {
    this.theme = theme;
  }
  
  /**
   * Set current theme
   */
  setTheme(theme: ThemeName): void {
    if (THEMES[theme]) {
      this.theme = theme;
    }
  }
  
  /**
   * Get current theme colors
   */
  getTheme(): ITheme {
    return THEMES[this.theme];
  }
  
  /**
   * 🌙 Celia's beautiful theming system~
   */
  log(message: string, style: ThemeStyle = 'text'): void {
    const theme = this.getTheme();
    console.log(`${theme[style]}${message}${theme.reset}`);
  }
  
  /**
   * ✨ Animated typing effect~
   */
  async typeText(message: string, style: ThemeStyle = 'text', speed: number = 50): Promise<void> {
    const theme = this.getTheme();
    process.stdout.write(theme[style] || theme.text);
    
    for (const char of message) {
      process.stdout.write(char);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    process.stdout.write(theme.reset + '\n');
  }
  
  /**
   * ✨ Beautiful loading animation~
   */
  async showLoading(message: string, duration: number = 2000): Promise<void> {
    const theme = this.getTheme();
    const frames = ['⠂', '⠆', '⠎', '⠜', '⠸', '⠰', '⠠', '⠀'];
    const colors: ThemeStyle[] = ['primary', 'secondary', 'accent'];
    
    process.stdout.write(theme.dim + message + ' ');
    
    let i = 0;
    const interval = setInterval(() => {
      const frame = frames[i % frames.length];
      const colorIndex = i % colors.length;
      const color = colors[colorIndex] || 'primary';
      const colorCode = theme[color] || theme.primary;
      process.stdout.write(`\r${theme.dim}${message} ${colorCode}${frame}${theme.reset}`);
      i++;
    }, 100);
    
    await new Promise(resolve => setTimeout(resolve, duration));
    clearInterval(interval);
    process.stdout.write(`\r${theme.success}${message} ✓${theme.reset}\n`);
  }
  
  /**
   * 🌟 Create beautiful boxes~
   */
  createBox(content: string | string[], style: ThemeStyle = 'primary', padding: number = 1): void {
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
  gradientLog(text: string, colorKeys: ThemeStyle[] = ['primary', 'secondary', 'accent']): void {
    const theme = this.getTheme();
    const colors = colorKeys.map(key => theme[key] || theme.primary);
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
  sparkleLog(text: string, style: ThemeStyle = 'primary'): void {
    const theme = this.getTheme();
    const sparkles = ['✨', '💫', '⭐', '🌟'];
    const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
    console.log(`${theme[style]}${randomSparkle} ${text} ${randomSparkle}${theme.reset}`);
  }
  
  /**
   * 🌊 Wave text effect (animated)~
   */
  async waveText(text: string, style: ThemeStyle = 'primary', speed: number = 100): Promise<void> {
    const theme = this.getTheme();
    const chars = text.split('');
    
    for (let wave = 0; wave < 3; wave++) {
      process.stdout.write('\r' + ' '.repeat(text.length + 10));
      process.stdout.write('\r');
      
      for (let i = 0; i < chars.length; i++) {
        const char = Math.sin(wave + i * 0.5) > 0 ? chars[i]?.toUpperCase() || chars[i] : chars[i];
        process.stdout.write(`${theme[style] || theme.primary}${char}${theme.reset}`);
      }
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    process.stdout.write('\n');
  }
  
  /**
   * 🌊 Wave text effect (static)~
   */
  waveLog(text: string, style: ThemeStyle = 'accent'): void {
    const theme = this.getTheme();
    const waves = ['〰️', '🌊', '〜', '～'];
    const randomWave = waves[Math.floor(Math.random() * waves.length)];
    console.log(`${theme[style] || theme.accent}${randomWave} ${text} ${randomWave}${theme.reset}`);
  }
  
  /**
   * 💓 Pulse text effect~
   */
  async pulseText(text: string, style: ThemeStyle = 'accent', pulses: number = 3): Promise<void> {
    const theme = this.getTheme();
    
    for (let i = 0; i < pulses; i++) {
      process.stdout.write(`\r${theme[style] || theme.accent}${text}${theme.reset}`);
      await new Promise(resolve => setTimeout(resolve, 300));
      process.stdout.write(`\r${theme.dim}${text}${theme.reset}`);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    process.stdout.write(`\r${theme[style] || theme.accent}${text}${theme.reset}\n`);
  }
  
  /**
   * 📊 Progress bar~
   */
  async showProgressBar(message: string, duration: number = 2000, width: number = 30): Promise<void> {
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
  
  /**
   * 💖 Heart text effect~
   */
  heartLog(text: string, style: ThemeStyle = 'primary'): void {
    const theme = this.getTheme();
    const hearts = ['💖', '💕', '💗', '🩷'];
    const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
    console.log(`${theme[style]}${randomHeart} ${text} ${randomHeart}${theme.reset}`);
  }
  
  /**
   * 🔥 Fire text effect~
   */
  fireLog(text: string, style: ThemeStyle = 'error'): void {
    const theme = this.getTheme();
    const fires = ['🔥', '💥', '⚡', '💫'];
    const randomFire = fires[Math.floor(Math.random() * fires.length)];
    console.log(`${theme[style]}${randomFire} ${text} ${randomFire}${theme.reset}`);
  }
  
  /**
   * 🌸 Flower text effect~
   */
  flowerLog(text: string, style: ThemeStyle = 'accent'): void {
    const theme = this.getTheme();
    const flowers = ['🌸', '🌺', '🌻', '🌷'];
    const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
    console.log(`${theme[style]}${randomFlower} ${text} ${randomFlower}${theme.reset}`);
  }
  
  // Convenient logging shortcuts
  success(message: string): void { this.log(message, 'success'); }
  error(message: string): void { this.log(message, 'error'); }
  warning(message: string): void { this.log(message, 'warning'); }
  info(message: string): void { this.log(message, 'info'); }
  primary(message: string): void { this.log(message, 'primary'); }
  secondary(message: string): void { this.log(message, 'secondary'); }
  accent(message: string): void { this.log(message, 'accent'); }
  dim(message: string): void { this.log(message, 'dim'); }
  bright(message: string): void { this.log(message, 'bright'); }
}

export default Logger;