/**
 * 🛡️ Security utilities - Celia protege con amor~
 */

import { execFileSync } from 'child_process';
import { ICommandStep, IExecOptions, IInstallSteps, SupportedLanguage } from '../types/security';

export class SecurityUtils {
  /**
   * 🛡️ Sanitiza nombres de directorio para prevenir inyección
   */
  static sanitizeDirectoryName(dirName: string): string {
    if (!dirName || typeof dirName !== 'string') {
      throw new Error('Nombre de directorio inválido');
    }
    
    // Remover caracteres peligrosos
    const sanitized = dirName
      .replace(/[^a-zA-Z0-9_-]/g, '')
      .replace(/^\.+/, '') // No empezar con puntos
      .replace(/\.\.+/g, '') // No permitir ..
      .substring(0, 100); // Limitar longitud
    
    if (!sanitized || sanitized.length === 0) {
      throw new Error('Nombre de directorio resulta vacío después de sanitización');
    }
    
    // Lista negra de nombres problemáticos
    const blacklist = ['con', 'prn', 'aux', 'nul', 'com1', 'com2', 'com3', 'com4', 
                      'com5', 'com6', 'com7', 'com8', 'com9', 'lpt1', 'lpt2', 
                      'lpt3', 'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9'];
    
    if (blacklist.includes(sanitized.toLowerCase())) {
      throw new Error(`Nombre de directorio '${sanitized}' no está permitido`);
    }
    
    return sanitized;
  }
  
  /**
   * 🛡️ Valida URLs de GitHub
   */
  static validateGitHubUrl(url: string): boolean {
    if (!url || typeof url !== 'string') {
      return false;
    }
    
    const githubRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+(\.git)?\/?$/;
    return githubRegex.test(url);
  }
  
  /**
   * 🛡️ Ejecuta comandos de forma segura sin shell
   */
  static execSafe(command: string, args: string[] = [], options: IExecOptions = {}): Buffer | string {
    if (typeof command !== 'string') {
      throw new Error('El comando debe ser una string');
    }
    
    // Validar argumentos
    const safeArgs = args.map(arg => {
      if (typeof arg !== 'string') {
        throw new Error('Todos los argumentos deben ser strings');
      }
      // Verificar que no contengan caracteres peligrosos
      if (/[;&|`$\\]/.test(arg)) {
        throw new Error(`Argumento contiene caracteres peligrosos: ${arg}`);
      }
      return arg;
    });
    
    // Usar execFileSync para evitar shell injection
    return execFileSync(command, safeArgs, {
      stdio: 'inherit',
      encoding: 'utf8',
      ...options
    });
  }
  
  /**
   * 🛡️ Ejecuta secuencia de comandos de forma segura
   */
  static runSequence(commands: ICommandStep[], options: IExecOptions = {}): void {
    for (const { command, args } of commands) {
      SecurityUtils.execSafe(command, args, options);
    }
  }
  
  /**
   * 🛡️ Obtener pasos de instalación seguros por lenguaje
   */
  static getInstallSteps(language: SupportedLanguage, targetDir?: string): ICommandStep[] {
    const steps: IInstallSteps = {
      'Node.js': [
        { command: 'npm', args: ['install', '--progress', 'false'] }
      ],
      'Python': [
        { command: 'python', args: ['-m', 'pip', 'install', '-r', 'requirements.txt'] }
      ],
      'TypeScript': [
        { command: 'npm', args: ['install', '--progress', 'false'] },
        { command: 'npm', args: ['run', 'build'] }
      ]
    };
    
    return steps[language] || [];
  }
  
  /**
   * 🛡️ Valida que comandos necesarios estén disponibles
   */
  static checkPrerequisites(): string[] {
    const required = ['git', 'node', 'npm'];
    const missing: string[] = [];
    
    for (const cmd of required) {
      try {
        SecurityUtils.execSafe(cmd, ['--version'], { stdio: 'ignore' });
      } catch (error) {
        missing.push(cmd);
      }
    }
    
    return missing;
  }
  
  /**
   * 🛡️ Valida versión mínima de Node.js
   */
  static validateNodeVersion(requiredVersion: string = '14.0.0'): boolean {
    const currentVersion = process.version;
    
    const current = currentVersion.slice(1).split('.').map(v => parseInt(v, 10) || 0);
    const required = requiredVersion.split('.').map(v => parseInt(v, 10) || 0);
    
    for (let i = 0; i < 3; i++) {
      const currentNum = current[i] || 0;
      const requiredNum = required[i] || 0;
      if (currentNum > requiredNum) return true;
      if (currentNum < requiredNum) return false;
    }
    return true;
  }
  
  /**
   * 🛡️ Sanitiza variables de entorno
   */
  static sanitizeEnvValue(value: string, sensitive: boolean = false): string {
    if (!value || typeof value !== 'string') {
      return '';
    }
    
    if (sensitive) {
      // Para valores sensibles, remover caracteres peligrosos más agresivamente
      return value.replace(/[;&|`$\\<>"']/g, '').trim();
    }
    
    // Sanitización básica para valores normales
    return value.replace(/[;&|`$\\]/g, '').trim();
  }
  
  /**
   * 🛡️ Valida argumentos de línea de comandos
   */
  static validateCommandArgs(args: string[]): string[] {
    return args.map(arg => {
      if (typeof arg !== 'string') {
        throw new Error('Todos los argumentos deben ser strings');
      }
      
      // Remover caracteres peligrosos
      const sanitized = arg.replace(/[;&|`$\\]/g, '');
      
      if (sanitized !== arg) {
        throw new Error(`Argumento contiene caracteres peligrosos: ${arg}`);
      }
      
      return sanitized;
    });
  }
  
  /**
   * 🛡️ Genera nombre de archivo seguro
   */
  static sanitizeFileName(fileName: string): string {
    if (!fileName || typeof fileName !== 'string') {
      throw new Error('Nombre de archivo inválido');
    }
    
    // Remover caracteres peligrosos para nombres de archivo
    const sanitized = fileName
      .replace(/[<>:"/\\|?*]/g, '')
      .replace(/^\.+/, '') // No empezar con puntos
      .replace(/\s+/g, '_') // Reemplazar espacios con guiones bajos
      .substring(0, 255); // Limitar longitud
    
    if (!sanitized || sanitized.length === 0) {
      throw new Error('Nombre de archivo resulta vacío después de sanitización');
    }
    
    return sanitized;
  }
  
  /**
   * 🛡️ Verifica que una ruta esté dentro de un directorio permitido
   */
  static isPathSafe(filePath: string, allowedDir: string): boolean {
    if (!filePath || !allowedDir) {
      return false;
    }
    
    try {
      const path = require('path');
      const resolved = path.resolve(filePath);
      const allowed = path.resolve(allowedDir);
      
      return resolved.startsWith(allowed + path.sep) || resolved === allowed;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * 🛡️ Genera hash seguro para identificación
   */
  static generateSafeHash(input: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(input).digest('hex').substring(0, 16);
  }
  
  /**
   * 🛡️ Valida formato de email básico
   */
  static validateEmail(email: string): boolean {
    if (!email || typeof email !== 'string') {
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * 🛡️ Escapa caracteres especiales para regex
   */
  static escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

export default SecurityUtils;