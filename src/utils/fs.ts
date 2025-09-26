/**
 * 🗂️ File system utilities with cross-platform support
 */

import * as fs from 'fs';
import * as path from 'path';
import { ISystemDetector } from '../types/system';

export class FileSystemUtils {
  /**
   * Cross-platform directory removal with ARM/Termux compatibility
   */
  static removeDirectory(dirPath: string, system?: ISystemDetector | null): void {
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
  static removeDirectoryRecursive(dirPath: string): void {
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
  static removeDirectoryWithSystem(dirPath: string, system: ISystemDetector): void {
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
  static ensureDirectory(dirPath: string): boolean {
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
  static copyFile(src: string, dest: string): boolean {
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
  static readFile(filePath: string, encoding: BufferEncoding = 'utf8'): string | null {
    try {
      return fs.readFileSync(filePath, encoding);
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Write file safely
   */
  static writeFile(filePath: string, content: string, encoding: BufferEncoding = 'utf8'): boolean {
    try {
      fs.writeFileSync(filePath, content, encoding);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Check if path exists
   */
  static exists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }
  
  /**
   * Get file stats safely
   */
  static getStats(filePath: string): fs.Stats | null {
    try {
      return fs.statSync(filePath);
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Check if path is directory
   */
  static isDirectory(dirPath: string): boolean {
    try {
      const stat = fs.statSync(dirPath);
      return stat.isDirectory();
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Check if path is file
   */
  static isFile(filePath: string): boolean {
    try {
      const stat = fs.statSync(filePath);
      return stat.isFile();
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Get directory contents safely
   */
  static readDirectory(dirPath: string): string[] | null {
    try {
      return fs.readdirSync(dirPath);
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Get file extension
   */
  static getExtension(filePath: string): string {
    return path.extname(filePath);
  }
  
  /**
   * Get file name without extension
   */
  static getBaseName(filePath: string, ext?: string): string {
    return path.basename(filePath, ext);
  }
  
  /**
   * Get directory name
   */
  static getDirName(filePath: string): string {
    return path.dirname(filePath);
  }
  
  /**
   * Join paths safely
   */
  static joinPath(...paths: string[]): string {
    return path.join(...paths);
  }
  
  /**
   * Normalize path
   */
  static normalizePath(filePath: string): string {
    return path.normalize(filePath);
  }
  
  /**
   * Get absolute path
   */
  static getAbsolutePath(filePath: string): string {
    return path.resolve(filePath);
  }
}

export default FileSystemUtils;