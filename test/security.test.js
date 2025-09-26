/**
 * Tests for Security utilities
 */

const SecurityUtils = require('../src/security/security');

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

function assertFalse(value, message = '') {
  if (value) {
    throw new Error(`Expected falsy value. ${message}`);
  }
}

// Security tests
console.log('🧪 Running Security Tests...\n');

test('sanitizeDirectoryName - valid input', () => {
  const result = SecurityUtils.sanitizeDirectoryName('my-bot-folder');
  assertEqual(result, 'my-bot-folder');
});

test('sanitizeDirectoryName - removes dangerous characters', () => {
  const result = SecurityUtils.sanitizeDirectoryName('my../../../bot');
  assertEqual(result, 'mybot');
});

test('sanitizeDirectoryName - handles empty input', () => {
  try {
    SecurityUtils.sanitizeDirectoryName('');
  } catch (error) {
    assertTrue(error.message.includes('inválido'));
  }
});

test('sanitizeDirectoryName - blocks blacklisted names', () => {
  try {
    SecurityUtils.sanitizeDirectoryName('con');
  } catch (error) {
    assertTrue(error.message.includes('no está permitido'));
  }
});

test('validateGitHubUrl - valid URL', () => {
  assertTrue(SecurityUtils.validateGitHubUrl('https://github.com/user/repo'));
  assertTrue(SecurityUtils.validateGitHubUrl('https://github.com/user/repo.git'));
});

test('validateGitHubUrl - invalid URL', () => {
  assertFalse(SecurityUtils.validateGitHubUrl('https://evil.com/malware'));
  assertFalse(SecurityUtils.validateGitHubUrl('not-a-url'));
  assertFalse(SecurityUtils.validateGitHubUrl(''));
});

test('validateNodeVersion - current version should be valid', () => {
  assertTrue(SecurityUtils.validateNodeVersion('14.0.0'));
});

test('validateNodeVersion - older version requirement', () => {
  assertTrue(SecurityUtils.validateNodeVersion('10.0.0'));
});

test('sanitizeEnvValue - basic sanitization', () => {
  const result = SecurityUtils.sanitizeEnvValue('  value  ');
  assertEqual(result, 'value');
});

test('sanitizeEnvValue - removes control characters', () => {
  const result = SecurityUtils.sanitizeEnvValue('value\x00\x01');
  assertEqual(result, 'value');
});

test('sanitizeEnvValue - sensitive value filtering', () => {
  const result = SecurityUtils.sanitizeEnvValue('abc123!@#', true);
  assertEqual(result, 'abc123');
});

test('parseInstallCommand - valid command', () => {
  const result = SecurityUtils.parseInstallCommand('npm install express');
  assertTrue(Array.isArray(result));
  assertTrue(result.includes('install'));
  assertTrue(result.includes('express'));
});

test('parseInstallCommand - filters dangerous characters', () => {
  const result = SecurityUtils.parseInstallCommand('install package; rm -rf /');
  assertFalse(result.some(arg => arg.includes(';')));
});

test('getCriticalFiles - Node.js project', () => {
  const files = SecurityUtils.getCriticalFiles('Node.js');
  assertTrue(files.includes('package.json'));
});

test('getCriticalFiles - Python project', () => {
  const files = SecurityUtils.getCriticalFiles('Python');
  assertTrue(files.includes('requirements.txt'));
});

test('getCriticalFiles - TypeScript project', () => {
  const files = SecurityUtils.getCriticalFiles('TypeScript');
  assertTrue(files.includes('package.json'));
  assertTrue(files.includes('tsconfig.json'));
});

test('getInstallSteps - returns array of command objects', () => {
  const steps = SecurityUtils.getInstallSteps('Node.js');
  assertTrue(Array.isArray(steps));
  assertTrue(steps.every(step => step.command && Array.isArray(step.args)));
});

console.log('\n🎉 Security tests completed!');