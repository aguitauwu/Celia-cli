/**
 * Tests for Logger utilities
 */

const Logger = require('../src/utils/logger');
const { THEMES } = require('../src/config/themes');

// Simple test framework
function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.error(`❌ ${name}: ${error.message}`);
  }
}

function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
  }
}

function assertTrue(value, message = '') {
  if (!value) {
    throw new Error(`Expected truthy value. ${message}`);
  }
}

// Logger tests
console.log('🧪 Running Logger Tests...\n');

test('Logger - default theme initialization', () => {
  const logger = new Logger();
  assertEqual(logger.theme, 'celestial');
});

test('Logger - custom theme initialization', () => {
  const logger = new Logger('kawaii');
  assertEqual(logger.theme, 'kawaii');
});

test('Logger - setTheme changes theme', () => {
  const logger = new Logger();
  logger.setTheme('dreamy');
  assertEqual(logger.theme, 'dreamy');
});

test('Logger - setTheme ignores invalid theme', () => {
  const logger = new Logger();
  const originalTheme = logger.theme;
  logger.setTheme('invalid');
  assertEqual(logger.theme, originalTheme);
});

test('Logger - getTheme returns theme object', () => {
  const logger = new Logger('celestial');
  const theme = logger.getTheme();
  assertTrue(theme.primary);
  assertTrue(theme.reset);
  assertEqual(theme, THEMES.celestial);
});

test('Logger - convenience methods exist', () => {
  const logger = new Logger();
  assertTrue(typeof logger.info === 'function');
  assertTrue(typeof logger.success === 'function');
  assertTrue(typeof logger.warning === 'function');
  assertTrue(typeof logger.error === 'function');
  assertTrue(typeof logger.dim === 'function');
  assertTrue(typeof logger.bright === 'function');
});

test('Logger - createBox handles string input', () => {
  const logger = new Logger();
  // This should not throw
  logger.createBox('Test message');
});

test('Logger - createBox handles array input', () => {
  const logger = new Logger();
  // This should not throw
  logger.createBox(['Line 1', 'Line 2', 'Line 3']);
});

test('Logger - gradientLog handles different color arrays', () => {
  const logger = new Logger();
  // This should not throw
  logger.gradientLog('Test gradient', ['primary', 'secondary']);
  logger.gradientLog('Test single', ['accent']);
});

console.log('\n🎉 Logger tests completed!');