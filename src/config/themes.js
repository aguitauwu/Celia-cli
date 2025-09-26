/**
 * 🌸 Celia's beautiful theme system
 */

const THEMES = {
  celestial: {
    primary: '\x1b[38;5;147m',     // Light purple
    secondary: '\x1b[38;5;183m',   // Pink
    accent: '\x1b[38;5;219m',      // Rose
    success: '\x1b[38;5;157m',     // Mint green
    warning: '\x1b[38;5;221m',     // Golden
    error: '\x1b[38;5;210m',       // Soft red
    info: '\x1b[38;5;159m',        // Sky blue
    text: '\x1b[38;5;250m',        // Light gray
    dim: '\x1b[38;5;244m',         // Dim gray
    bright: '\x1b[38;5;15m',       // White
    reset: '\x1b[0m'
  },
  kawaii: {
    primary: '\x1b[38;5;213m',     // Hot pink
    secondary: '\x1b[38;5;225m',   // Light pink
    accent: '\x1b[38;5;207m',      // Deep pink
    success: '\x1b[38;5;121m',     // Bright green
    warning: '\x1b[38;5;226m',     // Bright yellow
    error: '\x1b[38;5;203m',       // Red
    info: '\x1b[38;5;117m',        // Light blue
    text: '\x1b[38;5;255m',        // Bright white
    dim: '\x1b[38;5;242m',         // Medium gray
    bright: '\x1b[38;5;15m',       // White
    reset: '\x1b[0m'
  },
  dreamy: {
    primary: '\x1b[38;5;140m',     // Purple
    secondary: '\x1b[38;5;176m',   // Lavender
    accent: '\x1b[38;5;104m',      // Deep purple
    success: '\x1b[38;5;151m',     // Soft green
    warning: '\x1b[38;5;179m',     // Peach
    error: '\x1b[38;5;167m',       // Soft coral
    info: '\x1b[38;5;109m',        // Soft blue
    text: '\x1b[38;5;252m',        // Off white
    dim: '\x1b[38;5;240m',         // Dark gray
    bright: '\x1b[38;5;15m',       // White
    reset: '\x1b[0m'
  }
};

module.exports = {
  THEMES,
  DEFAULT_THEME: 'celestial'
};