/**
 * 🔧 System Type Definitions for Platform Detection
 */

export interface ISystemArchitecture {
  raw: string;
  family: string;
  bits: number;
  endianness: string;
  isLittleEndian: boolean;
}

export interface ISystemPlatform {
  raw: string;
  name: string;
  isUnix: boolean;
  isWindows: boolean;
  isMobile: boolean;
  isContainer: boolean;
  release: string;
}

export interface ISystemCPU {
  count: number;
  model: string;
  speed: number;
  vendor: string;
  features: string[];
}

export interface ISystemDetector {
  architecture: ISystemArchitecture;
  platform: ISystemPlatform;
  cpu: ISystemCPU;
  isTermux: boolean;
  isARM: boolean;
  isRISCV: boolean;
  isx86: boolean;
  isMIPS: boolean;
  isPowerPC: boolean;
  is64Bit: boolean;
  isEmbedded: boolean;
}