import * as readline from 'readline';
import * as fs from 'fs';

/**
 * 🎨 Theme Type Definitions for Celia's Beautiful Theming System
 */
interface ITheme {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    text: string;
    bright: string;
    dim: string;
    bold: string;
    underline: string;
    italic: string;
    strikethrough: string;
    reset: string;
    [key: string]: string;
}
interface IThemes {
    [themeName: string]: ITheme;
}
type ThemeStyle = keyof ITheme | string;
type ThemeName = string;

/**
 * 🌸 Celia's beautiful logging system
 */

declare class Logger {
    theme: ThemeName;
    constructor(theme?: ThemeName);
    /**
     * Set current theme
     */
    setTheme(theme: ThemeName): void;
    /**
     * Get current theme colors
     */
    getTheme(): ITheme;
    /**
     * 🌙 Celia's beautiful theming system~
     */
    log(message: string, style?: ThemeStyle): void;
    /**
     * ✨ Animated typing effect~
     */
    typeText(message: string, style?: ThemeStyle, speed?: number): Promise<void>;
    /**
     * ✨ Beautiful loading animation~
     */
    showLoading(message: string, duration?: number): Promise<void>;
    /**
     * 🌟 Create beautiful boxes~
     */
    createBox(content: string | string[], style?: ThemeStyle, padding?: number): void;
    /**
     * 🌈 Gradient text effect~
     */
    gradientLog(text: string, colorKeys?: ThemeStyle[]): void;
    /**
     * ✨ Sparkle text effect~
     */
    sparkleLog(text: string, style?: ThemeStyle): void;
    /**
     * 🌊 Wave text effect (animated)~
     */
    waveText(text: string, style?: ThemeStyle, speed?: number): Promise<void>;
    /**
     * 🌊 Wave text effect (static)~
     */
    waveLog(text: string, style?: ThemeStyle): void;
    /**
     * 💓 Pulse text effect~
     */
    pulseText(text: string, style?: ThemeStyle, pulses?: number): Promise<void>;
    /**
     * 📊 Progress bar~
     */
    showProgressBar(message: string, duration?: number, width?: number): Promise<void>;
    /**
     * 💖 Heart text effect~
     */
    heartLog(text: string, style?: ThemeStyle): void;
    /**
     * 🔥 Fire text effect~
     */
    fireLog(text: string, style?: ThemeStyle): void;
    /**
     * 🌸 Flower text effect~
     */
    flowerLog(text: string, style?: ThemeStyle): void;
    success(message: string): void;
    error(message: string): void;
    warning(message: string): void;
    info(message: string): void;
    primary(message: string): void;
    secondary(message: string): void;
    accent(message: string): void;
    dim(message: string): void;
    bright(message: string): void;
}

/**
 * 🔧 System Type Definitions for Platform Detection
 */
interface ISystemArchitecture {
    raw: string;
    family: string;
    bits: number;
    endianness: string;
    isLittleEndian: boolean;
}
interface ISystemPlatform {
    raw: string;
    name: string;
    isUnix: boolean;
    isWindows: boolean;
    isMobile: boolean;
    isContainer: boolean;
    release: string;
}
interface ISystemCPU {
    count: number;
    model: string;
    speed: number;
    vendor: string;
    features: string[];
}
interface ISystemDetector {
    architecture: ISystemArchitecture;
    platform: ISystemPlatform;
    cpu: ISystemCPU;
    isTermux: boolean;
    isARM: boolean;
    isRISCV: boolean;
    isx86: boolean;
    isMIPS: boolean;
    isPowerPC: boolean;
    is64Bit: boolean;
    isEmbedded: boolean;
    generateCompatibilityReport(): string[];
    getPerformanceRecommendations(): string[];
}

/**
 * 🔍 System detection and environment analysis
 */

declare class SystemDetector implements ISystemDetector {
    architecture: ISystemArchitecture;
    platform: ISystemPlatform;
    cpu: ISystemCPU;
    isTermux: boolean;
    isARM: boolean;
    isRISCV: boolean;
    isx86: boolean;
    isMIPS: boolean;
    isPowerPC: boolean;
    is64Bit: boolean;
    isEmbedded: boolean;
    constructor();
    /**
     * 🔍 Comprehensive system and processor detection~
     */
    private detectSystemEnvironment;
    /**
     * 🏗️ Get architecture family from Node.js arch string~
     */
    private getArchitectureFamily;
    /**
     * 🔢 Get architecture bit width~
     */
    private getArchitectureBits;
    /**
     * 🖥️ Get friendly platform name~
     */
    private getPlatformName;
    /**
     * 📱 Detect mobile platform environments~
     */
    private detectMobilePlatform;
    /**
     * 🐳 Detect container environments~
     */
    private detectContainerEnvironment;
    /**
     * 🔧 Get CPU vendor from model string~
     */
    private getCpuVendor;
    /**
     * ⚡ Detect CPU features and capabilities~
     */
    private detectCpuFeatures;
    /**
     * 🤖 Detect embedded system environments~
     */
    private detectEmbeddedSystem;
    /**
     * 📋 Generate system compatibility report~
     */
    generateCompatibilityReport(): string[];
    /**
     * 🎯 Get performance recommendations based on system~
     */
    getPerformanceRecommendations(): string[];
}

/**
 * 🌸 Command Type Definitions for Celia CLI
 */
/**
 * Command arguments interface
 */
interface ICommandArgs {
    [key: string]: string | number | boolean | undefined;
}
/**
 * Base command interface
 */
interface ICommand {
    name: string;
    config: ICommandDefinition;
}
/**
 * Command definition interface
 */
interface ICommandDefinition {
    aliases?: string[];
    description?: string;
    usage?: string;
    action: (args?: string[]) => Promise<void> | void;
}
/**
 * Command router interface
 */
interface ICommandRouter {
    commands: Map<string, ICommandDefinition>;
    register(name: string, config: ICommandDefinition): void;
    getCommand(name: string): ICommand | null;
    execute(commandName: string, args?: string[]): Promise<void>;
    getCommands(): Map<string, ICommandDefinition>;
    getSuggestions(input: string): string[];
    hasCommand(name: string): boolean;
}

/**
 * 🌸 Celia's interactive prompt utilities
 */

declare class PromptUtils {
    private rl;
    /**
     * Initialize readline interface
     */
    init(): readline.Interface;
    /**
     * Close readline interface
     */
    close(): void;
    /**
     * Prompt user for input with readline
     */
    question(prompt: string, timeout?: number): Promise<string>;
    /**
     * Prompt user for sensitive input (hidden characters)
     */
    questionHidden(prompt: string): Promise<string>;
    /**
     * Get command suggestions for autocompletion
     */
    getCommandSuggestions(input: string, commands: Map<string, ICommandDefinition>): string[];
    /**
     * Confirm action with user
     */
    confirm(message: string, defaultValue?: boolean): Promise<boolean>;
    /**
     * Select from multiple options
     */
    select(message: string, options: string[]): Promise<string | null>;
    /**
     * Multi-line input
     */
    multiline(prompt: string, endMarker?: string): Promise<string>;
}

/**
 * 🌸 Celia's command router
 */

declare class CommandRouter implements ICommandRouter {
    commands: Map<string, ICommandDefinition>;
    constructor();
    /**
     * Register a command
     */
    register(name: string, config: ICommandDefinition): void;
    /**
     * Get command by name or alias
     */
    getCommand(name: string): ICommand | null;
    /**
     * Execute command
     */
    execute(commandName: string, args?: string[]): Promise<void>;
    /**
     * Get all commands
     */
    getCommands(): Map<string, ICommandDefinition>;
    /**
     * Get command suggestions for autocompletion
     */
    getSuggestions(input: string): string[];
    /**
     * Check if command exists
     */
    hasCommand(name: string): boolean;
}

/**
 * 🌸 Celia - Main CLI Application Class
 */

declare class CeliaAssistant {
    logger: Logger;
    system: SystemDetector;
    prompt: PromptUtils;
    router: CommandRouter;
    interactive: boolean;
    constructor();
    /**
     * 🛡️ Verificar prerrequisitos críticos
     */
    static checkCriticalPrerequisites(): void;
    /**
     * 🛡️ Mostrar estado de prerrequisitos
     */
    showPrerequisiteStatus(): void;
    /**
     * 🌸 Initialize Celia's modern command system~
     */
    initializeCommands(): void;
    /**
     * 🌟 Modern CLI entry point with beautiful parsing~
     */
    run(): Promise<void>;
    /**
     * Show version information
     */
    showVersion(): void;
    /**
     * 🌸 Celia's beautiful modern banner~
     */
    showBanner(): void;
    /**
     * 💬 Enhanced interactive mode~
     */
    startInteractiveMode(): Promise<void>;
    modernInstall(botName?: string): Promise<void>;
    quickInstallBot(botName?: string): Promise<void>;
}

/**
 * 🛡️ Security Type Definitions for Safe Operations
 */
interface ICommandStep {
    command: string;
    args: string[];
}
interface IExecOptions {
    stdio?: 'inherit' | 'ignore' | 'pipe' | [any, any, any];
    encoding?: BufferEncoding;
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    timeout?: number;
    [key: string]: any;
}
interface IInstallSteps {
    [language: string]: ICommandStep[];
}
type SupportedLanguage = 'Node.js' | 'Python' | 'TypeScript';

/**
 * 🛡️ Security utilities - Celia protege con amor~
 */

declare class SecurityUtils {
    /**
     * 🛡️ Sanitiza nombres de directorio para prevenir inyección
     */
    static sanitizeDirectoryName(dirName: string): string;
    /**
     * 🛡️ Valida URLs de GitHub
     */
    static validateGitHubUrl(url: string): boolean;
    /**
     * 🛡️ Ejecuta comandos de forma segura sin shell
     */
    static execSafe(command: string, args?: string[], options?: IExecOptions): Buffer | string;
    /**
     * 🛡️ Ejecuta secuencia de comandos de forma segura
     */
    static runSequence(commands: ICommandStep[], options?: IExecOptions): void;
    /**
     * 🛡️ Obtener pasos de instalación seguros por lenguaje
     */
    static getInstallSteps(language: SupportedLanguage, targetDir?: string): ICommandStep[];
    /**
     * 🛡️ Valida que comandos necesarios estén disponibles
     */
    static checkPrerequisites(): string[];
    /**
     * 🛡️ Valida versión mínima de Node.js
     */
    static validateNodeVersion(requiredVersion?: string): boolean;
    /**
     * 🛡️ Sanitiza variables de entorno
     */
    static sanitizeEnvValue(value: string, sensitive?: boolean): string;
    /**
     * 🛡️ Valida argumentos de línea de comandos
     */
    static validateCommandArgs(args: string[]): string[];
    /**
     * 🛡️ Genera nombre de archivo seguro
     */
    static sanitizeFileName(fileName: string): string;
    /**
     * 🛡️ Verifica que una ruta esté dentro de un directorio permitido
     */
    static isPathSafe(filePath: string, allowedDir: string): boolean;
    /**
     * 🛡️ Genera hash seguro para identificación
     */
    static generateSafeHash(input: string): string;
    /**
     * 🛡️ Valida formato de email básico
     */
    static validateEmail(email: string): boolean;
    /**
     * 🛡️ Escapa caracteres especiales para regex
     */
    static escapeRegex(string: string): string;
}

/**
 * 🗂️ File system utilities with cross-platform support
 */

declare class FileSystemUtils {
    /**
     * Cross-platform directory removal with ARM/Termux compatibility
     */
    static removeDirectory(dirPath: string, system?: ISystemDetector | null): void;
    /**
     * Recursive directory removal fallback
     */
    static removeDirectoryRecursive(dirPath: string): void;
    /**
     * System-specific directory removal
     */
    static removeDirectoryWithSystem(dirPath: string, system: ISystemDetector): void;
    /**
     * Create directory with error handling
     */
    static ensureDirectory(dirPath: string): boolean;
    /**
     * Copy file with error handling
     */
    static copyFile(src: string, dest: string): boolean;
    /**
     * Read file safely
     */
    static readFile(filePath: string, encoding?: BufferEncoding): string | null;
    /**
     * Write file safely
     */
    static writeFile(filePath: string, content: string, encoding?: BufferEncoding): boolean;
    /**
     * Check if path exists
     */
    static exists(filePath: string): boolean;
    /**
     * Get file stats safely
     */
    static getStats(filePath: string): fs.Stats | null;
    /**
     * Check if path is directory
     */
    static isDirectory(dirPath: string): boolean;
    /**
     * Check if path is file
     */
    static isFile(filePath: string): boolean;
    /**
     * Get directory contents safely
     */
    static readDirectory(dirPath: string): string[] | null;
    /**
     * Get file extension
     */
    static getExtension(filePath: string): string;
    /**
     * Get file name without extension
     */
    static getBaseName(filePath: string, ext?: string): string;
    /**
     * Get directory name
     */
    static getDirName(filePath: string): string;
    /**
     * Join paths safely
     */
    static joinPath(...paths: string[]): string;
    /**
     * Normalize path
     */
    static normalizePath(filePath: string): string;
    /**
     * Get absolute path
     */
    static getAbsolutePath(filePath: string): string;
}

/**
 * 🌸 Celia's beautiful theme system
 */

declare const THEMES: IThemes;

/**
 * 🌸 Bot Configuration Type Definitions
 */
interface IEnvVar {
    name: string;
    description: string;
    required: boolean;
    sensitive: boolean;
    default?: string;
}
interface IBotConfig {
    name: string;
    url: string;
    description: string;
    language: 'Node.js' | 'Python' | 'TypeScript';
    category: string;
    envVars: IEnvVar[];
}
interface IBots {
    [botKey: string]: IBotConfig;
}
type BotLanguage = 'Node.js' | 'Python' | 'TypeScript';
type BotKey = 'nebula' | 'archan' | 'sakura' | 'lumina' | 'katu';

/**
 * 🌸 Celia's bot sisters configuration
 */

declare const BOTS: IBots;

/**
 * 📋 Constants Type Definitions
 */
interface IPackageManagerConfig {
    name: string;
    lockFile: string;
    installCommand: string[];
    addCommand: string[];
    runCommand: string[];
}
interface IPackageManagers {
    npm: IPackageManagerConfig;
    pnpm: IPackageManagerConfig;
    yarn: IPackageManagerConfig;
    bun: IPackageManagerConfig;
    [key: string]: IPackageManagerConfig;
}
interface IConstants {
    CLI_NAME: string;
    VERSION: string;
    NODE_MIN_VERSION: string;
    DEFAULT_TIMEOUT: number;
    GIT_TIMEOUT: number;
    INSTALL_TIMEOUT: number;
    MAX_FILENAME_LENGTH: number;
    MAX_ARGUMENT_LENGTH: number;
    SUPPORTED_PLATFORMS: string[];
    SUPPORTED_ARCHITECTURES: string[];
    PACKAGE_MANAGERS: IPackageManagers;
}
type PackageManagerName = 'npm' | 'pnpm' | 'yarn' | 'bun';
type SupportedPlatform = 'win32' | 'linux' | 'darwin' | 'android';
type SupportedArchitecture = 'x64' | 'ia32' | 'arm' | 'arm64' | 'armv7l' | 'aarch64';

/**
 * 📋 Global constants and configuration
 */

declare const VERSION: string;
declare const NODE_MIN_VERSION: string;

/**
 * 🌸 Logger Type Definitions
 */

interface ILogger {
    theme: ThemeName;
    setTheme(theme: ThemeName): void;
    getTheme(): ITheme;
    log(message: string, style?: ThemeStyle): void;
    typeText(message: string, style?: ThemeStyle, speed?: number): Promise<void>;
    sparkleLog(message: string, style?: ThemeStyle, sparkles?: string[]): void;
    gradientLog(message: string, styles: ThemeStyle[]): void;
    fadeInText(message: string, style?: ThemeStyle, steps?: number): Promise<void>;
    rainbowText(text: string, speed?: number): Promise<void>;
    matrixEffect(lines: string[], duration?: number): Promise<void>;
    createBox(content: string | string[], style?: ThemeStyle, padding?: number): void;
    showLoading(message: string, duration?: number): Promise<void>;
    success(message: string): void;
    error(message: string): void;
    warning(message: string): void;
    info(message: string): void;
}
interface ILoggerConstructor {
    new (theme?: ThemeName): ILogger;
}

/**
 * 🌸 File System Type Definitions
 */
interface IFileSystemUtils {
    ensureDirectoryExists(dirPath: string): Promise<void>;
    createTempDirectory(prefix?: string): Promise<string>;
    removeDirectory(dirPath: string, recursive?: boolean): Promise<void>;
    writeFile(filePath: string, content: string, encoding?: BufferEncoding): Promise<void>;
    readFile(filePath: string, encoding?: BufferEncoding): Promise<string>;
    copyFile(source: string, destination: string): Promise<void>;
    moveFile(source: string, destination: string): Promise<void>;
    deleteFile(filePath: string): Promise<void>;
    sanitizePath(path: string): string;
    isPathSafe(path: string, allowedDir: string): boolean;
    getFileExtension(filePath: string): string;
    fileExists(filePath: string): Promise<boolean>;
    directoryExists(dirPath: string): Promise<boolean>;
    isGitRepository(dirPath: string): Promise<boolean>;
    initializeGitRepository(dirPath: string): Promise<void>;
}
interface IFileSystemConstructor {
    new (): IFileSystemUtils;
}

/**
 * 🌸 Prompt/Input Type Definitions
 */
interface IPromptOptions {
    message: string;
    defaultValue?: string;
    validate?: (value: string) => boolean | string;
    transform?: (value: string) => string;
    choices?: string[];
    multiple?: boolean;
}
interface IConfirmOptions {
    message: string;
    defaultValue?: boolean;
}
interface ISelectOptions {
    message: string;
    choices: Array<{
        name: string;
        value: any;
        description?: string;
    }>;
    defaultValue?: any;
}
interface IPromptUtils {
    text(options: IPromptOptions): Promise<string>;
    confirm(options: IConfirmOptions): Promise<boolean>;
    select(options: ISelectOptions): Promise<any>;
    multiSelect(options: ISelectOptions): Promise<any[]>;
    password(message: string): Promise<string>;
    number(message: string, defaultValue?: number): Promise<number>;
    email(message: string): Promise<string>;
    url(message: string): Promise<string>;
    validateEmail(email: string): boolean;
    validateUrl(url: string): boolean;
    validateRequired(value: string): boolean | string;
}
interface IPromptConstructor {
    new (): IPromptUtils;
}

/**
 * 🌸 Main Export Type Definitions
 */
interface ICeliaAssistantConfig {
    theme?: string;
    verbose?: boolean;
    interactive?: boolean;
    [key: string]: any;
}
interface ICeliaAssistant {
    logger: any;
    system: any;
    prompt: any;
    run(args: string[]): Promise<void>;
}

/**
 * 🌸 Celia CLI - Main Library Export
 *
 * This file provides programmatic access to Celia's functionality
 * for users who want to integrate it into their own applications.
 */

declare const version: string;

export { BOTS, type BotKey, type BotLanguage, CeliaAssistant, CommandRouter, FileSystemUtils, type IBotConfig, type IBots, type ICeliaAssistant, type ICeliaAssistantConfig, type ICommand, type ICommandArgs, type ICommandDefinition, type ICommandRouter, type ICommandStep, type IConfirmOptions, type IConstants, type IEnvVar, type IExecOptions, type IFileSystemConstructor, type IFileSystemUtils, type IInstallSteps, type ILogger, type ILoggerConstructor, type IPackageManagerConfig, type IPackageManagers, type IPromptConstructor, type IPromptOptions, type IPromptUtils, type ISelectOptions, type ISystemArchitecture, type ISystemCPU, type ISystemDetector, type ISystemPlatform, type ITheme, type IThemes, Logger, NODE_MIN_VERSION, type PackageManagerName, PromptUtils, SecurityUtils, type SupportedArchitecture, type SupportedLanguage, type SupportedPlatform, SystemDetector, THEMES, type ThemeName, type ThemeStyle, VERSION, version };
