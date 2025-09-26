/**
 * 🌸 File System Type Definitions
 */

export interface IFileSystemUtils {
  // Directory operations
  ensureDirectoryExists(dirPath: string): Promise<void>;
  createTempDirectory(prefix?: string): Promise<string>;
  removeDirectory(dirPath: string, recursive?: boolean): Promise<void>;
  
  // File operations
  writeFile(filePath: string, content: string, encoding?: BufferEncoding): Promise<void>;
  readFile(filePath: string, encoding?: BufferEncoding): Promise<string>;
  copyFile(source: string, destination: string): Promise<void>;
  moveFile(source: string, destination: string): Promise<void>;
  deleteFile(filePath: string): Promise<void>;
  
  // Path utilities
  sanitizePath(path: string): string;
  isPathSafe(path: string, allowedDir: string): boolean;
  getFileExtension(filePath: string): string;
  
  // Existence checks
  fileExists(filePath: string): Promise<boolean>;
  directoryExists(dirPath: string): Promise<boolean>;
  
  // Git operations
  isGitRepository(dirPath: string): Promise<boolean>;
  initializeGitRepository(dirPath: string): Promise<void>;
}

export interface IFileSystemConstructor {
  new (): IFileSystemUtils;
}