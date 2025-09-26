/**
 * 🛡️ Security utilities - Celia protege con amor~
 */

const { execFileSync } = require('child_process');

class SecurityUtils {
  /**
   * 🛡️ Sanitiza nombres de directorio para prevenir inyección
   */
  static sanitizeDirectoryName(dirName) {
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
  static validateGitHubUrl(url) {
    if (!url || typeof url !== 'string') {
      return false;
    }
    
    const githubRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+(\.git)?\/?$/;
    return githubRegex.test(url);
  }
  
  /**
   * 🛡️ Ejecuta comandos de forma segura sin shell
   */
  static execSafe(command, args = [], options = {}) {
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
  static runSequence(commands, options = {}) {
    for (const { command, args } of commands) {
      SecurityUtils.execSafe(command, args, options);
    }
  }
  
  /**
   * 🛡️ Obtener pasos de instalación seguros por lenguaje
   */
  static getInstallSteps(language, targetDir) {
    const steps = {
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
  static checkPrerequisites() {
    const required = ['git', 'node', 'npm'];
    const missing = [];
    
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
  static validateNodeVersion(requiredVersion = '14.0.0') {
    const currentVersion = process.version;
    
    const current = currentVersion.slice(1).split('.').map(Number);
    const required = requiredVersion.split('.').map(Number);
    
    for (let i = 0; i < 3; i++) {
      if (current[i] > required[i]) return true;
      if (current[i] < required[i]) return false;
    }
    return true;
  }
  
  /**
   * 🛡️ Sanitiza variables de entorno
   */
  static sanitizeEnvValue(value, sensitive = false) {
    if (!value || typeof value !== 'string') {
      return '';
    }
    
    // Remover caracteres de control
    let sanitized = value.replace(/[\x00-\x1F\x7F]/g, '');
    
    // Para valores sensibles, validar formato típico de tokens
    if (sensitive) {
      // Tokens típicos son alfanuméricos con algunos símbolos
      sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '');
    }
    
    return sanitized.trim();
  }
  
  /**
   * 🛡️ Parsea comandos de instalación de forma segura
   */
  static parseInstallCommand(command) {
    if (!command || typeof command !== 'string') {
      return [];
    }
    
    // Remover prefijos comunes y dividir por espacios de forma segura
    const cleaned = command
      .replace(/^(npm|pip|pip3)\s+/, '')
      .trim();
    
    // Dividir argumentos de forma segura
    const args = cleaned.split(/\s+/).filter(arg => {
      // Filtrar argumentos vacíos y potencialmente peligrosos
      return arg && 
             arg.length > 0 && 
             !/[;&|`$]/.test(arg) && // No metacaracteres peligrosos
             arg.length < 100; // Límite razonable de longitud
    });
    
    return args;
  }
  
  /**
   * 🛡️ Obtener archivos críticos según el lenguaje
   */
  static getCriticalFiles(language) {
    const files = {
      'Node.js': ['package.json'],
      'Python': ['requirements.txt'],
      'TypeScript': ['package.json', 'tsconfig.json']
    };
    
    return files[language] || ['README.md'];
  }
}

module.exports = SecurityUtils;