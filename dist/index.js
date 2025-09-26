'use strict';

var os = require('os');
var fs2 = require('fs');
var child_process = require('child_process');
var readline = require('readline');
var path = require('path');

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
var fs2__namespace = /*#__PURE__*/_interopNamespace(fs2);
var readline__namespace = /*#__PURE__*/_interopNamespace(readline);
var path__namespace = /*#__PURE__*/_interopNamespace(path);

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
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// src/cli/router.ts
var router_exports = {};
__export(router_exports, {
  CommandRouter: () => CommandRouter,
  default: () => router_default
});
var _CommandRouter, CommandRouter, router_default;
var init_router = __esm({
  "src/cli/router.ts"() {
    init_cjs_shims();
    _CommandRouter = class _CommandRouter {
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
    CommandRouter = _CommandRouter;
    router_default = CommandRouter;
  }
});

// src/config/constants.js
var require_constants = __commonJS({
  "src/config/constants.js"(exports, module) {
    init_cjs_shims();
    module.exports = {
      CLI_NAME: "opceanaicli",
      VERSION: "2.0.0",
      NODE_MIN_VERSION: "14.0.0",
      // Timeout configurations
      DEFAULT_TIMEOUT: 3e4,
      GIT_TIMEOUT: 6e4,
      INSTALL_TIMEOUT: 18e4,
      // File limits
      MAX_FILENAME_LENGTH: 100,
      MAX_ARGUMENT_LENGTH: 1e3,
      // System detection
      SUPPORTED_PLATFORMS: ["win32", "linux", "darwin", "android"],
      SUPPORTED_ARCHITECTURES: ["x64", "ia32", "arm", "arm64", "armv7l", "aarch64"],
      // Package managers
      PACKAGE_MANAGERS: {
        npm: {
          name: "npm",
          lockFile: "package-lock.json",
          installCommand: ["install"],
          addCommand: ["install"],
          runCommand: ["run"]
        },
        pnpm: {
          name: "pnpm",
          lockFile: "pnpm-lock.yaml",
          installCommand: ["install"],
          addCommand: ["add"],
          runCommand: ["run"]
        },
        yarn: {
          name: "yarn",
          lockFile: "yarn.lock",
          installCommand: ["install"],
          addCommand: ["add"],
          runCommand: ["run"]
        },
        bun: {
          name: "bun",
          lockFile: "bun.lockb",
          installCommand: ["install"],
          addCommand: ["add"],
          runCommand: ["run"]
        }
      }
    };
  }
});

// src/config/themes.js
var require_themes = __commonJS({
  "src/config/themes.js"(exports, module) {
    init_cjs_shims();
    var THEMES4 = {
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
        reset: "\x1B[0m"
      }
    };
    module.exports = {
      THEMES: THEMES4,
      DEFAULT_THEME: "celestial"
    };
  }
});

// src/config/bots.js
var require_bots = __commonJS({
  "src/config/bots.js"(exports, module) {
    init_cjs_shims();
    var BOTS3 = {
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
          { name: "LAVALINK_HOST", description: "Lavalink Host", required: false, default: "localhost" },
          { name: "LAVALINK_PORT", description: "Lavalink Port", required: false, default: "2333" },
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
    module.exports = {
      BOTS: BOTS3
    };
  }
});

// src/utils/logger.ts
var logger_exports = {};
__export(logger_exports, {
  Logger: () => Logger,
  default: () => logger_default
});
var THEMES, DEFAULT_THEME, _Logger, Logger, logger_default;
var init_logger = __esm({
  "src/utils/logger.ts"() {
    init_cjs_shims();
    ({ THEMES, DEFAULT_THEME } = require_themes());
    _Logger = class _Logger {
      constructor(theme = DEFAULT_THEME) {
        this.theme = theme;
      }
      /**
       * Set current theme
       */
      setTheme(theme) {
        if (THEMES[theme]) {
          this.theme = theme;
        }
      }
      /**
       * Get current theme colors
       */
      getTheme() {
        return THEMES[this.theme];
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
          await new Promise((resolve2) => setTimeout(resolve2, speed));
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
        await new Promise((resolve2) => setTimeout(resolve2, duration));
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
          await new Promise((resolve2) => setTimeout(resolve2, speed));
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
          await new Promise((resolve2) => setTimeout(resolve2, 300));
          process.stdout.write(`\r${theme.dim}${text}${theme.reset}`);
          await new Promise((resolve2) => setTimeout(resolve2, 300));
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
          await new Promise((resolve2) => setTimeout(resolve2, 50));
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
    Logger = _Logger;
    logger_default = Logger;
  }
});

// src/services/system.ts
var system_exports = {};
__export(system_exports, {
  SystemDetector: () => SystemDetector,
  default: () => system_default
});
var _SystemDetector, SystemDetector, system_default;
var init_system = __esm({
  "src/services/system.ts"() {
    init_cjs_shims();
    _SystemDetector = class _SystemDetector {
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
          return !!(process.env.container || process.env.DOCKER_CONTAINER || process.env.KUBERNETES_SERVICE_HOST || fs2__namespace.existsSync("/.dockerenv") || fs2__namespace.existsSync("/proc/1/cgroup") && fs2__namespace.readFileSync("/proc/1/cgroup", "utf8").includes("docker"));
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
          if (this.platform.raw === "linux" && fs2__namespace.existsSync("/proc/cpuinfo")) {
            const cpuinfo = fs2__namespace.readFileSync("/proc/cpuinfo", "utf8");
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
    SystemDetector = _SystemDetector;
    system_default = SystemDetector;
  }
});

// src/security/security.ts
var security_exports = {};
__export(security_exports, {
  SecurityUtils: () => SecurityUtils,
  default: () => security_default
});
var _SecurityUtils, SecurityUtils, security_default;
var init_security = __esm({
  "src/security/security.ts"() {
    init_cjs_shims();
    _SecurityUtils = class _SecurityUtils {
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
        const current = currentVersion.slice(1).split(".").map(Number);
        const required = requiredVersion.split(".").map(Number);
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
          const path2 = __require("path");
          const resolved = path2.resolve(filePath);
          const allowed = path2.resolve(allowedDir);
          return resolved.startsWith(allowed + path2.sep) || resolved === allowed;
        } catch (error) {
          return false;
        }
      }
      /**
       * 🛡️ Genera hash seguro para identificación
       */
      static generateSafeHash(input) {
        const crypto = __require("crypto");
        return crypto.createHash("sha256").update(input).digest("hex").substring(0, 16);
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
    SecurityUtils = _SecurityUtils;
    security_default = SecurityUtils;
  }
});

// src/utils/prompt.ts
var prompt_exports = {};
__export(prompt_exports, {
  PromptUtils: () => PromptUtils,
  default: () => prompt_default
});
var _PromptUtils, PromptUtils, prompt_default;
var init_prompt = __esm({
  "src/utils/prompt.ts"() {
    init_cjs_shims();
    _PromptUtils = class _PromptUtils {
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
        return new Promise((resolve2, reject) => {
          const timer = setTimeout(() => {
            console.log("\n\u23F0 Timeout - usando valor por defecto");
            resolve2("");
          }, timeout);
          rl.question(prompt, (answer) => {
            clearTimeout(timer);
            resolve2(answer.trim());
          });
        });
      }
      /**
       * Prompt user for sensitive input (hidden characters)
       */
      async questionHidden(prompt) {
        return new Promise((resolve2) => {
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
                resolve2(input);
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
    PromptUtils = _PromptUtils;
    prompt_default = PromptUtils;
  }
});

// src/cli/commands/list.js
var require_list = __commonJS({
  "src/cli/commands/list.js"(exports, module) {
    init_cjs_shims();
    var { BOTS: BOTS3 } = require_bots();
    var _ListCommand = class _ListCommand {
      constructor(logger) {
        this.logger = logger;
      }
      async execute(args = []) {
        this.showBanner();
        this.logger.gradientLog("\u{1F338} \xA1Mis Hermanas Bot! \u{1F338}", ["primary", "secondary", "accent"]);
        console.log("");
        const categories = {};
        Object.entries(BOTS3).forEach(([key, bot]) => {
          if (!categories[bot.category]) {
            categories[bot.category] = [];
          }
          categories[bot.category].push({ key, ...bot });
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
    var ListCommand2 = _ListCommand;
    module.exports = ListCommand2;
  }
});

// src/cli/commands/help.js
var require_help = __commonJS({
  "src/cli/commands/help.js"(exports, module) {
    init_cjs_shims();
    var _HelpCommand = class _HelpCommand {
      constructor(logger, commandRouter) {
        this.logger = logger;
        this.commandRouter = commandRouter;
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
        this.logger.createBox([
          `Comando: ${commandName}`,
          "",
          command.config.description,
          "",
          `Uso: ${command.config.usage}`,
          command.config.aliases.length > 0 ? `Alias: ${command.config.aliases.join(", ")}` : ""
        ].filter(Boolean), "primary", 2);
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
              this.logger.log(`  ${command.config.usage}`, "primary");
              this.logger.log(`    ${command.config.description}`, "dim");
              if (command.config.aliases.length > 0) {
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
    var HelpCommand2 = _HelpCommand;
    module.exports = HelpCommand2;
  }
});

// src/cli/commands/theme.js
var require_theme = __commonJS({
  "src/cli/commands/theme.js"(exports, module) {
    init_cjs_shims();
    var { THEMES: THEMES4 } = require_themes();
    var _ThemeCommand = class _ThemeCommand {
      constructor(logger) {
        this.logger = logger;
      }
      async execute(args = []) {
        const themeName = args[0];
        if (!themeName) {
          this.showAvailableThemes();
          return;
        }
        if (!THEMES4[themeName]) {
          this.logger.log(`\u{1F338} Tema "${themeName}" no existe~ Temas disponibles: ${Object.keys(THEMES4).join(", ")}`, "error");
          return;
        }
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
        Object.keys(THEMES4).forEach((theme) => {
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
    var ThemeCommand2 = _ThemeCommand;
    module.exports = ThemeCommand2;
  }
});

// src/cli/commands/status.js
var require_status = __commonJS({
  "src/cli/commands/status.js"(exports, module) {
    init_cjs_shims();
    var _StatusCommand = class _StatusCommand {
      constructor(logger, system) {
        this.logger = logger;
        this.system = system;
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
        this.logger.createBox(systemInfo, "info", 1);
        const recommendations = this.system.getSystemRecommendations();
        if (recommendations.length > 0) {
          console.log("");
          this.logger.createBox([
            "\u{1F4A1} Recomendaciones:",
            "",
            ...recommendations
          ], "warning", 1);
        }
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
    var StatusCommand2 = _StatusCommand;
    module.exports = StatusCommand2;
  }
});

// src/cli/celia.ts
var celia_exports = {};
__export(celia_exports, {
  CeliaAssistant: () => CeliaAssistant,
  default: () => celia_default
});
var VERSION, NODE_MIN_VERSION, THEMES2, BOTS, Logger2, SystemDetector2, SecurityUtils2, PromptUtils2, ListCommand, HelpCommand, ThemeCommand, StatusCommand, _CeliaAssistant, CeliaAssistant, celia_default;
var init_celia = __esm({
  "src/cli/celia.ts"() {
    init_cjs_shims();
    init_router();
    ({ VERSION, NODE_MIN_VERSION } = require_constants());
    ({ THEMES: THEMES2 } = require_themes());
    ({ BOTS } = require_bots());
    Logger2 = (init_logger(), __toCommonJS(logger_exports));
    SystemDetector2 = (init_system(), __toCommonJS(system_exports));
    SecurityUtils2 = (init_security(), __toCommonJS(security_exports));
    PromptUtils2 = (init_prompt(), __toCommonJS(prompt_exports));
    ListCommand = require_list();
    HelpCommand = require_help();
    ThemeCommand = require_theme();
    StatusCommand = require_status();
    _CeliaAssistant = class _CeliaAssistant {
      constructor() {
        this.interactive = false;
        this.logger = new Logger2();
        this.system = new SystemDetector2();
        this.prompt = new PromptUtils2();
        this.router = new CommandRouter();
        this.initializeCommands();
      }
      /**
       * 🛡️ Verificar prerrequisitos críticos
       */
      static checkCriticalPrerequisites() {
        if (!SecurityUtils2.validateNodeVersion(NODE_MIN_VERSION)) {
          throw new Error(`Versi\xF3n de Node.js muy antigua. Se requiere >= ${NODE_MIN_VERSION}. Versi\xF3n actual: ${process.version}`);
        }
      }
      /**
       * 🛡️ Mostrar estado de prerrequisitos
       */
      showPrerequisiteStatus() {
        const missing = SecurityUtils2.checkPrerequisites();
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
            if (error.code === "SIGINT") {
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
    CeliaAssistant = _CeliaAssistant;
    celia_default = CeliaAssistant;
  }
});

// src/utils/fs.ts
var fs_exports = {};
__export(fs_exports, {
  FileSystemUtils: () => FileSystemUtils,
  default: () => fs_default
});
var _FileSystemUtils, FileSystemUtils, fs_default;
var init_fs = __esm({
  "src/utils/fs.ts"() {
    init_cjs_shims();
    _FileSystemUtils = class _FileSystemUtils {
      /**
       * Cross-platform directory removal with ARM/Termux compatibility
       */
      static removeDirectory(dirPath, system) {
        if (!fs2__namespace.existsSync(dirPath)) return;
        try {
          if (fs2__namespace.rmSync) {
            fs2__namespace.rmSync(dirPath, { recursive: true, force: true });
          } else {
            _FileSystemUtils.removeDirectoryRecursive(dirPath);
          }
        } catch (error) {
          if (system) {
            _FileSystemUtils.removeDirectoryWithSystem(dirPath, system);
          } else {
            throw error;
          }
        }
      }
      /**
       * Recursive directory removal fallback
       */
      static removeDirectoryRecursive(dirPath) {
        if (!fs2__namespace.existsSync(dirPath)) return;
        const files = fs2__namespace.readdirSync(dirPath);
        files.forEach((file) => {
          const filePath = path__namespace.join(dirPath, file);
          const stat = fs2__namespace.statSync(filePath);
          if (stat.isDirectory()) {
            _FileSystemUtils.removeDirectoryRecursive(filePath);
          } else {
            fs2__namespace.unlinkSync(filePath);
          }
        });
        fs2__namespace.rmdirSync(dirPath);
      }
      /**
       * System-specific directory removal
       */
      static removeDirectoryWithSystem(dirPath, system) {
        const SecurityUtils4 = (init_security(), __toCommonJS(security_exports));
        try {
          if (system.platform.isWindows) {
            SecurityUtils4.execSafe("rmdir", ["/s", "/q", dirPath]);
          } else if (system.isTermux) {
            try {
              SecurityUtils4.execSafe("rm", ["-rf", dirPath]);
            } catch (termuxError) {
              SecurityUtils4.execSafe("rm", ["-r", dirPath]);
            }
          } else {
            SecurityUtils4.execSafe("rm", ["-rf", dirPath]);
          }
        } catch (cmdError) {
          if (system.isARM || system.isTermux || system.isEmbedded) {
            console.log("\u26A0\uFE0F  Usando eliminaci\xF3n manual en entorno embebido/m\xF3vil");
            _FileSystemUtils.removeDirectoryRecursive(dirPath);
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
          if (!fs2__namespace.existsSync(dirPath)) {
            fs2__namespace.mkdirSync(dirPath, { recursive: true });
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
          fs2__namespace.copyFileSync(src, dest);
          return true;
        } catch (error) {
          return false;
        }
      }
      /**
       * Read file safely
       */
      static readFile(filePath, encoding = "utf8") {
        try {
          return fs2__namespace.readFileSync(filePath, encoding);
        } catch (error) {
          return null;
        }
      }
      /**
       * Write file safely
       */
      static writeFile(filePath, content, encoding = "utf8") {
        try {
          fs2__namespace.writeFileSync(filePath, content, encoding);
          return true;
        } catch (error) {
          return false;
        }
      }
      /**
       * Check if path exists
       */
      static exists(filePath) {
        return fs2__namespace.existsSync(filePath);
      }
      /**
       * Get file stats safely
       */
      static getStats(filePath) {
        try {
          return fs2__namespace.statSync(filePath);
        } catch (error) {
          return null;
        }
      }
      /**
       * Check if path is directory
       */
      static isDirectory(dirPath) {
        try {
          const stat = fs2__namespace.statSync(dirPath);
          return stat.isDirectory();
        } catch (error) {
          return false;
        }
      }
      /**
       * Check if path is file
       */
      static isFile(filePath) {
        try {
          const stat = fs2__namespace.statSync(filePath);
          return stat.isFile();
        } catch (error) {
          return false;
        }
      }
      /**
       * Get directory contents safely
       */
      static readDirectory(dirPath) {
        try {
          return fs2__namespace.readdirSync(dirPath);
        } catch (error) {
          return null;
        }
      }
      /**
       * Get file extension
       */
      static getExtension(filePath) {
        return path__namespace.extname(filePath);
      }
      /**
       * Get file name without extension
       */
      static getBaseName(filePath, ext) {
        return path__namespace.basename(filePath, ext);
      }
      /**
       * Get directory name
       */
      static getDirName(filePath) {
        return path__namespace.dirname(filePath);
      }
      /**
       * Join paths safely
       */
      static joinPath(...paths) {
        return path__namespace.join(...paths);
      }
      /**
       * Normalize path
       */
      static normalizePath(filePath) {
        return path__namespace.normalize(filePath);
      }
      /**
       * Get absolute path
       */
      static getAbsolutePath(filePath) {
        return path__namespace.resolve(filePath);
      }
    };
    __name(_FileSystemUtils, "FileSystemUtils");
    FileSystemUtils = _FileSystemUtils;
    fs_default = FileSystemUtils;
  }
});

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "opceanaicli",
      version: "2.0.0",
      description: "\xA1Holi! Soy Celia, tu asistente celestial tierna que te ayuda a instalar y cuidar de mis hermanas bot de Discord~ \u2728",
      main: "dist/index.js",
      bin: {
        opceanaicli: "./dist/cli.js",
        celia: "./dist/cli.js"
      },
      scripts: {
        start: "node dist/cli.js",
        dev: "tsup --watch",
        build: "tsup",
        "build:check": "tsc --noEmit",
        clean: "rm -rf dist",
        prepublishOnly: "npm run clean && npm run build",
        test: "node test/security.test.js && node test/logger.test.js && node test/system.test.js && node test/fs.test.js",
        "test:security": "node test/security.test.js",
        "test:logger": "node test/logger.test.js",
        "test:system": "node test/system.test.js",
        "test:fs": "node test/fs.test.js",
        "test:all": "npm test",
        "test:build": "npm run build && node dist/cli.js --version",
        version: "node dist/cli.js --version",
        help: "node dist/cli.js --help",
        lint: "tsc --noEmit",
        typecheck: "tsc --noEmit"
      },
      keywords: [
        "discord",
        "bot",
        "installer",
        "cli",
        "opceanai",
        "nebula",
        "archan",
        "sakura",
        "lumina",
        "katu",
        "termux",
        "arm",
        "typescript",
        "modular"
      ],
      author: {
        name: "guita",
        email: "guita@example.com",
        url: "https://github.com/aguitauwu"
      },
      license: "MIT",
      engines: {
        node: ">=14.0.0"
      },
      os: [
        "win32",
        "linux",
        "darwin",
        "android"
      ],
      cpu: [
        "x64",
        "ia32",
        "arm",
        "arm64",
        "armv7l",
        "aarch64"
      ],
      preferGlobal: true,
      files: [
        "dist/",
        "README.md",
        "LICENSE"
      ],
      repository: {
        type: "git",
        url: "https://github.com/aguitauwu/npm-OpceanAI.git"
      },
      bugs: {
        url: "https://github.com/aguitauwu/npm-OpceanAI/issues"
      },
      homepage: "https://github.com/aguitauwu/npm-OpceanAI#readme",
      devDependencies: {
        "@types/node": "^24.5.2",
        tsup: "^8.5.0",
        typescript: "^5.9.2"
      }
    };
  }
});

// src/index.ts
init_cjs_shims();
var CeliaAssistant2 = (init_celia(), __toCommonJS(celia_exports));
var SecurityUtils3 = (init_security(), __toCommonJS(security_exports));
var Logger3 = (init_logger(), __toCommonJS(logger_exports));
var SystemDetector3 = (init_system(), __toCommonJS(system_exports));
var CommandRouter2 = (init_router(), __toCommonJS(router_exports));
var { THEMES: THEMES3 } = require_themes();
var { BOTS: BOTS2 } = require_bots();
var { VERSION: VERSION2, NODE_MIN_VERSION: NODE_MIN_VERSION2 } = require_constants();
var FileSystemUtils2 = (init_fs(), __toCommonJS(fs_exports));
var PromptUtils3 = (init_prompt(), __toCommonJS(prompt_exports));
var version = require_package().version;

exports.BOTS = BOTS2;
exports.CeliaAssistant = CeliaAssistant2;
exports.CommandRouter = CommandRouter2;
exports.FileSystemUtils = FileSystemUtils2;
exports.Logger = Logger3;
exports.NODE_MIN_VERSION = NODE_MIN_VERSION2;
exports.PromptUtils = PromptUtils3;
exports.SecurityUtils = SecurityUtils3;
exports.SystemDetector = SystemDetector3;
exports.THEMES = THEMES3;
exports.VERSION = VERSION2;
exports.version = version;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map