/**
 * 🗂️ File system utilities with cross-platform support
 */

const fs = require('fs');
const path = require('path');

class FileSystemUtils {
  /**
   * Cross-platform directory removal with ARM/Termux compatibility
   */
  static removeDirectory(dirPath, system = null) {
    if (!fs.existsSync(dirPath)) return;
    
    try {
      // Use Node.js native recursive removal (Node 14.14+)
      if (fs.rmSync) {
        fs.rmSync(dirPath, { recursive: true, force: true });
      } else {
        // Fallback for older Node versions
        FileSystemUtils.removeDirectoryRecursive(dirPath);
      }
    } catch (error) {
      // Enhanced platform-specific commands with ARM/Termux support
      if (system) {
        FileSystemUtils.removeDirectoryWithSystem(dirPath, system);
      } else {
        throw error;
      }
    }
  }
  
  /**
   * Recursive directory removal fallback
   */
  static removeDirectoryRecursive(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        FileSystemUtils.removeDirectoryRecursive(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    
    fs.rmdirSync(dirPath);
  }
  
  /**
   * System-specific directory removal
   */
  static removeDirectoryWithSystem(dirPath, system) {
    const SecurityUtils = require('../security/security');
    
    try {
      if (system.platform.isWindows) {
        SecurityUtils.execSafe('rmdir', ['/s', '/q', dirPath]);
      } else if (system.isTermux) {
        // Termux may have different rm behavior - try both options
        try {
          SecurityUtils.execSafe('rm', ['-rf', dirPath]);
        } catch (termuxError) {
          SecurityUtils.execSafe('rm', ['-r', dirPath]);
        }
      } else {
        SecurityUtils.execSafe('rm', ['-rf', dirPath]);
      }
    } catch (cmdError) {
      // Final fallback for ARM/mobile environments
      if (system.isARM || system.isTermux || system.isEmbedded) {
        console.log('⚠️  Usando eliminación manual en entorno embebido/móvil');
        FileSystemUtils.removeDirectoryRecursive(dirPath);
      } else {
        throw cmdError;
      }
    }
  }
  
  /**
   * Create directory with error handling
   */
  static ensureDirectory(dirPath) {
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Copy file with error handling
   */
  static copyFile(src, dest) {
    try {
      fs.copyFileSync(src, dest);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Read file safely
   */
  static readFile(filePath, encoding = 'utf8') {
    try {
      return fs.readFileSync(filePath, encoding);
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Write file safely
   */
  static writeFile(filePath, content, encoding = 'utf8') {
    try {
      fs.writeFileSync(filePath, content, encoding);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Check if file exists and is readable
   */
  static isReadable(filePath) {
    try {
      fs.accessSync(filePath, fs.constants.R_OK);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Check if file exists and is writable
   */
  static isWritable(filePath) {
    try {
      fs.accessSync(filePath, fs.constants.W_OK);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Get file stats safely
   */
  static getStats(filePath) {
    try {
      return fs.statSync(filePath);
    } catch (error) {
      return null;
    }
  }
}

module.exports = FileSystemUtils;