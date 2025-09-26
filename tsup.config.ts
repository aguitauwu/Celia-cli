import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    // Main CLI entry point
    cli: 'src/bin/cli.ts',
    // Library entry for programmatic usage
    index: 'src/index.ts'
  },
  format: ['cjs'],
  target: 'node14',
  platform: 'node',
  
  // Output configuration
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  dts: true,
  
  // Bundle configuration
  bundle: true,
  splitting: false,
  treeshake: true,
  minify: false, // Keep readable for debugging
  
  // Node.js specific
  shims: true,
  keepNames: true,
  
  // Banner for CLI executable (only if no shebang already exists)
  banner: {
    js: ''
  },
  
  // External dependencies (don't bundle these)
  external: [],
  
  // TypeScript configuration
  tsconfig: './tsconfig.json',
  
  onSuccess: async () => {
    // Make CLI executable
    const { chmod } = await import('fs/promises');
    try {
      await chmod('dist/cli.js', '755');
      console.log('✅ CLI binary made executable');
    } catch (error) {
      console.warn('⚠️ Could not make CLI executable:', error);
    }
  }
});