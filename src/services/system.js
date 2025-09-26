/**
 * 🔍 System detection and environment analysis
 */

const os = require('os');
const fs = require('fs');

class SystemDetector {
  constructor() {
    this.detectSystemEnvironment();
  }
  
  /**
   * 🔍 Comprehensive system and processor detection~
   */
  detectSystemEnvironment() {
    const arch = os.arch();
    const platform = os.platform();
    const release = os.release();
    const cpus = os.cpus();
    
    // Enhanced architecture detection
    this.architecture = {
      raw: arch,
      family: this.getArchitectureFamily(arch),
      bits: this.getArchitectureBits(arch),
      endianness: os.endianness(),
      isLittleEndian: os.endianness() === 'LE'
    };
    
    // Enhanced platform detection  
    this.platform = {
      raw: platform,
      name: this.getPlatformName(platform),
      isUnix: ['linux', 'darwin', 'freebsd', 'openbsd', 'netbsd', 'sunos', 'aix'].includes(platform),
      isWindows: platform === 'win32',
      isMobile: this.detectMobilePlatform(),
      isContainer: this.detectContainerEnvironment(),
      release: release
    };
    
    // CPU information
    this.cpu = {
      count: cpus.length,
      model: cpus[0] ? cpus[0].model : 'Unknown',
      speed: cpus[0] ? cpus[0].speed : 0,
      vendor: this.getCpuVendor(cpus[0] ? cpus[0].model : ''),
      features: this.detectCpuFeatures()
    };
    
    // Legacy compatibility properties
    this.isTermux = !!(process.env.PREFIX && process.env.PREFIX.includes('com.termux'));
    this.isARM = this.architecture.family === 'ARM';
    
    // Extended compatibility flags
    this.isRISCV = this.architecture.family === 'RISC-V';
    this.isx86 = this.architecture.family === 'x86';
    this.isMIPS = this.architecture.family === 'MIPS';
    this.isPowerPC = this.architecture.family === 'PowerPC';
    this.is64Bit = this.architecture.bits === 64;
    this.isEmbedded = this.detectEmbeddedSystem();
  }
  
  /**
   * 🏗️ Get architecture family from Node.js arch string~
   */
  getArchitectureFamily(arch) {
    const families = {
      'arm': 'ARM',
      'arm64': 'ARM', 
      'armv7l': 'ARM',
      'aarch64': 'ARM',
      'x64': 'x86',
      'x86': 'x86',
      'ia32': 'x86',
      'mips': 'MIPS',
      'mipsel': 'MIPS',
      'ppc': 'PowerPC',
      'ppc64': 'PowerPC',
      'riscv64': 'RISC-V',
      's390': 'IBM Z',
      's390x': 'IBM Z'
    };
    return families[arch] || 'Unknown';
  }

  /**
   * 🔢 Get architecture bit width~
   */
  getArchitectureBits(arch) {
    const bits64 = ['x64', 'arm64', 'aarch64', 'ppc64', 'riscv64', 's390x'];
    return bits64.includes(arch) ? 64 : 32;
  }

  /**
   * 🖥️ Get friendly platform name~
   */
  getPlatformName(platform) {
    const names = {
      'linux': 'Linux',
      'darwin': 'macOS',
      'win32': 'Windows',
      'freebsd': 'FreeBSD',
      'openbsd': 'OpenBSD', 
      'netbsd': 'NetBSD',
      'sunos': 'Solaris',
      'aix': 'AIX'
    };
    return names[platform] || platform;
  }

  /**
   * 📱 Detect mobile platform environments~
   */
  detectMobilePlatform() {
    return !!(
      this.isTermux ||
      process.env.ANDROID_ROOT ||
      process.env.ANDROID_DATA ||
      process.env.PREFIX?.includes('com.termux') ||
      process.env.IPHONE_SIMULATOR_DEVICE_TYPE_ID ||
      process.env.REACT_NATIVE_DEBUGGER_WORKER
    );
  }

  /**
   * 🐳 Detect container environments~
   */
  detectContainerEnvironment() {
    return !!(
      process.env.container ||
      process.env.DOCKER_CONTAINER ||
      process.env.KUBERNETES_SERVICE_HOST ||
      fs.existsSync('/.dockerenv') ||
      (fs.existsSync('/proc/1/cgroup') && 
       fs.readFileSync('/proc/1/cgroup', 'utf8').includes('docker'))
    );
  }

  /**
   * 🔧 Get CPU vendor from model string~
   */
  getCpuVendor(model) {
    const modelLower = model.toLowerCase();
    if (modelLower.includes('intel')) return 'Intel';
    if (modelLower.includes('amd')) return 'AMD';
    if (modelLower.includes('arm') || modelLower.includes('cortex')) return 'ARM';
    if (modelLower.includes('apple')) return 'Apple';
    if (modelLower.includes('qualcomm')) return 'Qualcomm';
    if (modelLower.includes('broadcom')) return 'Broadcom';
    if (modelLower.includes('mediatek')) return 'MediaTek';
    return 'Unknown';
  }

  /**
   * ⚡ Detect CPU features and capabilities~
   */
  detectCpuFeatures() {
    const features = [];
    
    try {
      // Check for common CPU flags on Linux
      if (this.platform.raw === 'linux' && fs.existsSync('/proc/cpuinfo')) {
        const cpuinfo = fs.readFileSync('/proc/cpuinfo', 'utf8');
        if (cpuinfo.includes('sse')) features.push('SSE');
        if (cpuinfo.includes('sse2')) features.push('SSE2');
        if (cpuinfo.includes('avx')) features.push('AVX');
        if (cpuinfo.includes('avx2')) features.push('AVX2');
        if (cpuinfo.includes('neon')) features.push('NEON');
        if (cpuinfo.includes('vfp')) features.push('VFP');
      }
    } catch (error) {
      // Silent fail - feature detection is optional
    }
    
    return features;
  }

  /**
   * 🤖 Detect embedded system environments~
   */
  detectEmbeddedSystem() {
    return !!(
      this.isTermux ||
      this.platform.isMobile ||
      process.env.OPENWRT_BUILD ||
      process.env.BUILDROOT_BUILD ||
      (this.cpu.count === 1 && this.cpu.speed < 1000) ||
      (this.isARM && this.platform.raw === 'linux')
    );
  }

  /**
   * 🏷️ Get friendly system type description~
   */
  getSystemType() {
    if (this.isTermux) return 'Termux Android';
    if (this.platform.isMobile) return 'sistema móvil';
    if (this.isEmbedded) return 'sistema embebido';
    if (this.platform.isContainer) return 'contenedor';
    if (this.isRISCV) return 'RISC-V';
    if (this.isARM && this.is64Bit) return 'ARM 64-bit';
    if (this.isARM) return 'ARM 32-bit';
    return 'tu sistema';
  }

  /**
   * ⚡ Get processor-optimized installation commands~
   */
  getOptimizedInstallCommand(language, targetDir) {
    const baseCommands = {
      'Node.js': 'npm install',
      'Python': 'pip install -r requirements.txt',
      'TypeScript': 'npm install && npm run build'
    };

    let command = baseCommands[language] || 'npm install';
    
    // Apply processor-specific optimizations
    if (this.isARM || this.isEmbedded) {
      // Use fewer parallel jobs on ARM/embedded to avoid memory issues
      if (language === 'Node.js' || language === 'TypeScript') {
        command = command.replace('npm install', 'npm install --maxsockets 1');
      }
    }
    
    if (this.isRISCV) {
      // RISC-V may need single-threaded builds
      if (language === 'Node.js' || language === 'TypeScript') {
        command = command.replace('npm install', 'npm install --maxsockets 1 --progress false');
      }
    }
    
    if (this.cpu.count === 1) {
      // Single core systems - be gentle
      if (language === 'Python') {
        command = command.replace('pip install', 'pip install --no-cache-dir');
      }
    }
    
    return command;
  }

  /**
   * 🎯 Get system-specific recommendations~
   */
  getSystemRecommendations() {
    const recommendations = [];
    
    if (this.isARM && this.platform.raw === 'linux') {
      recommendations.push('💡 ARM Linux: Considera usar binarios pre-compilados cuando sea posible');
    }
    
    if (this.isRISCV) {
      recommendations.push('🆕 RISC-V: Arquitectura experimental - reporta cualquier problema');
    }
    
    if (this.isEmbedded) {
      recommendations.push('⚡ Sistema embebido: Funcionalidad optimizada automáticamente');
    }
    
    if (this.cpu.count === 1) {
      recommendations.push('🐌 Un solo núcleo: Instalaciones serán más lentas pero funcionales');
    }
    
    if (this.cpu.speed > 0 && this.cpu.speed < 1000) {
      recommendations.push('🕐 CPU lenta detectada: Paciencia durante instalaciones');
    }
    
    if (this.platform.isContainer) {
      recommendations.push('🐳 Contenedor: Algunas funciones del sistema pueden estar limitadas');
    }
    
    return recommendations;
  }
}

module.exports = SystemDetector;