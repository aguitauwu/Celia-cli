/**
 * 🔍 System detection and environment analysis
 */

import * as os from 'os';
import * as fs from 'fs';
import { ISystemDetector, ISystemArchitecture, ISystemPlatform, ISystemCPU } from '../types/system';

export class SystemDetector implements ISystemDetector {
  public architecture: ISystemArchitecture;
  public platform: ISystemPlatform;
  public cpu: ISystemCPU;
  public isTermux: boolean;
  public isARM: boolean;
  public isRISCV: boolean;
  public isx86: boolean;
  public isMIPS: boolean;
  public isPowerPC: boolean;
  public is64Bit: boolean;
  public isEmbedded: boolean;

  constructor() {
    // Initialize properties to avoid undefined issues
    this.architecture = {} as ISystemArchitecture;
    this.platform = {} as ISystemPlatform;
    this.cpu = {} as ISystemCPU;
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
  private detectSystemEnvironment(): void {
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
  private getArchitectureFamily(arch: string): string {
    const families: { [key: string]: string } = {
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
  private getArchitectureBits(arch: string): number {
    const bits64 = ['x64', 'arm64', 'aarch64', 'ppc64', 'riscv64', 's390x'];
    return bits64.includes(arch) ? 64 : 32;
  }

  /**
   * 🖥️ Get friendly platform name~
   */
  private getPlatformName(platform: string): string {
    const names: { [key: string]: string } = {
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
  private detectMobilePlatform(): boolean {
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
  private detectContainerEnvironment(): boolean {
    try {
      return !!(
        process.env.container ||
        process.env.DOCKER_CONTAINER ||
        process.env.KUBERNETES_SERVICE_HOST ||
        fs.existsSync('/.dockerenv') ||
        (fs.existsSync('/proc/1/cgroup') && 
         fs.readFileSync('/proc/1/cgroup', 'utf8').includes('docker'))
      );
    } catch (error) {
      return false;
    }
  }

  /**
   * 🔧 Get CPU vendor from model string~
   */
  private getCpuVendor(model: string): string {
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
  private detectCpuFeatures(): string[] {
    const features: string[] = [];
    
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
  private detectEmbeddedSystem(): boolean {
    return !!(
      this.isARM && 
      (this.cpu.count <= 4 && this.cpu.speed < 2000) ||
      this.isTermux ||
      process.env.EMBEDDED_DEVICE ||
      this.platform.isMobile
    );
  }

  /**
   * 📋 Generate system compatibility report~
   */
  generateCompatibilityReport(): string[] {
    const report: string[] = [];
    
    report.push(`Sistema: ${this.platform.name} (${this.platform.raw})`);
    report.push(`Arquitectura: ${this.architecture.family} ${this.architecture.bits}-bit`);
    report.push(`CPU: ${this.cpu.vendor} ${this.cpu.model} (${this.cpu.count} cores)`);
    
    if (this.platform.isMobile) report.push('✓ Plataforma móvil detectada');
    if (this.platform.isContainer) report.push('✓ Entorno contenedorizado');
    if (this.isTermux) report.push('✓ Termux Android detectado');
    if (this.isEmbedded) report.push('✓ Sistema embebido detectado');
    
    if (this.cpu.features.length > 0) {
      report.push(`Características CPU: ${this.cpu.features.join(', ')}`);
    }
    
    return report;
  }

  /**
   * 🎯 Get performance recommendations based on system~
   */
  getPerformanceRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.isEmbedded || this.cpu.count <= 2) {
      recommendations.push('Usar configuraciones de bajo consumo');
      recommendations.push('Limitar concurrencia de procesos');
    }
    
    if (this.isARM) {
      recommendations.push('Usar binarios compilados para ARM cuando sea posible');
      if (this.architecture.bits === 32) {
        recommendations.push('Cuidado con límites de memoria en ARM 32-bit');
      }
    }
    
    if (this.isTermux) {
      recommendations.push('Usar comandos compatibles con Termux');
      recommendations.push('Verificar permisos de almacenamiento');
    }
    
    if (this.platform.isContainer) {
      recommendations.push('Optimizar para entornos contenedorizados');
      recommendations.push('Considerar límites de recursos del contenedor');
    }
    
    return recommendations;
  }
}

export default SystemDetector;