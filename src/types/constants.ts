/**
 * 📋 Constants Type Definitions
 */

export interface IPackageManagerConfig {
  name: string;
  lockFile: string;
  installCommand: string[];
  addCommand: string[];
  runCommand: string[];
}

export interface IPackageManagers {
  npm: IPackageManagerConfig;
  pnpm: IPackageManagerConfig;
  yarn: IPackageManagerConfig;
  bun: IPackageManagerConfig;
  [key: string]: IPackageManagerConfig;
}

export interface IConstants {
  CLI_NAME: string;
  VERSION: string;
  NODE_MIN_VERSION: string;
  
  // Timeout configurations
  DEFAULT_TIMEOUT: number;
  GIT_TIMEOUT: number;
  INSTALL_TIMEOUT: number;
  
  // File limits
  MAX_FILENAME_LENGTH: number;
  MAX_ARGUMENT_LENGTH: number;
  
  // System detection
  SUPPORTED_PLATFORMS: string[];
  SUPPORTED_ARCHITECTURES: string[];
  
  // Package managers
  PACKAGE_MANAGERS: IPackageManagers;
}

export type PackageManagerName = 'npm' | 'pnpm' | 'yarn' | 'bun';
export type SupportedPlatform = 'win32' | 'linux' | 'darwin' | 'android';
export type SupportedArchitecture = 'x64' | 'ia32' | 'arm' | 'arm64' | 'armv7l' | 'aarch64';