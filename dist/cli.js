#!/usr/bin/env node
'use strict';

var os = require('os');
var fs3 = require('fs');
var child_process = require('child_process');
var readline = require('readline');
var path2 = require('path');
var crypto = require('crypto');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var os__namespace = /*#__PURE__*/_interopNamespace(os);
var fs3__namespace = /*#__PURE__*/_interopNamespace(fs3);
var readline__namespace = /*#__PURE__*/_interopNamespace(readline);
var path2__namespace = /*#__PURE__*/_interopNamespace(path2);
var crypto__namespace = /*#__PURE__*/_interopNamespace(crypto);

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "node_modules/tsup/assets/cjs_shims.js"() {
  }
});

// src/config/themes.ts
var themes_exports = {};
__export(themes_exports, {
  DEFAULT_THEME: () => DEFAULT_THEME,
  THEMES: () => THEMES,
  default: () => themes_default
});
var THEMES, DEFAULT_THEME, themes_default;
var init_themes = __esm({
  "src/config/themes.ts"() {
    init_cjs_shims();
    THEMES = {
      celestial: {
        primary: "\x1B[38;5;147m",
        // Light purple
        secondary: "\x1B[38;5;183m",
        // Pink
        accent: "\x1B[38;5;219m",
        // Rose
        success: "\x1B[38;5;157m",
        // Mint green
        warning: "\x1B[38;5;221m",
        // Golden
        error: "\x1B[38;5;210m",
        // Soft red
        info: "\x1B[38;5;159m",
        // Sky blue
        text: "\x1B[38;5;250m",
        // Light gray
        dim: "\x1B[38;5;244m",
        // Dim gray
        bright: "\x1B[38;5;15m",
        // White
        bold: "\x1B[1m",
        // Bold
        underline: "\x1B[4m",
        // Underline
        italic: "\x1B[3m",
        // Italic
        strikethrough: "\x1B[9m",
        // Strikethrough
        reset: "\x1B[0m"
      },
      kawaii: {
        primary: "\x1B[38;5;213m",
        // Hot pink
        secondary: "\x1B[38;5;225m",
        // Light pink
        accent: "\x1B[38;5;207m",
        // Deep pink
        success: "\x1B[38;5;121m",
        // Bright green
        warning: "\x1B[38;5;226m",
        // Bright yellow
        error: "\x1B[38;5;203m",
        // Red
        info: "\x1B[38;5;117m",
        // Light blue
        text: "\x1B[38;5;255m",
        // Bright white
        dim: "\x1B[38;5;242m",
        // Medium gray
        bright: "\x1B[38;5;15m",
        // White
        bold: "\x1B[1m",
        // Bold
        underline: "\x1B[4m",
        // Underline
        italic: "\x1B[3m",
        // Italic
        strikethrough: "\x1B[9m",
        // Strikethrough
        reset: "\x1B[0m"
      },
      dreamy: {
        primary: "\x1B[38;5;140m",
        // Purple
        secondary: "\x1B[38;5;176m",
        // Lavender
        accent: "\x1B[38;5;104m",
        // Deep purple
        success: "\x1B[38;5;151m",
        // Soft green
        warning: "\x1B[38;5;179m",
        // Peach
        error: "\x1B[38;5;167m",
        // Soft coral
        info: "\x1B[38;5;109m",
        // Soft blue
        text: "\x1B[38;5;252m",
        // Off white
        dim: "\x1B[38;5;240m",
        // Dark gray
        bright: "\x1B[38;5;15m",
        // White
        bold: "\x1B[1m",
        // Bold
        underline: "\x1B[4m",
        // Underline
        italic: "\x1B[3m",
        // Italic
        strikethrough: "\x1B[9m",
        // Strikethrough
        reset: "\x1B[0m"
      }
    };
    DEFAULT_THEME = "celestial";
    themes_default = { THEMES, DEFAULT_THEME };
  }
});

// src/bin/cli.ts
init_cjs_shims();

// src/cli/celia.ts
init_cjs_shims();

// src/config/constants.ts
init_cjs_shims();
var VERSION = "2.0.0";
var NODE_MIN_VERSION = "14.0.0";

// src/utils/logger.ts
init_cjs_shims();
var { THEMES: THEMES2, DEFAULT_THEME: DEFAULT_THEME2 } = (init_themes(), __toCommonJS(themes_exports));
var _Logger = class _Logger {
  constructor(theme = DEFAULT_THEME2) {
    this.theme = theme;
  }
  /**
   * Set current theme
   */
  setTheme(theme) {
    if (THEMES2[theme]) {
      this.theme = theme;
    }
  }
  /**
   * Get current theme colors
   */
  getTheme() {
    return THEMES2[this.theme];
  }
  /**
   * 🌙 Celia's beautiful theming system~
   */
  log(message, style = "text") {
    const theme = this.getTheme();
    console.log(`${theme[style]}${message}${theme.reset}`);
  }
  /**
   * ✨ Animated typing effect~
   */
  async typeText(message, style = "text", speed = 50) {
    const theme = this.getTheme();
    process.stdout.write(theme[style] || theme.text);
    for (const char of message) {
      process.stdout.write(char);
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
    process.stdout.write(theme.reset + "\n");
  }
  /**
   * ✨ Beautiful loading animation~
   */
  async showLoading(message, duration = 2e3) {
    const theme = this.getTheme();
    const frames = ["\u2802", "\u2806", "\u280E", "\u281C", "\u2838", "\u2830", "\u2820", "\u2800"];
    const colors = ["primary", "secondary", "accent"];
    process.stdout.write(theme.dim + message + " ");
    let i = 0;
    const interval = setInterval(() => {
      const frame = frames[i % frames.length];
      const colorIndex = i % colors.length;
      const color = colors[colorIndex] || "primary";
      const colorCode = theme[color] || theme.primary;
      process.stdout.write(`\r${theme.dim}${message} ${colorCode}${frame}${theme.reset}`);
      i++;
    }, 100);
    await new Promise((resolve) => setTimeout(resolve, duration));
    clearInterval(interval);
    process.stdout.write(`\r${theme.success}${message} \u2713${theme.reset}
`);
  }
  /**
   * 🌟 Create beautiful boxes~
   */
  createBox(content, style = "primary", padding = 1) {
    const theme = this.getTheme();
    const lines = Array.isArray(content) ? content : [content];
    const maxLength = Math.max(...lines.map((line) => line.length));
    const width = maxLength + padding * 2;
    const top = "\u256D" + "\u2500".repeat(width) + "\u256E";
    const bottom = "\u2570" + "\u2500".repeat(width) + "\u256F";
    console.log(`${theme[style]}${top}${theme.reset}`);
    lines.forEach((line) => {
      const padded = line.padEnd(maxLength);
      const spaces = " ".repeat(padding);
      console.log(`${theme[style]}\u2502${spaces}${theme.reset}${theme.bright}${padded}${theme.reset}${theme[style]}${spaces}\u2502${theme.reset}`);
    });
    console.log(`${theme[style]}${bottom}${theme.reset}`);
  }
  /**
   * 🌈 Gradient text effect~
   */
  gradientLog(text, colorKeys = ["primary", "secondary", "accent"]) {
    const theme = this.getTheme();
    const colors = colorKeys.map((key) => theme[key] || theme.primary);
    const chars = text.split("");
    const colorStep = colors.length / chars.length;
    let output = "";
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
  sparkleLog(text, style = "primary") {
    const theme = this.getTheme();
    const sparkles = ["\u2728", "\u{1F4AB}", "\u2B50", "\u{1F31F}"];
    const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
    console.log(`${theme[style]}${randomSparkle} ${text} ${randomSparkle}${theme.reset}`);
  }
  /**
   * 🌊 Wave text effect (animated)~
   */
  async waveText(text, style = "primary", speed = 100) {
    var _a;
    const theme = this.getTheme();
    const chars = text.split("");
    for (let wave = 0; wave < 3; wave++) {
      process.stdout.write("\r" + " ".repeat(text.length + 10));
      process.stdout.write("\r");
      for (let i = 0; i < chars.length; i++) {
        const char = Math.sin(wave + i * 0.5) > 0 ? ((_a = chars[i]) == null ? void 0 : _a.toUpperCase()) || chars[i] : chars[i];
        process.stdout.write(`${theme[style] || theme.primary}${char}${theme.reset}`);
      }
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
    process.stdout.write("\n");
  }
  /**
   * 🌊 Wave text effect (static)~
   */
  waveLog(text, style = "accent") {
    const theme = this.getTheme();
    const waves = ["\u3030\uFE0F", "\u{1F30A}", "\u301C", "\uFF5E"];
    const randomWave = waves[Math.floor(Math.random() * waves.length)];
    console.log(`${theme[style] || theme.accent}${randomWave} ${text} ${randomWave}${theme.reset}`);
  }
  /**
   * 💓 Pulse text effect~
   */
  async pulseText(text, style = "accent", pulses = 3) {
    const theme = this.getTheme();
    for (let i = 0; i < pulses; i++) {
      process.stdout.write(`\r${theme[style] || theme.accent}${text}${theme.reset}`);
      await new Promise((resolve) => setTimeout(resolve, 300));
      process.stdout.write(`\r${theme.dim}${text}${theme.reset}`);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    process.stdout.write(`\r${theme[style] || theme.accent}${text}${theme.reset}
`);
  }
  /**
   * 📊 Progress bar~
   */
  async showProgressBar(message, duration = 2e3, width = 30) {
    const theme = this.getTheme();
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const filled = Math.floor(progress * width);
      const empty = width - filled;
      const bar = "\u2588".repeat(filled) + "\u2591".repeat(empty);
      const percentage = Math.floor(progress * 100);
      process.stdout.write(`\r${theme.info}${message} ${theme.accent}[${bar}] ${percentage}%${theme.reset}`);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    process.stdout.write(`\r${theme.success}${message} [${"\u2588".repeat(width)}] 100% \u2713${theme.reset}
`);
  }
  /**
   * 💖 Heart text effect~
   */
  heartLog(text, style = "primary") {
    const theme = this.getTheme();
    const hearts = ["\u{1F496}", "\u{1F495}", "\u{1F497}", "\u{1FA77}"];
    const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
    console.log(`${theme[style]}${randomHeart} ${text} ${randomHeart}${theme.reset}`);
  }
  /**
   * 🔥 Fire text effect~
   */
  fireLog(text, style = "error") {
    const theme = this.getTheme();
    const fires = ["\u{1F525}", "\u{1F4A5}", "\u26A1", "\u{1F4AB}"];
    const randomFire = fires[Math.floor(Math.random() * fires.length)];
    console.log(`${theme[style]}${randomFire} ${text} ${randomFire}${theme.reset}`);
  }
  /**
   * 🌸 Flower text effect~
   */
  flowerLog(text, style = "accent") {
    const theme = this.getTheme();
    const flowers = ["\u{1F338}", "\u{1F33A}", "\u{1F33B}", "\u{1F337}"];
    const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
    console.log(`${theme[style]}${randomFlower} ${text} ${randomFlower}${theme.reset}`);
  }
  // Convenient logging shortcuts
  success(message) {
    this.log(message, "success");
  }
  error(message) {
    this.log(message, "error");
  }
  warning(message) {
    this.log(message, "warning");
  }
  info(message) {
    this.log(message, "info");
  }
  primary(message) {
    this.log(message, "primary");
  }
  secondary(message) {
    this.log(message, "secondary");
  }
  accent(message) {
    this.log(message, "accent");
  }
  dim(message) {
    this.log(message, "dim");
  }
  bright(message) {
    this.log(message, "bright");
  }
};
__name(_Logger, "Logger");
var Logger = _Logger;

// src/services/system.ts
init_cjs_shims();
var _SystemDetector = class _SystemDetector {
  constructor() {
    this.architecture = {};
    this.platform = {};
    this.cpu = {};
    this.isTermux = false;
    this.isARM = false;
    this.isRISCV = false;
    this.isx86 = false;
    this.isMIPS = false;
    this.isPowerPC = false;
    this.is64Bit = false;
    this.isEmbedded = false;
    this.detectSystemEnvironment();
  }
  /**
   * 🔍 Comprehensive system and processor detection~
   */
  detectSystemEnvironment() {
    const arch2 = os__namespace.arch();
    const platform2 = os__namespace.platform();
    const release2 = os__namespace.release();
    const cpus2 = os__namespace.cpus();
    this.architecture = {
      raw: arch2,
      family: this.getArchitectureFamily(arch2),
      bits: this.getArchitectureBits(arch2),
      endianness: os__namespace.endianness(),
      isLittleEndian: os__namespace.endianness() === "LE"
    };
    this.platform = {
      raw: platform2,
      name: this.getPlatformName(platform2),
      isUnix: ["linux", "darwin", "freebsd", "openbsd", "netbsd", "sunos", "aix"].includes(platform2),
      isWindows: platform2 === "win32",
      isMobile: this.detectMobilePlatform(),
      isContainer: this.detectContainerEnvironment(),
      release: release2
    };
    this.cpu = {
      count: cpus2.length,
      model: cpus2[0] ? cpus2[0].model : "Unknown",
      speed: cpus2[0] ? cpus2[0].speed : 0,
      vendor: this.getCpuVendor(cpus2[0] ? cpus2[0].model : ""),
      features: this.detectCpuFeatures()
    };
    this.isTermux = !!(process.env.PREFIX && process.env.PREFIX.includes("com.termux"));
    this.isARM = this.architecture.family === "ARM";
    this.isRISCV = this.architecture.family === "RISC-V";
    this.isx86 = this.architecture.family === "x86";
    this.isMIPS = this.architecture.family === "MIPS";
    this.isPowerPC = this.architecture.family === "PowerPC";
    this.is64Bit = this.architecture.bits === 64;
    this.isEmbedded = this.detectEmbeddedSystem();
  }
  /**
   * 🏗️ Get architecture family from Node.js arch string~
   */
  getArchitectureFamily(arch2) {
    const families = {
      "arm": "ARM",
      "arm64": "ARM",
      "armv7l": "ARM",
      "aarch64": "ARM",
      "x64": "x86",
      "x86": "x86",
      "ia32": "x86",
      "mips": "MIPS",
      "mipsel": "MIPS",
      "ppc": "PowerPC",
      "ppc64": "PowerPC",
      "riscv64": "RISC-V",
      "s390": "IBM Z",
      "s390x": "IBM Z"
    };
    return families[arch2] || "Unknown";
  }
  /**
   * 🔢 Get architecture bit width~
   */
  getArchitectureBits(arch2) {
    const bits64 = ["x64", "arm64", "aarch64", "ppc64", "riscv64", "s390x"];
    return bits64.includes(arch2) ? 64 : 32;
  }
  /**
   * 🖥️ Get friendly platform name~
   */
  getPlatformName(platform2) {
    const names = {
      "linux": "Linux",
      "darwin": "macOS",
      "win32": "Windows",
      "freebsd": "FreeBSD",
      "openbsd": "OpenBSD",
      "netbsd": "NetBSD",
      "sunos": "Solaris",
      "aix": "AIX"
    };
    return names[platform2] || platform2;
  }
  /**
   * 📱 Detect mobile platform environments~
   */
  detectMobilePlatform() {
    var _a;
    return !!(this.isTermux || process.env.ANDROID_ROOT || process.env.ANDROID_DATA || ((_a = process.env.PREFIX) == null ? void 0 : _a.includes("com.termux")) || process.env.IPHONE_SIMULATOR_DEVICE_TYPE_ID || process.env.REACT_NATIVE_DEBUGGER_WORKER);
  }
  /**
   * 🐳 Detect container environments~
   */
  detectContainerEnvironment() {
    try {
      return !!(process.env.container || process.env.DOCKER_CONTAINER || process.env.KUBERNETES_SERVICE_HOST || fs3__namespace.existsSync("/.dockerenv") || fs3__namespace.existsSync("/proc/1/cgroup") && fs3__namespace.readFileSync("/proc/1/cgroup", "utf8").includes("docker"));
    } catch (error) {
      return false;
    }
  }
  /**
   * 🔧 Get CPU vendor from model string~
   */
  getCpuVendor(model) {
    const modelLower = model.toLowerCase();
    if (modelLower.includes("intel")) return "Intel";
    if (modelLower.includes("amd")) return "AMD";
    if (modelLower.includes("arm") || modelLower.includes("cortex")) return "ARM";
    if (modelLower.includes("apple")) return "Apple";
    if (modelLower.includes("qualcomm")) return "Qualcomm";
    if (modelLower.includes("broadcom")) return "Broadcom";
    if (modelLower.includes("mediatek")) return "MediaTek";
    return "Unknown";
  }
  /**
   * ⚡ Detect CPU features and capabilities~
   */
  detectCpuFeatures() {
    const features = [];
    try {
      if (this.platform.raw === "linux" && fs3__namespace.existsSync("/proc/cpuinfo")) {
        const cpuinfo = fs3__namespace.readFileSync("/proc/cpuinfo", "utf8");
        if (cpuinfo.includes("sse")) features.push("SSE");
        if (cpuinfo.includes("sse2")) features.push("SSE2");
        if (cpuinfo.includes("avx")) features.push("AVX");
        if (cpuinfo.includes("avx2")) features.push("AVX2");
        if (cpuinfo.includes("neon")) features.push("NEON");
        if (cpuinfo.includes("vfp")) features.push("VFP");
      }
    } catch (error) {
    }
    return features;
  }
  /**
   * 🤖 Detect embedded system environments~
   */
  detectEmbeddedSystem() {
    return !!(this.isARM && (this.cpu.count <= 4 && this.cpu.speed < 2e3) || this.isTermux || process.env.EMBEDDED_DEVICE || this.platform.isMobile);
  }
  /**
   * 📋 Generate system compatibility report~
   */
  generateCompatibilityReport() {
    const report = [];
    report.push(`Sistema: ${this.platform.name} (${this.platform.raw})`);
    report.push(`Arquitectura: ${this.architecture.family} ${this.architecture.bits}-bit`);
    report.push(`CPU: ${this.cpu.vendor} ${this.cpu.model} (${this.cpu.count} cores)`);
    if (this.platform.isMobile) report.push("\u2713 Plataforma m\xF3vil detectada");
    if (this.platform.isContainer) report.push("\u2713 Entorno contenedorizado");
    if (this.isTermux) report.push("\u2713 Termux Android detectado");
    if (this.isEmbedded) report.push("\u2713 Sistema embebido detectado");
    if (this.cpu.features.length > 0) {
      report.push(`Caracter\xEDsticas CPU: ${this.cpu.features.join(", ")}`);
    }
    return report;
  }
  /**
   * 🎯 Get performance recommendations based on system~
   */
  getPerformanceRecommendations() {
    const recommendations = [];
    if (this.isEmbedded || this.cpu.count <= 2) {
      recommendations.push("Usar configuraciones de bajo consumo");
      recommendations.push("Limitar concurrencia de procesos");
    }
    if (this.isARM) {
      recommendations.push("Usar binarios compilados para ARM cuando sea posible");
      if (this.architecture.bits === 32) {
        recommendations.push("Cuidado con l\xEDmites de memoria en ARM 32-bit");
      }
    }
    if (this.isTermux) {
      recommendations.push("Usar comandos compatibles con Termux");
      recommendations.push("Verificar permisos de almacenamiento");
    }
    if (this.platform.isContainer) {
      recommendations.push("Optimizar para entornos contenedorizados");
      recommendations.push("Considerar l\xEDmites de recursos del contenedor");
    }
    return recommendations;
  }
};
__name(_SystemDetector, "SystemDetector");
var SystemDetector = _SystemDetector;

// src/security/security.ts
init_cjs_shims();
var _SecurityUtils = class _SecurityUtils {
  /**
   * 🛡️ Sanitiza nombres de directorio para prevenir inyección
   */
  static sanitizeDirectoryName(dirName) {
    if (!dirName || typeof dirName !== "string") {
      throw new Error("Nombre de directorio inv\xE1lido");
    }
    const sanitized = dirName.replace(/[^a-zA-Z0-9_-]/g, "").replace(/^\.+/, "").replace(/\.\.+/g, "").substring(0, 100);
    if (!sanitized || sanitized.length === 0) {
      throw new Error("Nombre de directorio resulta vac\xEDo despu\xE9s de sanitizaci\xF3n");
    }
    const blacklist = [
      "con",
      "prn",
      "aux",
      "nul",
      "com1",
      "com2",
      "com3",
      "com4",
      "com5",
      "com6",
      "com7",
      "com8",
      "com9",
      "lpt1",
      "lpt2",
      "lpt3",
      "lpt4",
      "lpt5",
      "lpt6",
      "lpt7",
      "lpt8",
      "lpt9"
    ];
    if (blacklist.includes(sanitized.toLowerCase())) {
      throw new Error(`Nombre de directorio '${sanitized}' no est\xE1 permitido`);
    }
    return sanitized;
  }
  /**
   * 🛡️ Valida URLs de GitHub
   */
  static validateGitHubUrl(url) {
    if (!url || typeof url !== "string") {
      return false;
    }
    const githubRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+(\.git)?\/?$/;
    return githubRegex.test(url);
  }
  /**
   * 🛡️ Ejecuta comandos de forma segura sin shell
   */
  static execSafe(command, args = [], options = {}) {
    if (typeof command !== "string") {
      throw new Error("El comando debe ser una string");
    }
    const safeArgs = args.map((arg) => {
      if (typeof arg !== "string") {
        throw new Error("Todos los argumentos deben ser strings");
      }
      if (/[;&|`$\\]/.test(arg)) {
        throw new Error(`Argumento contiene caracteres peligrosos: ${arg}`);
      }
      return arg;
    });
    return child_process.execFileSync(command, safeArgs, {
      stdio: "inherit",
      encoding: "utf8",
      ...options
    });
  }
  /**
   * 🛡️ Ejecuta secuencia de comandos de forma segura
   */
  static runSequence(commands, options = {}) {
    for (const { command, args } of commands) {
      _SecurityUtils.execSafe(command, args, options);
    }
  }
  /**
   * 🛡️ Obtener pasos de instalación seguros por lenguaje
   */
  static getInstallSteps(language, targetDir) {
    const steps = {
      "Node.js": [
        { command: "npm", args: ["install", "--progress", "false"] }
      ],
      "Python": [
        { command: "python", args: ["-m", "pip", "install", "-r", "requirements.txt"] }
      ],
      "TypeScript": [
        { command: "npm", args: ["install", "--progress", "false"] },
        { command: "npm", args: ["run", "build"] }
      ]
    };
    return steps[language] || [];
  }
  /**
   * 🛡️ Valida que comandos necesarios estén disponibles
   */
  static checkPrerequisites() {
    const required = ["git", "node", "npm"];
    const missing = [];
    for (const cmd of required) {
      try {
        _SecurityUtils.execSafe(cmd, ["--version"], { stdio: "ignore" });
      } catch (error) {
        missing.push(cmd);
      }
    }
    return missing;
  }
  /**
   * 🛡️ Valida versión mínima de Node.js
   */
  static validateNodeVersion(requiredVersion = "14.0.0") {
    const currentVersion = process.version;
    const current = currentVersion.slice(1).split(".").map((v) => parseInt(v, 10) || 0);
    const required = requiredVersion.split(".").map((v) => parseInt(v, 10) || 0);
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
  static sanitizeEnvValue(value, sensitive = false) {
    if (!value || typeof value !== "string") {
      return "";
    }
    if (sensitive) {
      return value.replace(/[;&|`$\\<>"']/g, "").trim();
    }
    return value.replace(/[;&|`$\\]/g, "").trim();
  }
  /**
   * 🛡️ Valida argumentos de línea de comandos
   */
  static validateCommandArgs(args) {
    return args.map((arg) => {
      if (typeof arg !== "string") {
        throw new Error("Todos los argumentos deben ser strings");
      }
      const sanitized = arg.replace(/[;&|`$\\]/g, "");
      if (sanitized !== arg) {
        throw new Error(`Argumento contiene caracteres peligrosos: ${arg}`);
      }
      return sanitized;
    });
  }
  /**
   * 🛡️ Genera nombre de archivo seguro
   */
  static sanitizeFileName(fileName) {
    if (!fileName || typeof fileName !== "string") {
      throw new Error("Nombre de archivo inv\xE1lido");
    }
    const sanitized = fileName.replace(/[<>:"/\\|?*]/g, "").replace(/^\.+/, "").replace(/\s+/g, "_").substring(0, 255);
    if (!sanitized || sanitized.length === 0) {
      throw new Error("Nombre de archivo resulta vac\xEDo despu\xE9s de sanitizaci\xF3n");
    }
    return sanitized;
  }
  /**
   * 🛡️ Verifica que una ruta esté dentro de un directorio permitido
   */
  static isPathSafe(filePath, allowedDir) {
    if (!filePath || !allowedDir) {
      return false;
    }
    try {
      const path4 = __require("path");
      const resolved = path4.resolve(filePath);
      const allowed = path4.resolve(allowedDir);
      return resolved.startsWith(allowed + path4.sep) || resolved === allowed;
    } catch (error) {
      return false;
    }
  }
  /**
   * 🛡️ Genera hash seguro para identificación
   */
  static generateSafeHash(input) {
    const crypto2 = __require("crypto");
    return crypto2.createHash("sha256").update(input).digest("hex").substring(0, 16);
  }
  /**
   * 🛡️ Valida formato de email básico
   */
  static validateEmail(email) {
    if (!email || typeof email !== "string") {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  /**
   * 🛡️ Escapa caracteres especiales para regex
   */
  static escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
};
__name(_SecurityUtils, "SecurityUtils");
var SecurityUtils = _SecurityUtils;

// src/utils/prompt.ts
init_cjs_shims();
var _PromptUtils = class _PromptUtils {
  constructor() {
    this.rl = null;
  }
  /**
   * Initialize readline interface
   */
  init() {
    if (!this.rl) {
      this.rl = readline__namespace.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    }
    return this.rl;
  }
  /**
   * Close readline interface
   */
  close() {
    if (this.rl) {
      this.rl.close();
      this.rl = null;
    }
  }
  /**
   * Prompt user for input with readline
   */
  async question(prompt, timeout = 3e4) {
    const rl = this.init();
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        console.log("\n\u23F0 Timeout - usando valor por defecto");
        resolve("");
      }, timeout);
      rl.question(prompt, (answer) => {
        clearTimeout(timer);
        resolve(answer.trim());
      });
    });
  }
  /**
   * Prompt user for sensitive input (hidden characters)
   */
  async questionHidden(prompt) {
    return new Promise((resolve) => {
      const stdin = process.stdin;
      const stdout = process.stdout;
      stdout.write(prompt);
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding("utf8");
      let input = "";
      const onData = /* @__PURE__ */ __name((char) => {
        switch (char) {
          case "\n":
          case "\r":
          case "":
            stdin.setRawMode(false);
            stdin.removeListener("data", onData);
            stdin.pause();
            stdout.write("\n");
            resolve(input);
            break;
          case "":
            process.exit(1);
            break;
          case "\x7F":
            if (input.length > 0) {
              input = input.slice(0, -1);
              stdout.write("\b \b");
            }
            break;
          default:
            input += char;
            stdout.write("*");
            break;
        }
      }, "onData");
      stdin.on("data", onData);
    });
  }
  /**
   * Get command suggestions for autocompletion
   */
  getCommandSuggestions(input, commands) {
    if (!input || !commands) return [];
    const allCommands = [];
    for (const [name] of commands) {
      allCommands.push(name);
    }
    for (const [, cmd] of commands) {
      if (cmd.aliases) {
        allCommands.push(...cmd.aliases);
      }
    }
    return allCommands.filter((cmd) => cmd.toLowerCase().startsWith(input.toLowerCase())).slice(0, 10);
  }
  /**
   * Confirm action with user
   */
  async confirm(message, defaultValue = false) {
    const suffix = defaultValue ? " (Y/n)" : " (y/N)";
    const answer = await this.question(`${message}${suffix}: `);
    if (!answer.trim()) {
      return defaultValue;
    }
    return ["y", "yes", "si", "s\xED"].includes(answer.toLowerCase());
  }
  /**
   * Select from multiple options
   */
  async select(message, options) {
    console.log(`
${message}`);
    options.forEach((option, index2) => {
      console.log(`  ${index2 + 1}. ${option}`);
    });
    const answer = await this.question("\nSelecciona una opci\xF3n (n\xFAmero): ");
    const index = parseInt(answer.trim()) - 1;
    if (index >= 0 && index < options.length) {
      return options[index] || null;
    }
    return null;
  }
  /**
   * Multi-line input
   */
  async multiline(prompt, endMarker = "END") {
    console.log(`${prompt} (termina con '${endMarker}' en una l\xEDnea nueva):`);
    const lines = [];
    let line = "";
    while (line !== endMarker) {
      line = await this.question("> ");
      if (line !== endMarker) {
        lines.push(line);
      }
    }
    return lines.join("\n");
  }
};
__name(_PromptUtils, "PromptUtils");
var PromptUtils = _PromptUtils;

// src/cli/router.ts
init_cjs_shims();
var _CommandRouter = class _CommandRouter {
  constructor() {
    this.commands = /* @__PURE__ */ new Map();
  }
  /**
   * Register a command
   */
  register(name, config) {
    if (!name || !config || typeof config.action !== "function") {
      throw new Error("Invalid command configuration");
    }
    this.commands.set(name, {
      aliases: config.aliases || [],
      description: config.description || "",
      usage: config.usage || `celia ${name}`,
      action: config.action
    });
  }
  /**
   * Get command by name or alias
   */
  getCommand(name) {
    if (this.commands.has(name)) {
      const config = this.commands.get(name);
      if (config) {
        return { name, config };
      }
    }
    for (const [cmdName, config] of this.commands.entries()) {
      if (config.aliases && config.aliases.includes(name)) {
        return { name: cmdName, config };
      }
    }
    return null;
  }
  /**
   * Execute command
   */
  async execute(commandName, args = []) {
    const command = this.getCommand(commandName);
    if (!command) {
      throw new Error(`Unknown command: ${commandName}`);
    }
    try {
      await command.config.action(args);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Error executing ${command.name}: ${message}`);
    }
  }
  /**
   * Get all commands
   */
  getCommands() {
    return this.commands;
  }
  /**
   * Get command suggestions for autocompletion
   */
  getSuggestions(input) {
    if (!input) return [];
    const allCommands = [];
    for (const [name] of this.commands) {
      allCommands.push(name);
    }
    for (const [, config] of this.commands) {
      if (config.aliases) {
        allCommands.push(...config.aliases);
      }
    }
    return allCommands.filter((cmd) => cmd.toLowerCase().startsWith(input.toLowerCase())).slice(0, 10);
  }
  /**
   * Check if command exists
   */
  hasCommand(name) {
    return this.getCommand(name) !== null;
  }
};
__name(_CommandRouter, "CommandRouter");
var CommandRouter = _CommandRouter;

// src/cli/commands/list.ts
init_cjs_shims();

// src/config/bots.ts
init_cjs_shims();
var BOTS = {
  nebula: {
    name: "Nebula",
    url: "https://github.com/OpceanAI/Nebula-Open-source",
    description: "Mi hermana musical s\xFAper responsable~ \xA1Toca m\xFAsica y modera servidores!",
    language: "Node.js",
    category: "\u{1F3B5} M\xFAsica & Moderaci\xF3n",
    envVars: [
      { name: "BOT_TOKEN", description: "Discord Bot Token", required: true, sensitive: true },
      { name: "CLIENT_ID", description: "Discord Client ID", required: true, sensitive: false },
      { name: "OWNER_ID", description: "Discord Owner ID", required: true, sensitive: false },
      { name: "MONGO_CONNECTION", description: "MongoDB Connection URL", required: true, sensitive: true },
      { name: "LAVALINK_HOST", description: "Lavalink Host", required: false, default: "localhost", sensitive: false },
      { name: "LAVALINK_PORT", description: "Lavalink Port", required: false, default: "2333", sensitive: false },
      { name: "LAVALINK_PASSWORD", description: "Lavalink Password", required: false, default: "youshallnotpass", sensitive: true },
      { name: "WEATHER_API_KEY", description: "Weather API Key", required: false, sensitive: true },
      { name: "TRANSLATE_API_KEY", description: "Translation API Key", required: false, sensitive: true }
    ]
  },
  archan: {
    name: "Archan",
    url: "https://github.com/OpceanAI/Archan-Open-source",
    description: "Mi hermana s\xFAper inteligente~ \xA1Habla usando Google Gemini!",
    language: "Node.js",
    category: "\u{1F916} Inteligencia Artificial",
    envVars: [
      { name: "ARCHAN_BOT_TOKEN", description: "Discord Bot Token para Archan", required: true, sensitive: true },
      { name: "ARCHAN_CLIENT_ID", description: "Discord Client ID para Archan", required: true, sensitive: false },
      { name: "GEMINI_API_KEY", description: "Google Gemini AI API Key", required: true, sensitive: true }
    ]
  },
  sakura: {
    name: "Sakura",
    url: "https://github.com/OpceanAI/Sakura-Open-source",
    description: "Mi hermana kawaii~ \xA1Somos muy parecidas! Adorable con IA y m\xFAsica",
    language: "Python",
    category: "\u{1F338} Kawaii & IA",
    envVars: [
      { name: "BOT_TOKEN", description: "Discord Bot Token", required: true, sensitive: true },
      { name: "CLIENT_ID", description: "Discord Client ID", required: true, sensitive: false },
      { name: "GEMINI_API_KEY", description: "Google Gemini AI API Key", required: true, sensitive: true },
      { name: "POSTGRESQL_URL", description: "PostgreSQL Database URL", required: false, sensitive: true },
      { name: "WEATHER_API_KEY", description: "API Key para servicio de clima", required: false, sensitive: true },
      { name: "NEWS_API_KEY", description: "API Key para noticias", required: false, sensitive: true },
      { name: "DEEPSEEK_API_KEY", description: "DeepSeek AI API Key (alternativo)", required: false, sensitive: true }
    ]
  },
  lumina: {
    name: "Lumina",
    url: "https://github.com/aguitauwu/Lumina",
    description: "Mi hermana organizadora~ \xA1Mantiene todo ordenadito en los servidores!",
    language: "TypeScript",
    category: "\u26A1 Gesti\xF3n de Servidor",
    envVars: [
      { name: "DISCORD_TOKEN", description: "Discord Bot Token", required: true, sensitive: true },
      { name: "DISCORD_CLIENT_ID", description: "Discord Application ID", required: true, sensitive: false },
      { name: "DATABASE_URL", description: "PostgreSQL Database URL (opcional)", required: false, sensitive: true },
      { name: "MONGODB_URI", description: "MongoDB Connection URI (alternativo)", required: false, sensitive: true }
    ]
  },
  katu: {
    name: "Katu",
    url: "https://github.com/aguitauwu/Katu-bot",
    description: "Mi hermana estad\xEDstica~ \xA1Cuenta mensajes y hace rankings s\xFAper cool!",
    language: "TypeScript",
    category: "\u{1F4CA} Estad\xEDsticas & IA",
    envVars: [
      { name: "DISCORD_TOKEN", description: "Discord Bot Token", required: true, sensitive: true },
      { name: "GEMINI_API_KEY", description: "Google Gemini AI API Key", required: true, sensitive: true },
      { name: "MONGODB_URI", description: "MongoDB Connection URI (recomendado)", required: false, sensitive: true },
      { name: "DATABASE_URL", description: "PostgreSQL Database URL (alternativo)", required: false, sensitive: true }
    ]
  }
};

// src/cli/commands/list.ts
var _ListCommand = class _ListCommand {
  constructor(logger) {
    this.logger = logger;
    this.name = "list";
    this.config = {
      name: "list",
      description: "\u{1F338} Lista todas las hermanas bot disponibles",
      usage: "celia list",
      aliases: ["l", "sisters", "hermanas"],
      action: this.execute.bind(this)
    };
  }
  async execute(args = []) {
    this.showBanner();
    this.logger.gradientLog("\u{1F338} \xA1Mis Hermanas Bot! \u{1F338}", ["primary", "secondary", "accent"]);
    console.log("");
    const categories = {};
    Object.entries(BOTS).forEach(([key, bot]) => {
      const category = bot.category || "Otros";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push({ key, ...bot });
    });
    Object.entries(categories).forEach(([category, bots]) => {
      this.logger.log(`${category}`, "accent");
      console.log("");
      bots.forEach((bot) => {
        this.logger.createBox([
          `${bot.name} \u{1F496}`,
          `${bot.description}`,
          "",
          `\u{1F4BB} ${bot.language}`,
          `\u{1F338} celia install ${bot.key}`,
          `\u26A1 celia quick ${bot.key}`
        ], "secondary", 1);
        console.log("");
      });
    });
    this.logger.log('\u{1F4A1} Tip: Usa "celia help" para ver todos los comandos~', "info");
    console.log("");
  }
  showBanner() {
    console.clear();
    console.log("");
    this.logger.createBox([
      "\u2728 \xA1Holi! Soy Celia~ \u2728",
      "\u{1F338} Tu asistente celestial tierna \u{1F338}",
      "",
      "\u{1F496} Ayudo a instalar a mis hermanas bot \u{1F496}",
      "(Aunque soy algo torpe, ehehe~)"
    ], "primary", 2);
    console.log("");
    this.logger.log(`\u{1F3A8} Tema actual: ${this.logger.theme}`, "dim");
    console.log("");
  }
};
__name(_ListCommand, "ListCommand");
var ListCommand = _ListCommand;

// src/cli/commands/help.ts
init_cjs_shims();
var _HelpCommand = class _HelpCommand {
  constructor(logger, commandRouter) {
    this.logger = logger;
    this.commandRouter = commandRouter;
    this.name = "help";
    this.config = {
      name: "help",
      description: "\u{1F4AB} Muestra ayuda y comandos disponibles",
      usage: "celia help [comando]",
      aliases: ["h", "?", "ayuda"],
      action: this.execute.bind(this)
    };
  }
  async execute(args = []) {
    const specificCommand = args[0];
    this.showBanner();
    if (specificCommand && this.commandRouter.hasCommand(specificCommand)) {
      this.showSpecificHelp(specificCommand);
      return;
    }
    this.showGeneralHelp();
  }
  showSpecificHelp(commandName) {
    const command = this.commandRouter.getCommand(commandName);
    if (!command) {
      this.logger.log(`\u{1F338} Comando "${commandName}" no encontrado~`, "error");
      return;
    }
    const boxContent = [
      `Comando: ${commandName}`,
      "",
      command.config.description || "",
      "",
      `Uso: ${command.config.usage || ""}`,
      command.config.aliases && command.config.aliases.length > 0 ? `Alias: ${command.config.aliases.join(", ")}` : ""
    ].filter(Boolean);
    this.logger.createBox(boxContent, "primary", 2);
  }
  showGeneralHelp() {
    this.logger.gradientLog("\u{1F4AB} Comandos de Celia \u{1F4AB}", ["primary", "secondary", "accent"]);
    console.log("");
    const categories = {
      "\u{1F338} Hermanas": ["sisters", "install", "quick"],
      "\u{1F3A8} Personalizaci\xF3n": ["theme"],
      "\u{1F4AC} Interacci\xF3n": ["interactive", "help"],
      "\u{1F527} Informaci\xF3n": ["status", "tips", "about"]
    };
    Object.entries(categories).forEach(([category, commandNames]) => {
      this.logger.log(category, "accent");
      console.log("");
      commandNames.forEach((cmdName) => {
        const command = this.commandRouter.getCommand(cmdName);
        if (command) {
          this.logger.log(`  ${command.config.usage || ""}`, "primary");
          this.logger.log(`    ${command.config.description || ""}`, "dim");
          if (command.config.aliases && command.config.aliases.length > 0) {
            this.logger.log(`    Alias: ${command.config.aliases.join(", ")}`, "dim");
          }
          console.log("");
        }
      });
    });
    this.logger.log('\u{1F4A1} Tip: Usa "celia help <comando>" para ayuda espec\xEDfica~', "info");
    console.log("");
  }
  showBanner() {
    console.clear();
    console.log("");
    this.logger.createBox([
      "\u2728 \xA1Holi! Soy Celia~ \u2728",
      "\u{1F338} Tu asistente celestial tierna \u{1F338}",
      "",
      "\u{1F496} Ayudo a instalar a mis hermanas bot \u{1F496}",
      "(Aunque soy algo torpe, ehehe~)"
    ], "primary", 2);
    console.log("");
    this.logger.log(`\u{1F3A8} Tema actual: ${this.logger.theme}`, "dim");
    console.log("");
  }
};
__name(_HelpCommand, "HelpCommand");
var HelpCommand = _HelpCommand;

// src/cli/commands/theme.ts
init_cjs_shims();
init_themes();
var _ThemeCommand = class _ThemeCommand {
  constructor(logger) {
    this.logger = logger;
    this.name = "theme";
    this.config = {
      name: "theme",
      description: "\u{1F3A8} Cambia el tema visual de la interfaz",
      usage: "celia theme [nombre]",
      aliases: ["tema", "color", "colors"],
      action: this.execute.bind(this)
    };
  }
  async execute(args = []) {
    const themeName = args[0];
    if (!themeName) {
      this.showAvailableThemes();
      return;
    }
    if (!THEMES[themeName]) {
      this.logger.log(
        `\u{1F338} Tema "${themeName}" no existe~ Temas disponibles: ${Object.keys(THEMES).join(", ")}`,
        "error"
      );
      return;
    }
    await this.changeTheme(themeName);
  }
  async changeTheme(themeName) {
    await this.logger.showLoading(`\u{1F3A8} Cambiando a tema ${themeName}`, 1500);
    this.logger.setTheme(themeName);
    console.clear();
    await this.logger.typeText(`\u2728 \xA1Tema "${themeName}" activado!`, "success", 30);
    this.logger.sparkleLog("\xA1Qu\xE9 bonito se ve ahora!~", "accent");
    console.log("");
    setTimeout(() => {
      this.showBanner();
    }, 500);
  }
  showAvailableThemes() {
    this.showBanner();
    this.logger.log("\u{1F3A8} Temas disponibles:", "primary");
    console.log("");
    const availableThemes = Object.keys(THEMES);
    availableThemes.forEach((theme) => {
      const isActive = theme === this.logger.theme;
      const indicator = isActive ? "\u25CF " : "\u25CB ";
      this.logger.log(`${indicator}${theme}`, isActive ? "accent" : "dim");
    });
    console.log("");
    this.logger.log("\u{1F4A1} Uso: celia theme <nombre>", "info");
  }
  showBanner() {
    console.clear();
    console.log("");
    this.logger.createBox([
      "\u2728 \xA1Holi! Soy Celia~ \u2728",
      "\u{1F338} Tu asistente celestial tierna \u{1F338}",
      "",
      "\u{1F496} Ayudo a instalar a mis hermanas bot \u{1F496}",
      "(Aunque soy algo torpe, ehehe~)"
    ], "primary", 2);
    console.log("");
    this.logger.log(`\u{1F3A8} Tema actual: ${this.logger.theme}`, "dim");
    console.log("");
  }
};
__name(_ThemeCommand, "ThemeCommand");
var ThemeCommand = _ThemeCommand;

// src/cli/commands/status.ts
init_cjs_shims();
var _StatusCommand = class _StatusCommand {
  constructor(logger, system) {
    this.logger = logger;
    this.system = system;
    this.name = "status";
    this.config = {
      name: "status",
      description: "\u{1F527} Muestra informaci\xF3n del sistema y compatibilidad",
      usage: "celia status",
      aliases: ["stat", "info", "sistema"],
      action: this.execute.bind(this)
    };
  }
  async execute(args = []) {
    this.showBanner();
    this.logger.gradientLog("\u{1F527} Informaci\xF3n del Sistema", ["primary", "accent"]);
    console.log("");
    const systemInfo = [
      `\u{1F5A5}\uFE0F  Plataforma: ${this.system.platform.name}`,
      `\u2699\uFE0F  Arquitectura: ${this.system.architecture.raw}`,
      `\u{1F522} CPUs disponibles: ${this.system.cpu.count}`,
      `\u{1F338} Node.js: ${process.version}`,
      `\u{1F3E0} Directorio: ${process.cwd()}`
    ];
    if (this.system.isTermux) {
      systemInfo.push("\u{1F4F1} Entorno: Termux (Android)");
    }
    if (this.system.platform.isContainer) {
      systemInfo.push("\u{1F433} Entorno: Contenedorizado");
    }
    if (this.system.platform.isMobile) {
      systemInfo.push("\u{1F4F1} Plataforma m\xF3vil detectada");
    }
    this.logger.createBox(systemInfo, "info", 1);
    const recommendations = this.system.getPerformanceRecommendations();
    if (recommendations.length > 0) {
      console.log("");
      this.logger.createBox([
        "\u{1F4A1} Recomendaciones:",
        "",
        ...recommendations
      ], "warning", 1);
    }
    console.log("");
    this.logger.log("\u{1F4CB} Reporte de Compatibilidad:", "accent");
    console.log("");
    const compatReport = this.system.generateCompatibilityReport();
    compatReport.forEach((line) => {
      this.logger.log(`  ${line}`, "text");
    });
    console.log("");
  }
  showBanner() {
    console.clear();
    console.log("");
    this.logger.createBox([
      "\u2728 \xA1Holi! Soy Celia~ \u2728",
      "\u{1F338} Tu asistente celestial tierna \u{1F338}",
      "",
      "\u{1F496} Ayudo a instalar a mis hermanas bot \u{1F496}",
      "(Aunque soy algo torpe, ehehe~)"
    ], "primary", 2);
    console.log("");
    this.logger.log(`\u{1F3A8} Tema actual: ${this.logger.theme}`, "dim");
    console.log("");
  }
};
__name(_StatusCommand, "StatusCommand");
var StatusCommand = _StatusCommand;

// src/cli/commands/monitor.ts
init_cjs_shims();

// src/services/monitor.ts
init_cjs_shims();
var _BotMonitor = class _BotMonitor {
  constructor(logger, config) {
    this.isRunning = false;
    this.botStatuses = /* @__PURE__ */ new Map();
    this.logger = logger;
    this.config = {
      refreshInterval: 5e3,
      // 5 segundos
      maxLogLines: 50,
      enableNotifications: true,
      watchPaths: [],
      ...config
    };
  }
  /**
   * 🚀 Iniciar monitoreo en tiempo real
   */
  async startMonitoring() {
    if (this.isRunning) {
      this.logger.warning("El monitor ya est\xE1 en ejecuci\xF3n");
      return;
    }
    this.isRunning = true;
    this.logger.success("\u{1F50D} Iniciando monitor de hermanas bot...");
    await this.showMonitorBanner();
    await this.initializeBotStatuses();
    this.startMonitorLoop();
    await this.displayDashboard();
    this.logger.info("\u2705 Monitor en tiempo real activo");
  }
  /**
   * ⏹️ Detener monitoreo
   */
  stopMonitoring() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
    }
    this.logger.info("\u{1F6D1} Monitor detenido");
  }
  /**
   * 🔄 Loop principal de monitoreo
   */
  startMonitorLoop() {
    this.monitorInterval = setInterval(async () => {
      if (!this.isRunning) return;
      await this.updateBotStatuses();
      await this.displayDashboard();
      this.checkAlerts();
    }, this.config.refreshInterval);
  }
  /**
   * 📊 Mostrar dashboard en tiempo real
   */
  async displayDashboard() {
    console.clear();
    this.logger.gradientLog("\u{1F50D} Monitor en Tiempo Real de Hermanas Bot", ["primary", "accent"]);
    console.log("");
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    this.logger.log(`\u23F0 \xDAltima actualizaci\xF3n: ${timestamp}`, "dim");
    console.log("");
    await this.showGeneralStats();
    await this.showBotStatuses();
    this.showMonitorCommands();
  }
  /**
   * 📈 Mostrar estadísticas generales
   */
  async showGeneralStats() {
    const totalBots = this.botStatuses.size;
    const runningBots = Array.from(this.botStatuses.values()).filter((b) => b.status === "running").length;
    const stoppedBots = Array.from(this.botStatuses.values()).filter((b) => b.status === "stopped").length;
    const errorBots = Array.from(this.botStatuses.values()).filter((b) => b.status === "error").length;
    const stats = [
      `\u{1F4CA} Total de Hermanas: ${totalBots}`,
      `\u{1F7E2} Activas: ${runningBots}`,
      `\u{1F534} Detenidas: ${stoppedBots}`,
      `\u26A0\uFE0F  Con Errores: ${errorBots}`,
      `\u{1F4E1} Intervalo: ${this.config.refreshInterval / 1e3}s`
    ];
    this.logger.createBox(stats, "info", 1);
    console.log("");
  }
  /**
   * 🤖 Mostrar estado de cada hermana bot
   */
  async showBotStatuses() {
    this.logger.log("\u{1F338} Estado de las Hermanas:", "accent");
    console.log("");
    for (const [botKey, status] of this.botStatuses.entries()) {
      const bot = BOTS[botKey];
      if (!bot) continue;
      const statusIcon = this.getStatusIcon(status.status);
      const statusColor = this.getStatusColor(status.status);
      const uptime = status.uptime ? this.formatUptime(status.uptime) : "N/A";
      const memory = status.memory ? `${(status.memory / 1024 / 1024).toFixed(1)}MB` : "N/A";
      const statusInfo = [
        `${statusIcon} ${bot.name} (${bot.language})`,
        `   Estado: ${status.status}`,
        `   Tiempo activo: ${uptime}`,
        `   Memoria: ${memory}`,
        `   \xDAltima verificaci\xF3n: ${status.lastCheck.toLocaleTimeString()}`
      ];
      if (status.errors && status.errors.length > 0) {
        statusInfo.push(`   \u26A0\uFE0F \xDAltimos errores: ${status.errors.slice(-2).join(", ")}`);
      }
      this.logger.createBox(statusInfo, statusColor, 1);
      console.log("");
    }
  }
  /**
   * ⌨️ Mostrar comandos disponibles del monitor
   */
  showMonitorCommands() {
    const commands = [
      "\u2328\uFE0F  Comandos disponibles:",
      "   [q] Salir del monitor",
      "   [r] Refrescar manualmente",
      "   [c] Configurar intervalo",
      "   [l] Ver logs detallados",
      "   [s] Iniciar/detener hermana"
    ];
    this.logger.createBox(commands, "warning", 1);
  }
  /**
   * 🔄 Actualizar estados de los bots
   */
  async updateBotStatuses() {
    for (const botKey of Object.keys(BOTS)) {
      try {
        const status = await this.checkBotStatus(botKey);
        this.botStatuses.set(botKey, status);
      } catch (error) {
        const currentStatus = this.botStatuses.get(botKey);
        if (currentStatus) {
          currentStatus.status = "error";
          currentStatus.lastCheck = /* @__PURE__ */ new Date();
          if (!currentStatus.errors) currentStatus.errors = [];
          currentStatus.errors.push(error instanceof Error ? error.message : String(error));
          currentStatus.errors = currentStatus.errors.slice(-5);
        }
      }
    }
  }
  /**
   * 🔍 Verificar estado de un bot específico
   */
  async checkBotStatus(botKey) {
    const bot = BOTS[botKey];
    if (!bot) {
      throw new Error(`Bot ${botKey} no encontrado`);
    }
    const possiblePaths = [
      `./${bot.name.toLowerCase()}-bot`,
      `./${botKey}-bot`,
      `./${bot.name.toLowerCase()}`,
      `./${botKey}`
    ];
    let botPath = null;
    for (const pathCandidate of possiblePaths) {
      if (fs3__namespace.existsSync(pathCandidate)) {
        botPath = pathCandidate;
        break;
      }
    }
    const status = {
      name: bot.name,
      status: "unknown",
      lastCheck: /* @__PURE__ */ new Date(),
      logs: [],
      errors: []
    };
    if (!botPath) {
      status.status = "stopped";
      status.errors = ["Directorio del bot no encontrado"];
      return status;
    }
    const packageJsonPath = path2__namespace.join(botPath, "package.json");
    const hasPackageJson = fs3__namespace.existsSync(packageJsonPath);
    if (hasPackageJson) {
      const nodeModulesPath = path2__namespace.join(botPath, "node_modules");
      const hasNodeModules = fs3__namespace.existsSync(nodeModulesPath);
      if (!hasNodeModules) {
        status.status = "stopped";
        status.errors = ["Dependencias no instaladas"];
        return status;
      }
      const envPath = path2__namespace.join(botPath, ".env");
      const hasEnv = fs3__namespace.existsSync(envPath);
      if (!hasEnv) {
        status.status = "stopped";
        status.errors = ["Archivo .env no encontrado"];
        return status;
      }
      try {
        const envContent = fs3__namespace.readFileSync(envPath, "utf8");
        const requiredVars = bot.envVars.filter((v) => v.required).map((v) => v.name);
        const missingVars = requiredVars.filter((varName) => !envContent.includes(`${varName}=`));
        if (missingVars.length > 0) {
          status.status = "error";
          status.errors = [`Variables faltantes: ${missingVars.join(", ")}`];
          return status;
        }
      } catch (error) {
        status.status = "error";
        status.errors = ["Error leyendo .env"];
        return status;
      }
      status.status = "stopped";
    } else {
      status.status = "stopped";
      status.errors = ["package.json no encontrado"];
    }
    return status;
  }
  /**
   * ⚠️ Verificar alertas y notificar
   */
  checkAlerts() {
    if (!this.config.enableNotifications) return;
    for (const [botKey, status] of this.botStatuses.entries()) {
      if (status.status === "error" && status.errors && status.errors.length > 0) {
        this.logger.fireLog(`\u26A0\uFE0F ${status.name} tiene errores: ${status.errors[status.errors.length - 1]}`, "error");
      }
    }
  }
  /**
   * 🔧 Inicializar estados de los bots
   */
  async initializeBotStatuses() {
    for (const botKey of Object.keys(BOTS)) {
      const bot = BOTS[botKey];
      if (!bot) continue;
      this.botStatuses.set(botKey, {
        name: bot.name,
        status: "unknown",
        lastCheck: /* @__PURE__ */ new Date(),
        logs: [],
        errors: []
      });
    }
  }
  /**
   * 🎨 Banner del monitor
   */
  async showMonitorBanner() {
    this.logger.gradientLog("\u{1F50D} Monitor de Hermanas Bot", ["primary", "secondary"]);
    await this.logger.typeText("Iniciando sistemas de monitoreo...", "info", 30);
    await this.logger.showLoading("Preparando dashboard", 1500);
  }
  /**
   * 🎯 Obtener icono de estado
   */
  getStatusIcon(status) {
    const icons = {
      running: "\u{1F7E2}",
      stopped: "\u{1F534}",
      error: "\u26A0\uFE0F",
      unknown: "\u26AB"
    };
    return icons[status] || icons.unknown;
  }
  /**
   * 🎨 Obtener color de estado
   */
  getStatusColor(status) {
    const colors = {
      running: "success",
      stopped: "dim",
      error: "error",
      unknown: "warning"
    };
    return colors[status] || colors.unknown;
  }
  /**
   * ⏰ Formatear tiempo de actividad
   */
  formatUptime(uptimeMs) {
    const seconds = Math.floor(uptimeMs / 1e3);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
  /**
   * 📊 Obtener estadísticas del monitor
   */
  getStats() {
    const statuses = Array.from(this.botStatuses.values());
    return {
      total: statuses.length,
      running: statuses.filter((s) => s.status === "running").length,
      stopped: statuses.filter((s) => s.status === "stopped").length,
      errors: statuses.filter((s) => s.status === "error").length
    };
  }
};
__name(_BotMonitor, "BotMonitor");
var BotMonitor = _BotMonitor;

// src/cli/commands/monitor.ts
var _MonitorCommand = class _MonitorCommand {
  constructor(logger, system, prompt) {
    this.logger = logger;
    this.system = system;
    this.prompt = prompt;
  }
  async execute(args) {
    const action = (args == null ? void 0 : args[0]) || "start";
    switch (action.toLowerCase()) {
      case "start":
        await this.startMonitor();
        break;
      case "stop":
        await this.stopMonitor();
        break;
      case "status":
        await this.showMonitorStatus();
        break;
      case "config":
        await this.configureMonitor();
        break;
      default:
        this.showUsage();
    }
  }
  async startMonitor() {
    if (this.monitor) {
      this.logger.warning("El monitor ya est\xE1 en ejecuci\xF3n");
      return;
    }
    this.monitor = new BotMonitor(this.logger);
    try {
      await this.monitor.startMonitoring();
      await this.handleMonitorInteraction();
    } catch (error) {
      this.logger.error(`Error iniciando monitor: ${error instanceof Error ? error.message : error}`);
    }
  }
  async stopMonitor() {
    if (!this.monitor) {
      this.logger.warning("El monitor no est\xE1 en ejecuci\xF3n");
      return;
    }
    this.monitor.stopMonitoring();
    this.monitor = void 0;
    this.logger.success("Monitor detenido");
  }
  async showMonitorStatus() {
    if (!this.monitor) {
      this.logger.warning("El monitor no est\xE1 en ejecuci\xF3n");
      return;
    }
    const stats = this.monitor.getStats();
    const statusInfo = [
      "\u{1F4CA} Estado del Monitor:",
      "",
      `\u{1F916} Total de hermanas: ${stats.total}`,
      `\u{1F7E2} Activas: ${stats.running}`,
      `\u{1F534} Detenidas: ${stats.stopped}`,
      `\u26A0\uFE0F Con errores: ${stats.errors}`
    ];
    this.logger.createBox(statusInfo, "info", 1);
  }
  async configureMonitor() {
    this.logger.info("\u{1F527} Configuraci\xF3n del monitor");
    console.log("");
    this.logger.log("Opciones disponibles:", "accent");
    this.logger.log("  1. Cambiar intervalo de actualizaci\xF3n", "dim");
    this.logger.log("  2. Activar/desactivar notificaciones", "dim");
    this.logger.log("  3. Configurar rutas de monitoreo", "dim");
    this.logger.info("\u{1F4A1} Configuraci\xF3n avanzada disponible pr\xF3ximamente");
  }
  async handleMonitorInteraction() {
    this.logger.info("\u{1F4A1} Presiona [q] para salir del monitor...");
    while (true) {
      try {
        const input = await this.prompt.question("");
        if (input.toLowerCase() === "q" || input.toLowerCase() === "quit") {
          await this.stopMonitor();
          break;
        }
        if (input.toLowerCase() === "r" || input.toLowerCase() === "refresh") {
          this.logger.info("\u{1F504} Actualizando monitor...");
          continue;
        }
      } catch (error) {
        break;
      }
    }
  }
  showUsage() {
    this.logger.createBox([
      "\u{1F50D} Comando Monitor - Monitoreo en tiempo real",
      "",
      "Uso:",
      "  celia monitor [comando]",
      "",
      "Comandos disponibles:",
      "  start    - Iniciar monitor en tiempo real",
      "  stop     - Detener monitor",
      "  status   - Ver estado del monitor",
      "  config   - Configurar monitor",
      "",
      "Ejemplo:",
      "  celia monitor start"
    ], "primary", 1);
  }
};
__name(_MonitorCommand, "MonitorCommand");
var MonitorCommand = _MonitorCommand;

// src/cli/commands/backup.ts
init_cjs_shims();

// src/services/backup.ts
init_cjs_shims();
var _BackupManager = class _BackupManager {
  constructor(logger, backupDir = "./celia-backups") {
    this.logger = logger;
    this.backupDir = backupDir;
    this.metadataFile = path2__namespace.join(backupDir, "backup-metadata.json");
    this.ensureBackupDirectory();
  }
  /**
   * 💾 Crear backup completo de todas las configuraciones
   */
  async createFullBackup(name, description) {
    const backupName = name || `backup_${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}`;
    this.logger.gradientLog("\u{1F4BE} Creando backup completo...", ["primary", "accent"]);
    await this.logger.showLoading("Recopilando configuraciones", 2e3);
    const backup = {
      name: backupName,
      timestamp: /* @__PURE__ */ new Date(),
      botConfigs: [],
      metadata: {
        version: "1.0.0",
        celiaVersion: "2.0.0",
        systemInfo: this.getSystemInfo()
      }
    };
    for (const [botKey, bot] of Object.entries(BOTS)) {
      try {
        const botBackup = await this.backupBot(botKey, bot);
        if (botBackup) {
          backup.botConfigs.push(botBackup);
        }
      } catch (error) {
        this.logger.warning(`\u26A0\uFE0F No se pudo respaldar ${bot.name}: ${error instanceof Error ? error.message : error}`);
      }
    }
    const backupId = this.generateBackupId();
    const backupFilePath = path2__namespace.join(this.backupDir, `${backupId}.json`);
    await fs3__namespace.promises.writeFile(backupFilePath, JSON.stringify(backup, null, 2), "utf8");
    await this.updateBackupMetadata({
      id: backupId,
      name: backupName,
      timestamp: backup.timestamp,
      size: (await fs3__namespace.promises.stat(backupFilePath)).size,
      botCount: backup.botConfigs.length,
      description
    });
    this.logger.success(`\u2705 Backup creado exitosamente: ${backupId}`);
    this.logger.info(`\u{1F4C1} Ubicaci\xF3n: ${backupFilePath}`);
    this.logger.info(`\u{1F916} Hermanas respaldadas: ${backup.botConfigs.length}`);
    return backupId;
  }
  /**
   * 🔄 Restaurar backup completo
   */
  async restoreBackup(backupId, restoreOptions) {
    const options = {
      overwriteExisting: false,
      createBackupBeforeRestore: true,
      ...restoreOptions
    };
    this.logger.gradientLog("\u{1F504} Restaurando backup...", ["accent", "primary"]);
    if (options.createBackupBeforeRestore) {
      this.logger.info("\u{1F4DD} Creando backup de respaldo antes de restaurar...");
      await this.createFullBackup(`pre_restore_${Date.now()}`, "Backup autom\xE1tico antes de restaurar");
    }
    const backupFilePath = path2__namespace.join(this.backupDir, `${backupId}.json`);
    if (!fs3__namespace.existsSync(backupFilePath)) {
      throw new Error(`Backup ${backupId} no encontrado`);
    }
    const backupContent = await fs3__namespace.promises.readFile(backupFilePath, "utf8");
    const backup = JSON.parse(backupContent);
    this.logger.info(`\u{1F4C5} Backup del: ${backup.timestamp}`);
    this.logger.info(`\u{1F916} Hermanas a restaurar: ${backup.botConfigs.length}`);
    await this.logger.showLoading("Restaurando configuraciones", 1500);
    for (const botBackup of backup.botConfigs) {
      if (options.selectiveBots && !options.selectiveBots.includes(botBackup.botKey)) {
        continue;
      }
      try {
        await this.restoreBot(botBackup, options.overwriteExisting);
        this.logger.success(`\u2705 ${botBackup.botName} restaurado`);
      } catch (error) {
        this.logger.error(`\u274C Error restaurando ${botBackup.botName}: ${error instanceof Error ? error.message : error}`);
      }
    }
    this.logger.sparkleLog("\u{1F389} Restauraci\xF3n completada!", "success");
  }
  /**
   * 📋 Listar todos los backups disponibles
   */
  async listBackups() {
    if (!fs3__namespace.existsSync(this.metadataFile)) {
      return [];
    }
    const metadataContent = await fs3__namespace.promises.readFile(this.metadataFile, "utf8");
    const metadata = JSON.parse(metadataContent);
    return metadata.backups || [];
  }
  /**
   * 🗑️ Eliminar backup
   */
  async deleteBackup(backupId) {
    const backupFilePath = path2__namespace.join(this.backupDir, `${backupId}.json`);
    if (!fs3__namespace.existsSync(backupFilePath)) {
      throw new Error(`Backup ${backupId} no encontrado`);
    }
    await fs3__namespace.promises.unlink(backupFilePath);
    const backups = await this.listBackups();
    const filteredBackups = backups.filter((b) => b.id !== backupId);
    await this.saveBackupMetadata(filteredBackups);
    this.logger.success(`\u{1F5D1}\uFE0F Backup ${backupId} eliminado`);
  }
  /**
   * 📊 Mostrar dashboard de backups
   */
  async showBackupDashboard() {
    var _a;
    console.clear();
    this.logger.gradientLog("\u{1F5C4}\uFE0F Sistema de Backup de Celia", ["primary", "secondary"]);
    console.log("");
    const backups = await this.listBackups();
    if (backups.length === 0) {
      this.logger.warning("\u{1F4ED} No hay backups disponibles");
      this.logger.info("\u{1F4A1} Crea tu primer backup con: celia backup create");
      return;
    }
    const totalSize = backups.reduce((sum, backup) => sum + backup.size, 0);
    const stats = [
      `\u{1F4CA} Total de Backups: ${backups.length}`,
      `\u{1F4BE} Espacio usado: ${this.formatFileSize(totalSize)}`,
      `\u{1F4C5} \xDAltimo backup: ${((_a = backups[0]) == null ? void 0 : _a.timestamp) ? new Date(backups[0].timestamp).toLocaleString() : "N/A"}`,
      `\u{1F4CD} Directorio: ${this.backupDir}`
    ];
    this.logger.createBox(stats, "info", 1);
    console.log("");
    this.logger.log("\u{1F4CB} Backups Disponibles:", "accent");
    console.log("");
    const sortedBackups = backups.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    for (const backup of sortedBackups.slice(0, 10)) {
      const age = this.getTimeAgo(new Date(backup.timestamp));
      const backupInfo = [
        `\u{1F194} ID: ${backup.id}`,
        `\u{1F4DD} Nombre: ${backup.name}`,
        `\u{1F4C5} Fecha: ${new Date(backup.timestamp).toLocaleString()}`,
        `\u23F0 Antig\xFCedad: ${age}`,
        `\u{1F916} Hermanas: ${backup.botCount}`,
        `\u{1F4BE} Tama\xF1o: ${this.formatFileSize(backup.size)}`,
        ...backup.description ? [`\u{1F4C4} Descripci\xF3n: ${backup.description}`] : []
      ];
      this.logger.createBox(backupInfo, "primary", 1);
      console.log("");
    }
    if (sortedBackups.length > 10) {
      this.logger.log(`... y ${sortedBackups.length - 10} backups m\xE1s`, "dim");
      console.log("");
    }
    const commands = [
      "\u2328\uFE0F  Comandos disponibles:",
      "   celia backup create [nombre] - Crear nuevo backup",
      "   celia backup restore <id> - Restaurar backup",
      "   celia backup list - Ver todos los backups",
      "   celia backup delete <id> - Eliminar backup",
      "   celia backup info <id> - Ver detalles de backup"
    ];
    this.logger.createBox(commands, "warning", 1);
  }
  /**
   * 🤖 Respaldar configuración de una hermana específica
   */
  async backupBot(botKey, bot) {
    const possiblePaths = [
      `./${bot.name.toLowerCase()}-bot`,
      `./${botKey}-bot`,
      `./${bot.name.toLowerCase()}`,
      `./${botKey}`
    ];
    let botPath = null;
    for (const pathCandidate of possiblePaths) {
      if (fs3__namespace.existsSync(pathCandidate)) {
        botPath = pathCandidate;
        break;
      }
    }
    if (!botPath) {
      this.logger.warning(`\u{1F4C1} Directorio no encontrado para ${bot.name}`);
      return null;
    }
    const backup = {
      botKey,
      botName: bot.name,
      envVars: {},
      configFiles: []
    };
    const envPath = path2__namespace.join(botPath, ".env");
    if (fs3__namespace.existsSync(envPath)) {
      const envContent = await fs3__namespace.promises.readFile(envPath, "utf8");
      const envVars = this.parseEnvFile(envContent);
      backup.envVars = envVars;
    }
    const configFiles = [".env", ".env.example", "config.json", "config.js", "config.ts"];
    for (const filename of configFiles) {
      const filePath = path2__namespace.join(botPath, filename);
      if (fs3__namespace.existsSync(filePath)) {
        const content = await fs3__namespace.promises.readFile(filePath, "utf8");
        const checksum = crypto__namespace.createHash("md5").update(content).digest("hex");
        backup.configFiles.push({
          filename,
          content,
          checksum
        });
      }
    }
    const packageJsonPath = path2__namespace.join(botPath, "package.json");
    if (fs3__namespace.existsSync(packageJsonPath)) {
      const packageContent = await fs3__namespace.promises.readFile(packageJsonPath, "utf8");
      backup.installedDependencies = JSON.parse(packageContent);
    }
    return backup;
  }
  /**
   * 🔄 Restaurar configuración de una hermana específica
   */
  async restoreBot(botBackup, overwriteExisting) {
    const bot = BOTS[botBackup.botKey];
    if (!bot) {
      throw new Error(`Configuraci\xF3n del bot ${botBackup.botKey} no encontrada`);
    }
    const botDirName = `${bot.name.toLowerCase()}-bot`;
    const botPath = `./${botDirName}`;
    if (!fs3__namespace.existsSync(botPath)) {
      this.logger.info(`\u{1F4C1} Creando directorio para ${bot.name}...`);
      await fs3__namespace.promises.mkdir(botPath, { recursive: true });
    }
    for (const fileBackup of botBackup.configFiles) {
      const filePath = path2__namespace.join(botPath, fileBackup.filename);
      if (fs3__namespace.existsSync(filePath) && !overwriteExisting) {
        this.logger.warning(`\u26A0\uFE0F Archivo ${fileBackup.filename} ya existe, saltando...`);
        continue;
      }
      const expectedChecksum = crypto__namespace.createHash("md5").update(fileBackup.content).digest("hex");
      if (expectedChecksum !== fileBackup.checksum) {
        this.logger.error(`\u274C Checksum inv\xE1lido para ${fileBackup.filename}`);
        continue;
      }
      await fs3__namespace.promises.writeFile(filePath, fileBackup.content, "utf8");
      this.logger.info(`\u2705 Restaurado: ${fileBackup.filename}`);
    }
    this.logger.success(`\u{1F389} ${botBackup.botName} restaurado exitosamente`);
  }
  /**
   * 🔧 Utilidades privadas
   */
  ensureBackupDirectory() {
    if (!fs3__namespace.existsSync(this.backupDir)) {
      fs3__namespace.mkdirSync(this.backupDir, { recursive: true });
    }
  }
  generateBackupId() {
    return `backup_${Date.now()}_${crypto__namespace.randomBytes(4).toString("hex")}`;
  }
  getSystemInfo() {
    return {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  parseEnvFile(content) {
    const envVars = {};
    const lines = content.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=");
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join("=").trim();
        }
      }
    }
    return envVars;
  }
  async updateBackupMetadata(metadata) {
    const backups = await this.listBackups();
    backups.unshift(metadata);
    await this.saveBackupMetadata(backups);
  }
  async saveBackupMetadata(backups) {
    const metadata = { backups };
    await fs3__namespace.promises.writeFile(this.metadataFile, JSON.stringify(metadata, null, 2), "utf8");
  }
  formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
  getTimeAgo(date) {
    const now = /* @__PURE__ */ new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 6e4);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `hace ${days} d\xEDa${days > 1 ? "s" : ""}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    return "hace menos de un minuto";
  }
};
__name(_BackupManager, "BackupManager");
var BackupManager = _BackupManager;

// src/cli/commands/backup.ts
var _BackupCommand = class _BackupCommand {
  constructor(logger, prompt) {
    this.logger = logger;
    this.prompt = prompt;
    this.backupManager = new BackupManager(logger);
  }
  async execute(args) {
    const action = (args == null ? void 0 : args[0]) || "dashboard";
    const param = args == null ? void 0 : args[1];
    switch (action.toLowerCase()) {
      case "create":
        await this.createBackup(param, args == null ? void 0 : args[2]);
        break;
      case "restore":
        await this.restoreBackup(param);
        break;
      case "list":
        await this.listBackups();
        break;
      case "delete":
        await this.deleteBackup(param);
        break;
      case "info":
        await this.showBackupInfo(param);
        break;
      case "dashboard":
      default:
        await this.showDashboard();
        break;
    }
  }
  async createBackup(name, description) {
    try {
      if (!name) {
        name = await this.prompt.question("\u{1F3F7}\uFE0F Nombre del backup (opcional): ");
      }
      if (!description) {
        description = await this.prompt.question("\u{1F4DD} Descripci\xF3n (opcional): ");
      }
      const backupId = await this.backupManager.createFullBackup(
        name || void 0,
        description || void 0
      );
      console.log("");
      this.logger.sparkleLog(`\u{1F389} Backup creado exitosamente: ${backupId}`, "success");
    } catch (error) {
      this.logger.error(`\u274C Error creando backup: ${error instanceof Error ? error.message : error}`);
    }
  }
  async restoreBackup(backupId) {
    try {
      if (!backupId) {
        const backups = await this.backupManager.listBackups();
        if (backups.length === 0) {
          this.logger.warning("\u{1F4ED} No hay backups disponibles");
          return;
        }
        this.logger.log("\u{1F4CB} Backups disponibles:", "accent");
        backups.slice(0, 5).forEach((backup, index) => {
          this.logger.log(`  ${index + 1}. ${backup.name} (${backup.id})`, "dim");
        });
        backupId = await this.prompt.question("\u{1F194} ID del backup a restaurar: ");
      }
      if (!backupId) {
        this.logger.warning("\u26A0\uFE0F ID de backup requerido");
        return;
      }
      const confirm = await this.prompt.confirm(
        "\u26A0\uFE0F \xBFEst\xE1s seguro de que deseas restaurar este backup? Esto puede sobrescribir configuraciones actuales",
        false
      );
      if (!confirm) {
        this.logger.info("Restauraci\xF3n cancelada");
        return;
      }
      await this.backupManager.restoreBackup(backupId, {
        overwriteExisting: true,
        createBackupBeforeRestore: true
      });
    } catch (error) {
      this.logger.error(`\u274C Error restaurando backup: ${error instanceof Error ? error.message : error}`);
    }
  }
  async listBackups() {
    try {
      const backups = await this.backupManager.listBackups();
      if (backups.length === 0) {
        this.logger.warning("\u{1F4ED} No hay backups disponibles");
        this.logger.info("\u{1F4A1} Crea tu primer backup con: celia backup create");
        return;
      }
      this.logger.gradientLog("\u{1F4CB} Lista de Backups", ["primary", "accent"]);
      console.log("");
      backups.forEach((backup, index) => {
        const backupInfo = [
          `\u{1F4E6} ${backup.name}`,
          `\u{1F194} ID: ${backup.id}`,
          `\u{1F4C5} Fecha: ${new Date(backup.timestamp).toLocaleString()}`,
          `\u{1F916} Hermanas: ${backup.botCount}`,
          `\u{1F4BE} Tama\xF1o: ${this.formatFileSize(backup.size)}`,
          ...backup.description ? [`\u{1F4C4} ${backup.description}`] : []
        ];
        this.logger.createBox(backupInfo, index === 0 ? "success" : "primary", 1);
        console.log("");
      });
    } catch (error) {
      this.logger.error(`\u274C Error listando backups: ${error instanceof Error ? error.message : error}`);
    }
  }
  async deleteBackup(backupId) {
    try {
      if (!backupId) {
        backupId = await this.prompt.question("\u{1F194} ID del backup a eliminar: ");
      }
      if (!backupId) {
        this.logger.warning("\u26A0\uFE0F ID de backup requerido");
        return;
      }
      const confirm = await this.prompt.confirm(
        `\u26A0\uFE0F \xBFEst\xE1s seguro de que deseas eliminar el backup ${backupId}?`,
        false
      );
      if (!confirm) {
        this.logger.info("Eliminaci\xF3n cancelada");
        return;
      }
      await this.backupManager.deleteBackup(backupId);
    } catch (error) {
      this.logger.error(`\u274C Error eliminando backup: ${error instanceof Error ? error.message : error}`);
    }
  }
  async showBackupInfo(backupId) {
    if (!backupId) {
      backupId = await this.prompt.question("\u{1F194} ID del backup: ");
    }
    if (!backupId) {
      this.logger.warning("\u26A0\uFE0F ID de backup requerido");
      return;
    }
    this.logger.info(`\u2139\uFE0F Informaci\xF3n detallada de backup ${backupId} pr\xF3ximamente`);
  }
  async showDashboard() {
    await this.backupManager.showBackupDashboard();
  }
  formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
  showUsage() {
    this.logger.createBox([
      "\u{1F5C4}\uFE0F Comando Backup - Gesti\xF3n de respaldos",
      "",
      "Uso:",
      "  celia backup [comando] [par\xE1metros]",
      "",
      "Comandos disponibles:",
      "  dashboard        - Ver dashboard de backups",
      "  create [nombre]  - Crear nuevo backup",
      "  restore <id>     - Restaurar backup",
      "  list             - Listar todos los backups",
      "  delete <id>      - Eliminar backup",
      "  info <id>        - Ver informaci\xF3n de backup",
      "",
      "Ejemplos:",
      '  celia backup create "mi_backup"',
      "  celia backup restore backup_123",
      "  celia backup list"
    ], "primary", 1);
  }
};
__name(_BackupCommand, "BackupCommand");
var BackupCommand = _BackupCommand;

// src/cli/commands/dependencies.ts
init_cjs_shims();

// src/services/dependency-installer.ts
init_cjs_shims();
var _DependencyInstaller = class _DependencyInstaller {
  constructor(logger, system) {
    this.logger = logger;
    this.system = system;
    this.SYSTEM_DEPENDENCIES = this.initializeSystemDependencies();
  }
  /**
   * 🚀 Instalar todas las dependencias del sistema automáticamente
   */
  async installSystemDependencies(interactive = true) {
    this.logger.gradientLog("\u{1F527} Instalador Autom\xE1tico de Dependencias", ["primary", "accent"]);
    console.log("");
    await this.logger.showLoading("Detectando sistema operativo", 1500);
    this.showSystemInfo();
    const missingDeps = await this.checkSystemDependencies();
    if (missingDeps.length === 0) {
      this.logger.sparkleLog("\u2705 Todas las dependencias est\xE1n instaladas!", "success");
      return true;
    }
    this.logger.warning(`\u26A0\uFE0F Dependencias faltantes: ${missingDeps.length}`);
    console.log("");
    this.showMissingDependencies(missingDeps);
    if (interactive) {
      console.log("");
      this.logger.info("\u{1F914} \xBFDeseas que instale las dependencias autom\xE1ticamente?");
      this.logger.log("   [Y] S\xED, instalar todo autom\xE1ticamente", "success");
      this.logger.log("   [S] S\xED, pero seleccionar qu\xE9 instalar", "warning");
      this.logger.log("   [N] No, mostrar instrucciones manuales", "dim");
    }
    return await this.performInstallation(missingDeps);
  }
  /**
   * 🔍 Verificar dependencias del sistema
   */
  async checkSystemDependencies() {
    const missing = [];
    for (const [depName, requirement] of Object.entries(this.SYSTEM_DEPENDENCIES)) {
      if (!requirement.required) continue;
      const isInstalled = await this.isDependencyInstalled(depName, requirement);
      if (!isInstalled) {
        missing.push(depName);
      }
    }
    return missing;
  }
  /**
   * 🛠️ Realizar instalación de dependencias
   */
  async performInstallation(missingDeps) {
    this.logger.info("\u{1F680} Iniciando instalaci\xF3n autom\xE1tica...");
    console.log("");
    let successCount = 0;
    let failCount = 0;
    for (const depName of missingDeps) {
      const requirement = this.SYSTEM_DEPENDENCIES[depName];
      if (!requirement) continue;
      try {
        this.logger.info(`\u{1F4E6} Instalando ${depName}...`);
        const success = await this.installSingleDependency(depName, requirement);
        if (success) {
          this.logger.success(`\u2705 ${depName} instalado correctamente`);
          successCount++;
        } else {
          this.logger.error(`\u274C Fall\xF3 la instalaci\xF3n de ${depName}`);
          failCount++;
        }
      } catch (error) {
        this.logger.error(`\u274C Error instalando ${depName}: ${error instanceof Error ? error.message : error}`);
        failCount++;
      }
      console.log("");
    }
    this.showInstallationSummary(successCount, failCount);
    return failCount === 0;
  }
  /**
   * 📦 Instalar una dependencia específica
   */
  async installSingleDependency(depName, requirement) {
    const method = this.getInstallMethodForCurrentSystem(requirement);
    if (!method) {
      this.logger.error(`No hay m\xE9todo de instalaci\xF3n disponible para ${depName} en ${this.system.platform.name}`);
      return false;
    }
    try {
      if (method.preInstall) {
        for (const cmd of method.preInstall) {
          await this.executeCommand(cmd);
        }
      }
      for (const cmd of method.commands) {
        await this.executeCommand(cmd);
      }
      if (method.postInstall) {
        for (const cmd of method.postInstall) {
          await this.executeCommand(cmd);
        }
      }
      if (method.validateCommand) {
        return await this.validateInstallation(method.validateCommand);
      }
      return true;
    } catch (error) {
      this.logger.error(`Error ejecutando instalaci\xF3n: ${error instanceof Error ? error.message : error}`);
      return false;
    }
  }
  /**
   * ✅ Verificar si una dependencia está instalada
   */
  async isDependencyInstalled(depName, requirement) {
    const method = this.getInstallMethodForCurrentSystem(requirement);
    if (!method || !method.validateCommand) {
      try {
        await SecurityUtils.execSafe(depName, ["--version"], { stdio: "ignore" });
        return true;
      } catch {
        return false;
      }
    }
    return await this.validateInstallation(method.validateCommand);
  }
  /**
   * ✅ Validar que la instalación funcionó
   */
  async validateInstallation(validateCommand) {
    try {
      const parts = validateCommand.split(" ");
      const command = parts[0];
      const args = parts.slice(1);
      await SecurityUtils.execSafe(command || "", args, { stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  }
  /**
   * 🎯 Obtener método de instalación para el sistema actual
   */
  getInstallMethodForCurrentSystem(requirement) {
    const platformName = this.system.platform.name.toLowerCase();
    const method = requirement.installMethods.find(
      (m) => m.platform.toLowerCase() === platformName || m.platform === "all"
    );
    return method || null;
  }
  /**
   * 🖥️ Mostrar información del sistema
   */
  showSystemInfo() {
    const systemInfo = [
      `\u{1F5A5}\uFE0F Sistema: ${this.system.platform.name} ${this.system.platform.release}`,
      `\u2699\uFE0F Arquitectura: ${this.system.architecture.family} ${this.system.architecture.bits}-bit`,
      `\u{1F527} Procesador: ${this.system.cpu.vendor} (${this.system.cpu.count} cores)`,
      `\u{1F4F1} Entorno: ${this.getEnvironmentType()}`
    ];
    this.logger.createBox(systemInfo, "info", 1);
    console.log("");
  }
  /**
   * 📋 Mostrar dependencias faltantes
   */
  showMissingDependencies(missingDeps) {
    this.logger.log("\u{1F4CB} Dependencias faltantes:", "error");
    console.log("");
    for (const depName of missingDeps) {
      const requirement = this.SYSTEM_DEPENDENCIES[depName];
      if (!requirement) continue;
      const method = this.getInstallMethodForCurrentSystem(requirement);
      const installCmd = method ? method.commands.join(" && ") : "No disponible para este sistema";
      const depInfo = [
        `\u{1F4E6} ${requirement.name}`,
        `   Requerido: ${requirement.required ? "S\xED" : "No"}`,
        `   Comando: ${installCmd}`,
        ...requirement.version ? [`   Versi\xF3n: ${requirement.version}`] : []
      ];
      this.logger.createBox(depInfo, "warning", 1);
      console.log("");
    }
  }
  /**
   * 📊 Mostrar resumen de instalación
   */
  showInstallationSummary(successCount, failCount) {
    console.log("");
    this.logger.gradientLog("\u{1F4CA} Resumen de Instalaci\xF3n", ["primary", "secondary"]);
    const summary = [
      `\u2705 Instalaciones exitosas: ${successCount}`,
      `\u274C Instalaciones fallidas: ${failCount}`,
      `\u{1F4C8} Tasa de \xE9xito: ${Math.round(successCount / (successCount + failCount) * 100)}%`
    ];
    const boxStyle = failCount === 0 ? "success" : failCount > successCount ? "error" : "warning";
    this.logger.createBox(summary, boxStyle, 1);
    if (failCount > 0) {
      console.log("");
      this.logger.warning("\u{1F4A1} Para las dependencias que fallaron, intenta instalarlas manualmente");
      this.logger.info("\u{1F527} O ejecuta: celia dependencies --manual para ver instrucciones");
    }
  }
  /**
   * 🏃‍♂️ Ejecutar comando de instalación
   */
  async executeCommand(command) {
    const parts = command.split(" ");
    const cmd = parts[0];
    const args = parts.slice(1);
    if (!cmd) throw new Error("Comando vac\xEDo");
    await this.logger.showLoading(`Ejecutando: ${command}`, 1e3);
    try {
      SecurityUtils.execSafe(cmd, args, { stdio: "inherit" });
    } catch (error) {
      throw new Error(`Comando fall\xF3: ${command}`);
    }
  }
  /**
   * 🌍 Obtener tipo de entorno
   */
  getEnvironmentType() {
    if (this.system.isTermux) return "Termux Android";
    if (this.system.platform.isMobile) return "M\xF3vil";
    if (this.system.isEmbedded) return "Sistema embebido";
    if (this.system.platform.isContainer) return "Contenedor";
    return "Desktop";
  }
  /**
   * 🔧 Inicializar definiciones de dependencias del sistema
   */
  initializeSystemDependencies() {
    return {
      git: {
        name: "Git",
        required: true,
        platforms: ["linux", "darwin", "win32"],
        installMethods: [
          {
            platform: "linux",
            packageManager: "apt",
            commands: ["sudo apt update", "sudo apt install -y git"],
            validateCommand: "git --version"
          },
          {
            platform: "darwin",
            packageManager: "brew",
            commands: ["brew install git"],
            validateCommand: "git --version"
          },
          {
            platform: "win32",
            packageManager: "manual",
            commands: ['echo "Descarga Git desde https://git-scm.com/download/win"'],
            validateCommand: "git --version"
          }
        ]
      },
      nodejs: {
        name: "Node.js",
        version: ">=14.0.0",
        required: true,
        platforms: ["linux", "darwin", "win32"],
        installMethods: [
          {
            platform: "linux",
            packageManager: "curl",
            commands: [
              "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -",
              "sudo apt-get install -y nodejs"
            ],
            validateCommand: "node --version"
          },
          {
            platform: "darwin",
            packageManager: "brew",
            commands: ["brew install node"],
            validateCommand: "node --version"
          },
          {
            platform: "win32",
            packageManager: "manual",
            commands: ['echo "Descarga Node.js desde https://nodejs.org"'],
            validateCommand: "node --version"
          }
        ]
      },
      npm: {
        name: "NPM",
        required: true,
        platforms: ["linux", "darwin", "win32"],
        installMethods: [
          {
            platform: "all",
            packageManager: "nodejs",
            commands: ['echo "NPM viene incluido con Node.js"'],
            validateCommand: "npm --version"
          }
        ]
      },
      python: {
        name: "Python",
        version: ">=3.7",
        required: false,
        platforms: ["linux", "darwin", "win32"],
        installMethods: [
          {
            platform: "linux",
            packageManager: "apt",
            commands: ["sudo apt update", "sudo apt install -y python3 python3-pip"],
            validateCommand: "python3 --version"
          },
          {
            platform: "darwin",
            packageManager: "brew",
            commands: ["brew install python"],
            validateCommand: "python3 --version"
          },
          {
            platform: "win32",
            packageManager: "manual",
            commands: ['echo "Descarga Python desde https://python.org"'],
            validateCommand: "python --version"
          }
        ]
      },
      pip: {
        name: "Pip",
        required: false,
        platforms: ["linux", "darwin", "win32"],
        installMethods: [
          {
            platform: "all",
            packageManager: "python",
            commands: ['echo "Pip viene incluido con Python 3.7+"'],
            validateCommand: "pip --version"
          }
        ]
      }
    };
  }
  /**
   * 📱 Instalar dependencias específicas para bot
   */
  async installBotDependencies(bot, botPath) {
    this.logger.info(`\u{1F4E6} Instalando dependencias para ${bot.name}...`);
    try {
      switch (bot.language) {
        case "Node.js":
        case "TypeScript":
          return await this.installNodeDependencies(botPath);
        case "Python":
          return await this.installPythonDependencies(botPath);
        default:
          this.logger.warning(`Lenguaje ${bot.language} no soportado para instalaci\xF3n autom\xE1tica`);
          return false;
      }
    } catch (error) {
      this.logger.error(`Error instalando dependencias: ${error instanceof Error ? error.message : error}`);
      return false;
    }
  }
  /**
   * 📦 Instalar dependencias de Node.js
   */
  async installNodeDependencies(botPath) {
    const packageJsonPath = path2__namespace.join(botPath, "package.json");
    if (!fs3__namespace.existsSync(packageJsonPath)) {
      this.logger.warning("package.json no encontrado");
      return false;
    }
    const optimizedArgs = this.system.isARM || this.system.isEmbedded ? ["install", "--maxsockets", "1", "--progress", "false"] : ["install", "--progress", "false"];
    try {
      SecurityUtils.execSafe("npm", optimizedArgs, { cwd: botPath, stdio: "inherit" });
      return true;
    } catch (error) {
      return false;
    }
  }
  /**
   * 🐍 Instalar dependencias de Python
   */
  async installPythonDependencies(botPath) {
    const requirementsPath = path2__namespace.join(botPath, "requirements.txt");
    if (!fs3__namespace.existsSync(requirementsPath)) {
      this.logger.warning("requirements.txt no encontrado");
      return false;
    }
    const optimizedArgs = this.system.cpu.count === 1 ? ["-m", "pip", "install", "-r", "requirements.txt", "--no-cache-dir"] : ["-m", "pip", "install", "-r", "requirements.txt"];
    try {
      SecurityUtils.execSafe("python3", optimizedArgs, { cwd: botPath, stdio: "inherit" });
      return true;
    } catch (error) {
      return false;
    }
  }
};
__name(_DependencyInstaller, "DependencyInstaller");
var DependencyInstaller = _DependencyInstaller;

// src/cli/commands/dependencies.ts
var _DependenciesCommand = class _DependenciesCommand {
  constructor(logger, system, prompt) {
    this.logger = logger;
    this.system = system;
    this.prompt = prompt;
    this.installer = new DependencyInstaller(logger, system);
  }
  async execute(args) {
    const action = (args == null ? void 0 : args[0]) || "check";
    switch (action.toLowerCase()) {
      case "install":
        await this.installDependencies();
        break;
      case "check":
        await this.checkDependencies();
        break;
      case "manual":
        await this.showManualInstructions();
        break;
      case "system":
        await this.showSystemInfo();
        break;
      default:
        this.showUsage();
    }
  }
  async installDependencies() {
    try {
      this.logger.gradientLog("\u{1F527} Instalaci\xF3n Autom\xE1tica de Dependencias", ["primary", "accent"]);
      console.log("");
      const success = await this.installer.installSystemDependencies(true);
      if (success) {
        this.logger.sparkleLog("\u{1F389} Todas las dependencias instaladas correctamente!", "success");
        console.log("");
        this.logger.info("\u2705 Tu sistema est\xE1 listo para usar Celia y sus hermanas");
      } else {
        this.logger.warning("\u26A0\uFE0F Algunas dependencias no se pudieron instalar autom\xE1ticamente");
        console.log("");
        this.logger.info('\u{1F4A1} Ejecuta "celia dependencies manual" para ver instrucciones');
      }
    } catch (error) {
      this.logger.error(`\u274C Error en instalaci\xF3n: ${error instanceof Error ? error.message : error}`);
    }
  }
  async checkDependencies() {
    this.logger.gradientLog("\u{1F50D} Verificando Dependencias del Sistema", ["primary", "secondary"]);
    console.log("");
    try {
      const missing = await this.installer.checkSystemDependencies();
      if (missing.length === 0) {
        this.logger.sparkleLog("\u2705 Todas las dependencias est\xE1n instaladas!", "success");
        this.showSystemSummary();
      } else {
        this.logger.warning(`\u26A0\uFE0F Faltan ${missing.length} dependencias:`);
        console.log("");
        missing.forEach((dep) => {
          this.logger.log(`\u274C ${dep}`, "error");
        });
        console.log("");
        this.logger.info('\u{1F4A1} Ejecuta "celia dependencies install" para instalar autom\xE1ticamente');
      }
    } catch (error) {
      this.logger.error(`\u274C Error verificando dependencias: ${error instanceof Error ? error.message : error}`);
    }
  }
  async showManualInstructions() {
    this.logger.gradientLog("\u{1F4D6} Instrucciones Manuales de Instalaci\xF3n", ["accent", "primary"]);
    console.log("");
    const platform2 = this.system.platform.name;
    this.logger.createBox([
      `\u{1F4F1} Sistema detectado: ${platform2} ${this.system.architecture.family}`,
      "",
      "Dependencias requeridas y c\xF3mo instalarlas:"
    ], "info", 1);
    console.log("");
    this.showManualInstallInstructions("Git", this.getGitInstructions(platform2));
    this.showManualInstallInstructions("Node.js", this.getNodeInstructions(platform2));
    this.showManualInstallInstructions("Python (opcional)", this.getPythonInstructions(platform2));
    console.log("");
    this.logger.info('\u{1F504} Despu\xE9s de instalar, ejecuta "celia dependencies check" para verificar');
  }
  showManualInstallInstructions(title, instructions) {
    this.logger.log(`\u{1F527} ${title}:`, "accent");
    instructions.forEach((instruction) => {
      this.logger.log(`   ${instruction}`, "dim");
    });
    console.log("");
  }
  getGitInstructions(platform2) {
    const instructions = {
      "Linux": [
        "sudo apt update",
        "sudo apt install git",
        "git --version  # verificar instalaci\xF3n"
      ],
      "macOS": [
        "brew install git",
        "git --version  # verificar instalaci\xF3n"
      ],
      "Windows": [
        "Descargar desde: https://git-scm.com/download/win",
        "Ejecutar instalador y seguir instrucciones",
        "git --version  # verificar en cmd/powershell"
      ]
    };
    return instructions[platform2] || instructions["Linux"] || [];
  }
  getNodeInstructions(platform2) {
    const instructions = {
      "Linux": [
        "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -",
        "sudo apt-get install -y nodejs",
        "node --version && npm --version  # verificar"
      ],
      "macOS": [
        "brew install node",
        "node --version && npm --version  # verificar"
      ],
      "Windows": [
        "Descargar desde: https://nodejs.org",
        "Ejecutar instalador LTS",
        "node --version && npm --version  # verificar en cmd"
      ]
    };
    return instructions[platform2] || instructions["Linux"] || [];
  }
  getPythonInstructions(platform2) {
    const instructions = {
      "Linux": [
        "sudo apt update",
        "sudo apt install python3 python3-pip",
        "python3 --version && pip3 --version  # verificar"
      ],
      "macOS": [
        "brew install python",
        "python3 --version && pip3 --version  # verificar"
      ],
      "Windows": [
        "Descargar desde: https://python.org",
        'Ejecutar instalador (marcar "Add to PATH")',
        "python --version && pip --version  # verificar en cmd"
      ]
    };
    return instructions[platform2] || instructions["Linux"] || [];
  }
  async showSystemInfo() {
    this.logger.gradientLog("\u{1F5A5}\uFE0F Informaci\xF3n del Sistema", ["primary", "secondary"]);
    console.log("");
    const systemInfo = [
      `\u{1F5A5}\uFE0F Sistema Operativo: ${this.system.platform.name} ${this.system.platform.release}`,
      `\u2699\uFE0F Arquitectura: ${this.system.architecture.family} ${this.system.architecture.bits}-bit`,
      `\u{1F527} Procesador: ${this.system.cpu.vendor} ${this.system.cpu.model}`,
      `\u{1F9EE} N\xFAcleos de CPU: ${this.system.cpu.count}`,
      `\u{1F4F1} Entorno: ${this.getEnvironmentInfo()}`,
      `\u{1F3F7}\uFE0F Endianness: ${this.system.architecture.endianness}`
    ];
    this.logger.createBox(systemInfo, "info", 1);
    const recommendations = this.getSystemRecommendations();
    if (recommendations.length > 0) {
      console.log("");
      this.logger.createBox([
        "\u{1F4A1} Recomendaciones del Sistema:",
        "",
        ...recommendations
      ], "warning", 1);
    }
  }
  showSystemSummary() {
    console.log("");
    const summary = [
      "\u{1F389} Sistema listo para Celia!",
      "",
      "\u2705 Git instalado",
      "\u2705 Node.js instalado",
      "\u2705 NPM disponible",
      "",
      "\u{1F680} Puedes instalar hermanas bot sin problemas"
    ];
    this.logger.createBox(summary, "success", 1);
  }
  getEnvironmentInfo() {
    if (this.system.isTermux) return "Termux Android";
    if (this.system.platform.isMobile) return "Dispositivo m\xF3vil";
    if (this.system.isEmbedded) return "Sistema embebido";
    if (this.system.platform.isContainer) return "Contenedor Docker/LXC";
    return "Escritorio/Servidor";
  }
  getSystemRecommendations() {
    const recommendations = [];
    if (this.system.isARM) {
      recommendations.push("\u{1F527} ARM detectado: Las compilaciones pueden tomar m\xE1s tiempo");
    }
    if (this.system.isTermux) {
      recommendations.push('\u{1F4F1} Termux: Instala dependencias con "pkg install git nodejs python"');
    }
    if (this.system.isEmbedded) {
      recommendations.push("\u{1F916} Sistema embebido: Funciones optimizadas autom\xE1ticamente");
    }
    if (this.system.cpu.count === 1) {
      recommendations.push("\u{1F40C} Un solo n\xFAcleo: Instalaciones ser\xE1n m\xE1s lentas");
    }
    if (this.system.isRISCV) {
      recommendations.push("\u2699\uFE0F RISC-V: Usa instalaciones r\xE1pidas para mejor compatibilidad");
    }
    return recommendations;
  }
  showUsage() {
    this.logger.createBox([
      "\u{1F527} Comando Dependencies - Gesti\xF3n de dependencias",
      "",
      "Uso:",
      "  celia dependencies [comando]",
      "",
      "Comandos disponibles:",
      "  check    - Verificar dependencias instaladas",
      "  install  - Instalar dependencias autom\xE1ticamente",
      "  manual   - Ver instrucciones manuales",
      "  system   - Mostrar informaci\xF3n del sistema",
      "",
      "Ejemplos:",
      "  celia dependencies check",
      "  celia dependencies install",
      "  celia dependencies manual"
    ], "primary", 1);
  }
};
__name(_DependenciesCommand, "DependenciesCommand");
var DependenciesCommand = _DependenciesCommand;

// src/cli/celia.ts
var _CeliaAssistant = class _CeliaAssistant {
  constructor() {
    this.interactive = false;
    this.logger = new Logger();
    this.system = new SystemDetector();
    this.prompt = new PromptUtils();
    this.router = new CommandRouter();
    this.initializeCommands();
  }
  /**
   * 🛡️ Verificar prerrequisitos críticos
   */
  static checkCriticalPrerequisites() {
    if (!SecurityUtils.validateNodeVersion(NODE_MIN_VERSION)) {
      throw new Error(`Versi\xF3n de Node.js muy antigua. Se requiere >= ${NODE_MIN_VERSION}. Versi\xF3n actual: ${process.version}`);
    }
  }
  /**
   * 🛡️ Mostrar estado de prerrequisitos
   */
  showPrerequisiteStatus() {
    const missing = SecurityUtils.checkPrerequisites();
    if (missing.length > 0) {
      this.logger.log("\n\u26A0\uFE0F  Prerrequisitos faltantes:", "warning");
      missing.forEach((cmd) => {
        this.logger.log(`   - ${cmd}`, "error");
      });
      this.logger.log("\n\u{1F4A1} Instala los comandos faltantes antes de continuar", "info");
    } else {
      this.logger.log("\n\u2705 Todos los prerrequisitos disponibles", "dim");
    }
  }
  /**
   * 🌸 Initialize Celia's modern command system~
   */
  initializeCommands() {
    const listCommand = new ListCommand(this.logger);
    const helpCommand = new HelpCommand(this.logger, this.router);
    const themeCommand = new ThemeCommand(this.logger);
    const statusCommand = new StatusCommand(this.logger, this.system);
    const monitorCommand = new MonitorCommand(this.logger, this.system, this.prompt);
    const backupCommand = new BackupCommand(this.logger, this.prompt);
    const dependenciesCommand = new DependenciesCommand(this.logger, this.system, this.prompt);
    this.router.register("sisters", {
      aliases: ["list", "hermanas"],
      description: "\u{1F338} Conoce a todas mis hermanas bot",
      usage: "celia sisters",
      action: /* @__PURE__ */ __name((args) => listCommand.execute(args), "action")
    });
    this.router.register("help", {
      aliases: ["h", "ayuda"],
      description: "\u{1F4AB} Obt\xE9n ayuda de Celia",
      usage: "celia help [comando]",
      action: /* @__PURE__ */ __name((args) => helpCommand.execute(args), "action")
    });
    this.router.register("theme", {
      aliases: ["themes", "style"],
      description: "\u{1F3A8} Cambia mi apariencia visual",
      usage: "celia theme [celestial|kawaii|dreamy]",
      action: /* @__PURE__ */ __name(async (args) => await themeCommand.execute(args), "action")
    });
    this.router.register("status", {
      aliases: ["info", "system"],
      description: "\u{1F527} Informaci\xF3n del sistema y entorno",
      usage: "celia status",
      action: /* @__PURE__ */ __name((args) => statusCommand.execute(args), "action")
    });
    this.router.register("install", {
      aliases: ["add", "setup"],
      description: "\u{1F496} Instala a una de mis hermanas con mucho amor",
      usage: "celia install <hermana>",
      action: /* @__PURE__ */ __name((args) => this.modernInstall(args == null ? void 0 : args[0]), "action")
    });
    this.router.register("quick", {
      aliases: ["fast", "rapido"],
      description: "\u26A1 Instalaci\xF3n s\xFAper r\xE1pida",
      usage: "celia quick <hermana>",
      action: /* @__PURE__ */ __name((args) => this.quickInstallBot(args == null ? void 0 : args[0]), "action")
    });
    this.router.register("monitor", {
      aliases: ["watch", "observe"],
      description: "\u{1F50D} Monitor en tiempo real de las hermanas",
      usage: "celia monitor [start|stop|status]",
      action: /* @__PURE__ */ __name(async (args) => await monitorCommand.execute(args), "action")
    });
    this.router.register("backup", {
      aliases: ["save", "restore"],
      description: "\u{1F5C4}\uFE0F Sistema de backup de configuraciones",
      usage: "celia backup [create|restore|list]",
      action: /* @__PURE__ */ __name(async (args) => await backupCommand.execute(args), "action")
    });
    this.router.register("dependencies", {
      aliases: ["deps", "install-deps"],
      description: "\u{1F527} Instalador autom\xE1tico de dependencias",
      usage: "celia dependencies [check|install|manual]",
      action: /* @__PURE__ */ __name(async (args) => await dependenciesCommand.execute(args), "action")
    });
  }
  /**
   * 🌟 Modern CLI entry point with beautiful parsing~
   */
  async run() {
    const args = process.argv.slice(2);
    try {
      if (args.length === 0) {
        await this.startInteractiveMode();
        return;
      }
      if (args.includes("--version") || args.includes("-v")) {
        this.showVersion();
        return;
      }
      const command = args[0] || "";
      const commandArgs = args.slice(1);
      if (command === "list") {
        await this.router.execute("sisters", []);
        return;
      }
      if (command === "quick-install") {
        await this.router.execute("quick", commandArgs);
        return;
      }
      await this.router.execute(command, commandArgs);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.log(`\u{1F338} Aww, algo sali\xF3 mal: ${message}`, "error");
      console.log("");
      this.logger.log('\u{1F4A1} Intenta "celia help" para ver los comandos disponibles~', "info");
    } finally {
      this.prompt.close();
    }
  }
  /**
   * Show version information
   */
  showVersion() {
    this.showBanner();
    this.logger.gradientLog(`Celia v${VERSION} \u{1F496}`, ["primary", "secondary"]);
    console.log("");
    this.logger.log("Tu asistente celestial tierna~", "dim");
    this.showPrerequisiteStatus();
    console.log("");
  }
  /**
   * 🌸 Celia's beautiful modern banner~
   */
  showBanner() {
    console.clear();
    console.log("");
    this.logger.createBox([
      "\u2728 \xA1Holi! Soy Celia~ \u2728",
      "\u{1F338} Tu asistente celestial tierna \u{1F338}",
      "",
      "\u{1F496} Ayudo a instalar a mis hermanas bot \u{1F496}",
      "(Aunque soy algo torpe, ehehe~)"
    ], "primary", 2);
    console.log("");
    this.logger.log(`\u{1F3A8} Tema actual: ${this.logger.theme}`, "dim");
    if (this.system.isARM || this.system.isTermux || this.system.isEmbedded || this.system.platform.isMobile) {
      console.log("");
      this.logger.log("\u{1F338} Entorno especializado detectado:", "info");
      if (this.system.isTermux) this.logger.log("   \u{1F4F1} Termux Android", "success");
      if (this.system.platform.isMobile) this.logger.log("   \u{1F4F1} Plataforma m\xF3vil", "success");
      if (this.system.isARM) this.logger.log(`   \u{1F527} Arquitectura ARM ${this.system.architecture.bits}-bit`, "success");
      if (this.system.isRISCV) this.logger.log("   \u2699\uFE0F Arquitectura RISC-V", "success");
      if (this.system.isEmbedded) this.logger.log("   \u{1F916} Sistema embebido detectado", "success");
      if (this.system.platform.isContainer) this.logger.log("   \u{1F433} Entorno contenedorizado", "success");
    }
    console.log("");
  }
  /**
   * 💬 Enhanced interactive mode~
   */
  async startInteractiveMode() {
    this.interactive = true;
    this.showBanner();
    this.logger.gradientLog("\u{1F4AC} Modo Interactivo Activado", ["primary", "accent"]);
    console.log("");
    const welcomeMessages = [
      "\xA1Ahora puedes hablar conmigo! \u{1F496}",
      'Usa comandos como "sisters", "help", "theme"...',
      'Para salir, escribe "exit" o presiona Ctrl+C'
    ];
    welcomeMessages.forEach((msg) => this.logger.log(msg, "info"));
    console.log("");
    while (this.interactive) {
      try {
        const input = await this.prompt.question("\u{1F338} Celia> ");
        if (!input.trim()) {
          this.logger.log('\u{1F4A1} Tip: Usa "help" para ver comandos disponibles~', "dim");
          continue;
        }
        if (["exit", "quit", "bye"].includes(input.trim().toLowerCase())) {
          this.logger.log("\u{1F338} \xA1Hasta luego! \xA1Que tengas un d\xEDa celestial!~", "primary");
          break;
        }
        const args = input.trim().split(" ");
        const command = args[0] || "";
        const commandArgs = args.slice(1);
        await this.router.execute(command, commandArgs);
        console.log("");
      } catch (error) {
        if (typeof error === "object" && error !== null && "code" in error && error.code === "SIGINT") {
          this.logger.log("\n\u{1F338} \xA1Hasta luego! \xA1Que tengas un d\xEDa celestial!~", "primary");
          break;
        }
        const message = error instanceof Error ? error.message : String(error);
        this.logger.log(`\u{1F338} Error: ${message}`, "error");
        console.log("");
      }
    }
    this.interactive = false;
  }
  // Placeholder methods for install commands (to be implemented later)
  async modernInstall(botName) {
    this.logger.log("\u{1F6A7} Funci\xF3n de instalaci\xF3n en desarrollo...", "warning");
    this.logger.log(`Instalando: ${botName || "bot no especificado"}`, "info");
  }
  async quickInstallBot(botName) {
    this.logger.log("\u{1F6A7} Funci\xF3n de instalaci\xF3n r\xE1pida en desarrollo...", "warning");
    this.logger.log(`Instalaci\xF3n r\xE1pida: ${botName || "bot no especificado"}`, "info");
  }
};
__name(_CeliaAssistant, "CeliaAssistant");
var CeliaAssistant = _CeliaAssistant;

// src/bin/cli.ts
function parseArgs() {
  const args = process.argv.slice(2);
  const flags = {
    help: false,
    version: false,
    interactive: false
  };
  for (const arg of args) {
    switch (arg) {
      case "--help":
      case "-h":
        flags.help = true;
        break;
      case "--version":
      case "-v":
        flags.version = true;
        break;
      case "--interactive":
      case "-i":
        flags.interactive = true;
        break;
    }
  }
  return { flags, args };
}
__name(parseArgs, "parseArgs");
function showHelp() {
  console.log(`
\u{1F338} Celia CLI v${VERSION}
Tu asistente celestial para instalar bots de Discord

Uso:
  celia [comando] [opciones]
  celia --interactive           Modo interactivo
  
Comandos:
  help                         Muestra ayuda detallada
  list                         Lista todas las hermanas bot
  theme [nombre]               Cambia el tema visual
  status                       Informaci\xF3n del sistema
  
Opciones:
  --version, -v                Muestra la versi\xF3n
  --help, -h                   Muestra esta ayuda
  --interactive, -i            Inicia modo interactivo
  
Ejemplos:
  celia list                   Lista bots disponibles
  celia help                   Ayuda detallada
  celia theme kawaii          Cambia al tema kawaii
  
\u{1F338} \xA1Holi! Soy Celia, tu asistente celestial tierna~
`);
}
__name(showHelp, "showHelp");
async function main() {
  try {
    const { flags, args } = parseArgs();
    if (flags.version) {
      console.log(VERSION);
      process.exit(0);
    }
    if (flags.help) {
      showHelp();
      process.exit(0);
    }
    CeliaAssistant.checkCriticalPrerequisites();
    const celia = new CeliaAssistant();
    if (flags.interactive || args.length === 0) {
      await celia.startInteractiveMode();
    } else {
      await celia.run();
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("\u{1F338} Fatal error:", message);
    process.exit(1);
  }
}
__name(main, "main");
process.on("SIGINT", () => {
  console.log("\n\u{1F338} \xA1Hasta luego! \xA1Que tengas un d\xEDa celestial!~");
  process.exit(0);
});
process.on("SIGTERM", () => {
  console.log("\n\u{1F338} \xA1Hasta luego! \xA1Que tengas un d\xEDa celestial!~");
  process.exit(0);
});
if (__require.main === module) {
  main();
}
var cli_default = main;

module.exports = cli_default;
//# sourceMappingURL=cli.js.map
//# sourceMappingURL=cli.js.map