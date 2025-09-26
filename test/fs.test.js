/**
 * Tests for FileSystem utilities
 */

const FileSystemUtils = require('../src/utils/fs');
const fs = require('fs');
const path = require('path');

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

function assertFalse(value, message = '') {
  if (value) {
    throw new Error(`Expected falsy value. ${message}`);
  }
}

// FileSystem tests
console.log('🧪 Running FileSystem Tests...\n');

test('FileSystemUtils - ensureDirectory creates directory', () => {
  const testDir = path.join(__dirname, 'test-temp-dir');
  
  // Clean up first
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
  
  const result = FileSystemUtils.ensureDirectory(testDir);
  assertTrue(result);
  assertTrue(fs.existsSync(testDir));
  
  // Clean up
  fs.rmSync(testDir, { recursive: true, force: true });
});

test('FileSystemUtils - ensureDirectory handles existing directory', () => {
  const testDir = path.join(__dirname, 'test-existing-dir');
  
  // Create directory first
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  const result = FileSystemUtils.ensureDirectory(testDir);
  assertTrue(result);
  assertTrue(fs.existsSync(testDir));
  
  // Clean up
  fs.rmSync(testDir, { recursive: true, force: true });
});

test('FileSystemUtils - writeFile and readFile work together', () => {
  const testFile = path.join(__dirname, 'test-file.txt');
  const testContent = 'Hello, Celia! 🌸';
  
  // Clean up first
  if (fs.existsSync(testFile)) {
    fs.unlinkSync(testFile);
  }
  
  const writeResult = FileSystemUtils.writeFile(testFile, testContent);
  assertTrue(writeResult);
  
  const readContent = FileSystemUtils.readFile(testFile);
  assertTrue(readContent === testContent);
  
  // Clean up
  fs.unlinkSync(testFile);
});

test('FileSystemUtils - readFile returns null for non-existent file', () => {
  const nonExistentFile = path.join(__dirname, 'does-not-exist.txt');
  const result = FileSystemUtils.readFile(nonExistentFile);
  assertTrue(result === null);
});

test('FileSystemUtils - isReadable works correctly', () => {
  const testFile = path.join(__dirname, 'test-readable.txt');
  
  // Create test file
  fs.writeFileSync(testFile, 'test content');
  
  assertTrue(FileSystemUtils.isReadable(testFile));
  assertFalse(FileSystemUtils.isReadable('non-existent-file.txt'));
  
  // Clean up
  fs.unlinkSync(testFile);
});

test('FileSystemUtils - removeDirectory with spaces in path', () => {
  const testDir = path.join(__dirname, 'test dir with spaces');
  
  // Create directory with a file inside
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(path.join(testDir, 'test file.txt'), 'content');
  }
  
  assertTrue(fs.existsSync(testDir));
  
  // Test removal
  FileSystemUtils.removeDirectory(testDir);
  assertFalse(fs.existsSync(testDir));
});

test('FileSystemUtils - getStats returns valid stats for existing file', () => {
  const testFile = path.join(__dirname, 'test-stats.txt');
  
  // Create test file
  fs.writeFileSync(testFile, 'test content for stats');
  
  const stats = FileSystemUtils.getStats(testFile);
  assertTrue(stats !== null);
  assertTrue(stats.isFile());
  
  // Clean up
  fs.unlinkSync(testFile);
});

test('FileSystemUtils - getStats returns null for non-existent file', () => {
  const stats = FileSystemUtils.getStats('does-not-exist.txt');
  assertTrue(stats === null);
});

console.log('\n🎉 FileSystem tests completed!');