/**
 * Global constants and configuration
 */

module.exports = {
  CLI_NAME: 'opceanaicli',
  VERSION: '2.0.0',
  NODE_MIN_VERSION: '14.0.0',
  
  // Timeout configurations
  DEFAULT_TIMEOUT: 30000,
  GIT_TIMEOUT: 60000,
  INSTALL_TIMEOUT: 180000,
  
  // File limits
  MAX_FILENAME_LENGTH: 100,
  MAX_ARGUMENT_LENGTH: 1000,
  
  // System detection
  SUPPORTED_PLATFORMS: ['win32', 'linux', 'darwin', 'android'],
  SUPPORTED_ARCHITECTURES: ['x64', 'ia32', 'arm', 'arm64', 'armv7l', 'aarch64'],
  
  // Package managers
  PACKAGE_MANAGERS: {
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
  }
};