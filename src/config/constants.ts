/**
 * 📋 Global constants and configuration
 */

import { 
  IConstants, 
  IPackageManagers, 
  PackageManagerName, 
  SupportedPlatform, 
  SupportedArchitecture 
} from '../types/constants';

export const CLI_NAME: string = 'opceanaicli';
export const VERSION: string = '2.0.0';
export const NODE_MIN_VERSION: string = '14.0.0';

// Timeout configurations
export const DEFAULT_TIMEOUT: number = 30000;
export const GIT_TIMEOUT: number = 60000;
export const INSTALL_TIMEOUT: number = 180000;

// File limits
export const MAX_FILENAME_LENGTH: number = 100;
export const MAX_ARGUMENT_LENGTH: number = 1000;

// System detection
export const SUPPORTED_PLATFORMS: SupportedPlatform[] = ['win32', 'linux', 'darwin', 'android'];
export const SUPPORTED_ARCHITECTURES: SupportedArchitecture[] = ['x64', 'ia32', 'arm', 'arm64', 'armv7l', 'aarch64'];

// Package managers
export const PACKAGE_MANAGERS: IPackageManagers = {
  npm: {
    name: 'npm',
    lockFile: 'package-lock.json',
    installCommand: ['install'],
    addCommand: ['install'],
    runCommand: ['run']
  },
  pnpm: {
    name: 'pnpm',
    lockFile: 'pnpm-lock.yaml',
    installCommand: ['install'],
    addCommand: ['add'],
    runCommand: ['run']
  },
  yarn: {
    name: 'yarn',
    lockFile: 'yarn.lock',
    installCommand: ['install'],
    addCommand: ['add'],
    runCommand: ['run']
  },
  bun: {
    name: 'bun',
    lockFile: 'bun.lockb',
    installCommand: ['install'],
    addCommand: ['add'],
    runCommand: ['run']
  }
};

// Export everything as a single constants object for backward compatibility
export const CONSTANTS: IConstants = {
  CLI_NAME,
  VERSION,
  NODE_MIN_VERSION,
  DEFAULT_TIMEOUT,
  GIT_TIMEOUT,
  INSTALL_TIMEOUT,
  MAX_FILENAME_LENGTH,
  MAX_ARGUMENT_LENGTH,
  SUPPORTED_PLATFORMS,
  SUPPORTED_ARCHITECTURES,
  PACKAGE_MANAGERS
};

export default CONSTANTS;