/**
 * Tests for System Detection
 */

const SystemDetector = require('../src/services/system');

// Simple test framework
function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.error(`❌ ${name}: ${error.message}`);
  }
}

function assertTrue(value, message = '') {
  if (!value) {
    throw new Error(`Expected truthy value. ${message}`);
  }
}

function assertType(value, type, message = '') {
  if (typeof value !== type) {
    throw new Error(`Expected ${type}, got ${typeof value}. ${message}`);
  }
}

// System tests
console.log('🧪 Running System Detection Tests...\n');

test('SystemDetector - initializes properly', () => {
  const system = new SystemDetector();
  assertTrue(system.architecture);
  assertTrue(system.platform);
  assertTrue(system.cpu);
});

test('SystemDetector - architecture detection', () => {
  const system = new SystemDetector();
  assertType(system.architecture.raw, 'string');
  assertType(system.architecture.family, 'string');
  assertType(system.architecture.bits, 'number');
  assertTrue(system.architecture.bits === 32 || system.architecture.bits === 64);
});

test('SystemDetector - platform detection', () => {
  const system = new SystemDetector();
  assertType(system.platform.raw, 'string');
  assertType(system.platform.name, 'string');
  assertType(system.platform.isUnix, 'boolean');
  assertType(system.platform.isWindows, 'boolean');
  assertType(system.platform.isMobile, 'boolean');
});

test('SystemDetector - CPU information', () => {
  const system = new SystemDetector();
  assertType(system.cpu.count, 'number');
  assertTrue(system.cpu.count > 0);
  assertType(system.cpu.model, 'string');
  assertType(system.cpu.vendor, 'string');
  assertTrue(Array.isArray(system.cpu.features));
});

test('SystemDetector - compatibility flags', () => {
  const system = new SystemDetector();
  assertType(system.isTermux, 'boolean');
  assertType(system.isARM, 'boolean');
  assertType(system.isRISCV, 'boolean');
  assertType(system.isx86, 'boolean');
  assertType(system.is64Bit, 'boolean');
  assertType(system.isEmbedded, 'boolean');
});

test('SystemDetector - getSystemType returns string', () => {
  const system = new SystemDetector();
  const systemType = system.getSystemType();
  assertType(systemType, 'string');
  assertTrue(systemType.length > 0);
});

test('SystemDetector - getOptimizedInstallCommand', () => {
  const system = new SystemDetector();
  const nodeCmd = system.getOptimizedInstallCommand('Node.js');
  assertType(nodeCmd, 'string');
  assertTrue(nodeCmd.includes('npm') || nodeCmd.includes('install'));
  
  const pythonCmd = system.getOptimizedInstallCommand('Python');
  assertType(pythonCmd, 'string');
  assertTrue(pythonCmd.includes('pip'));
});

test('SystemDetector - getSystemRecommendations', () => {
  const system = new SystemDetector();
  const recommendations = system.getSystemRecommendations();
  assertTrue(Array.isArray(recommendations));
});

test('SystemDetector - architecture family detection', () => {
  const system = new SystemDetector();
  const family = system.getArchitectureFamily('x64');
  assertTrue(family === 'x86');
  
  const armFamily = system.getArchitectureFamily('arm64');
  assertTrue(armFamily === 'ARM');
});

test('SystemDetector - architecture bits detection', () => {
  const system = new SystemDetector();
  const bits64 = system.getArchitectureBits('x64');
  assertTrue(bits64 === 64);
  
  const bits32 = system.getArchitectureBits('ia32');
  assertTrue(bits32 === 32);
});

test('SystemDetector - platform name detection', () => {
  const system = new SystemDetector();
  const linuxName = system.getPlatformName('linux');
  assertTrue(linuxName === 'Linux');
  
  const winName = system.getPlatformName('win32');
  assertTrue(winName === 'Windows');
  
  const macName = system.getPlatformName('darwin');
  assertTrue(macName === 'macOS');
});

console.log('\n🎉 System detection tests completed!');