/**
 * 🗄️ Sistema de backup para configuraciones de las hermanas
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { Logger } from '../utils/logger';
import { BOTS } from '../config/bots';
import { IBotConfig } from '../types/bots';

export interface IBackupConfig {
  name: string;
  timestamp: Date;
  botConfigs: IBotBackup[];
  metadata: {
    version: string;
    celiaVersion: string;
    systemInfo: any;
  };
}

export interface IBotBackup {
  botKey: string;
  botName: string;
  envVars: { [key: string]: string };
  configFiles: IFileBackup[];
  installedDependencies?: any;
}

export interface IFileBackup {
  filename: string;
  content: string;
  checksum: string;
}

export interface IBackupMetadata {
  id: string;
  name: string;
  timestamp: Date;
  size: number;
  botCount: number;
  description?: string;
}

export class BackupManager {
  private logger: Logger;
  private backupDir: string;
  private metadataFile: string;

  constructor(logger: Logger, backupDir: string = './celia-backups') {
    this.logger = logger;
    this.backupDir = backupDir;
    this.metadataFile = path.join(backupDir, 'backup-metadata.json');
    
    this.ensureBackupDirectory();
  }

  /**
   * 💾 Crear backup completo de todas las configuraciones
   */
  async createFullBackup(name?: string, description?: string): Promise<string> {
    const backupName = name || `backup_${new Date().toISOString().replace(/[:.]/g, '-')}`;
    
    this.logger.gradientLog('💾 Creando backup completo...', ['primary', 'accent']);
    await this.logger.showLoading('Recopilando configuraciones', 2000);

    const backup: IBackupConfig = {
      name: backupName,
      timestamp: new Date(),
      botConfigs: [],
      metadata: {
        version: '1.0.0',
        celiaVersion: '2.0.0',
        systemInfo: this.getSystemInfo()
      }
    };

    // Buscar y respaldar cada hermana bot
    for (const [botKey, bot] of Object.entries(BOTS)) {
      try {
        const botBackup = await this.backupBot(botKey, bot);
        if (botBackup) {
          backup.botConfigs.push(botBackup);
        }
      } catch (error) {
        this.logger.warning(`⚠️ No se pudo respaldar ${bot.name}: ${error instanceof Error ? error.message : error}`);
      }
    }

    // Guardar backup
    const backupId = this.generateBackupId();
    const backupFilePath = path.join(this.backupDir, `${backupId}.json`);
    
    await fs.promises.writeFile(backupFilePath, JSON.stringify(backup, null, 2), 'utf8');
    
    // Actualizar metadata
    await this.updateBackupMetadata({
      id: backupId,
      name: backupName,
      timestamp: backup.timestamp,
      size: (await fs.promises.stat(backupFilePath)).size,
      botCount: backup.botConfigs.length,
      description
    });

    this.logger.success(`✅ Backup creado exitosamente: ${backupId}`);
    this.logger.info(`📁 Ubicación: ${backupFilePath}`);
    this.logger.info(`🤖 Hermanas respaldadas: ${backup.botConfigs.length}`);

    return backupId;
  }

  /**
   * 🔄 Restaurar backup completo
   */
  async restoreBackup(backupId: string, restoreOptions?: {
    overwriteExisting?: boolean;
    selectiveBots?: string[];
    createBackupBeforeRestore?: boolean;
  }): Promise<void> {
    const options = {
      overwriteExisting: false,
      createBackupBeforeRestore: true,
      ...restoreOptions
    };

    this.logger.gradientLog('🔄 Restaurando backup...', ['accent', 'primary']);
    
    // Crear backup actual antes de restaurar (si se solicita)
    if (options.createBackupBeforeRestore) {
      this.logger.info('📝 Creando backup de respaldo antes de restaurar...');
      await this.createFullBackup(`pre_restore_${Date.now()}`, 'Backup automático antes de restaurar');
    }

    // Cargar backup
    const backupFilePath = path.join(this.backupDir, `${backupId}.json`);
    if (!fs.existsSync(backupFilePath)) {
      throw new Error(`Backup ${backupId} no encontrado`);
    }

    const backupContent = await fs.promises.readFile(backupFilePath, 'utf8');
    const backup: IBackupConfig = JSON.parse(backupContent);

    this.logger.info(`📅 Backup del: ${backup.timestamp}`);
    this.logger.info(`🤖 Hermanas a restaurar: ${backup.botConfigs.length}`);

    await this.logger.showLoading('Restaurando configuraciones', 1500);

    // Restaurar cada bot
    for (const botBackup of backup.botConfigs) {
      if (options.selectiveBots && !options.selectiveBots.includes(botBackup.botKey)) {
        continue; // Saltar bots no seleccionados
      }

      try {
        await this.restoreBot(botBackup, options.overwriteExisting);
        this.logger.success(`✅ ${botBackup.botName} restaurado`);
      } catch (error) {
        this.logger.error(`❌ Error restaurando ${botBackup.botName}: ${error instanceof Error ? error.message : error}`);
      }
    }

    this.logger.sparkleLog('🎉 Restauración completada!', 'success');
  }

  /**
   * 📋 Listar todos los backups disponibles
   */
  async listBackups(): Promise<IBackupMetadata[]> {
    if (!fs.existsSync(this.metadataFile)) {
      return [];
    }

    const metadataContent = await fs.promises.readFile(this.metadataFile, 'utf8');
    const metadata = JSON.parse(metadataContent);
    
    return metadata.backups || [];
  }

  /**
   * 🗑️ Eliminar backup
   */
  async deleteBackup(backupId: string): Promise<void> {
    const backupFilePath = path.join(this.backupDir, `${backupId}.json`);
    
    if (!fs.existsSync(backupFilePath)) {
      throw new Error(`Backup ${backupId} no encontrado`);
    }

    await fs.promises.unlink(backupFilePath);
    
    // Actualizar metadata
    const backups = await this.listBackups();
    const filteredBackups = backups.filter(b => b.id !== backupId);
    
    await this.saveBackupMetadata(filteredBackups);
    
    this.logger.success(`🗑️ Backup ${backupId} eliminado`);
  }

  /**
   * 📊 Mostrar dashboard de backups
   */
  async showBackupDashboard(): Promise<void> {
    console.clear();
    this.logger.gradientLog('🗄️ Sistema de Backup de Celia', ['primary', 'secondary']);
    console.log('');

    const backups = await this.listBackups();
    
    if (backups.length === 0) {
      this.logger.warning('📭 No hay backups disponibles');
      this.logger.info('💡 Crea tu primer backup con: celia backup create');
      return;
    }

    // Estadísticas generales
    const totalSize = backups.reduce((sum, backup) => sum + backup.size, 0);
    const stats = [
      `📊 Total de Backups: ${backups.length}`,
      `💾 Espacio usado: ${this.formatFileSize(totalSize)}`,
      `📅 Último backup: ${backups[0]?.timestamp ? new Date(backups[0].timestamp).toLocaleString() : 'N/A'}`,
      `📍 Directorio: ${this.backupDir}`
    ];

    this.logger.createBox(stats, 'info', 1);
    console.log('');

    // Lista de backups
    this.logger.log('📋 Backups Disponibles:', 'accent');
    console.log('');

    // Ordenar por fecha (más reciente primero)
    const sortedBackups = backups.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    for (const backup of sortedBackups.slice(0, 10)) { // Mostrar solo los últimos 10
      const age = this.getTimeAgo(new Date(backup.timestamp));
      const backupInfo = [
        `🆔 ID: ${backup.id}`,
        `📝 Nombre: ${backup.name}`,
        `📅 Fecha: ${new Date(backup.timestamp).toLocaleString()}`,
        `⏰ Antigüedad: ${age}`,
        `🤖 Hermanas: ${backup.botCount}`,
        `💾 Tamaño: ${this.formatFileSize(backup.size)}`,
        ...(backup.description ? [`📄 Descripción: ${backup.description}`] : [])
      ];

      this.logger.createBox(backupInfo, 'primary', 1);
      console.log('');
    }

    if (sortedBackups.length > 10) {
      this.logger.log(`... y ${sortedBackups.length - 10} backups más`, 'dim');
      console.log('');
    }

    // Comandos disponibles
    const commands = [
      '⌨️  Comandos disponibles:',
      '   celia backup create [nombre] - Crear nuevo backup',
      '   celia backup restore <id> - Restaurar backup',
      '   celia backup list - Ver todos los backups',
      '   celia backup delete <id> - Eliminar backup',
      '   celia backup info <id> - Ver detalles de backup'
    ];

    this.logger.createBox(commands, 'warning', 1);
  }

  /**
   * 🤖 Respaldar configuración de una hermana específica
   */
  private async backupBot(botKey: string, bot: IBotConfig): Promise<IBotBackup | null> {
    // Buscar directorio del bot
    const possiblePaths = [
      `./${bot.name.toLowerCase()}-bot`,
      `./${botKey}-bot`,
      `./${bot.name.toLowerCase()}`,
      `./${botKey}`
    ];

    let botPath: string | null = null;
    for (const pathCandidate of possiblePaths) {
      if (fs.existsSync(pathCandidate)) {
        botPath = pathCandidate;
        break;
      }
    }

    if (!botPath) {
      this.logger.warning(`📁 Directorio no encontrado para ${bot.name}`);
      return null;
    }

    const backup: IBotBackup = {
      botKey,
      botName: bot.name,
      envVars: {},
      configFiles: []
    };

    // Respaldar archivo .env
    const envPath = path.join(botPath, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = await fs.promises.readFile(envPath, 'utf8');
      const envVars = this.parseEnvFile(envContent);
      backup.envVars = envVars;
    }

    // Respaldar archivos de configuración importantes
    const configFiles = ['.env', '.env.example', 'config.json', 'config.js', 'config.ts'];
    
    for (const filename of configFiles) {
      const filePath = path.join(botPath, filename);
      if (fs.existsSync(filePath)) {
        const content = await fs.promises.readFile(filePath, 'utf8');
        const checksum = crypto.createHash('md5').update(content).digest('hex');
        
        backup.configFiles.push({
          filename,
          content,
          checksum
        });
      }
    }

    // Respaldar información de dependencias
    const packageJsonPath = path.join(botPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageContent = await fs.promises.readFile(packageJsonPath, 'utf8');
      backup.installedDependencies = JSON.parse(packageContent);
    }

    return backup;
  }

  /**
   * 🔄 Restaurar configuración de una hermana específica
   */
  private async restoreBot(botBackup: IBotBackup, overwriteExisting: boolean): Promise<void> {
    const bot = BOTS[botBackup.botKey as keyof typeof BOTS];
    if (!bot) {
      throw new Error(`Configuración del bot ${botBackup.botKey} no encontrada`);
    }

    // Crear directorio si no existe
    const botDirName = `${bot.name.toLowerCase()}-bot`;
    const botPath = `./${botDirName}`;
    
    if (!fs.existsSync(botPath)) {
      this.logger.info(`📁 Creando directorio para ${bot.name}...`);
      await fs.promises.mkdir(botPath, { recursive: true });
    }

    // Restaurar archivos de configuración
    for (const fileBackup of botBackup.configFiles) {
      const filePath = path.join(botPath, fileBackup.filename);
      
      // Verificar si el archivo existe y si debemos sobrescribir
      if (fs.existsSync(filePath) && !overwriteExisting) {
        this.logger.warning(`⚠️ Archivo ${fileBackup.filename} ya existe, saltando...`);
        continue;
      }

      // Verificar integridad con checksum
      const expectedChecksum = crypto.createHash('md5').update(fileBackup.content).digest('hex');
      if (expectedChecksum !== fileBackup.checksum) {
        this.logger.error(`❌ Checksum inválido para ${fileBackup.filename}`);
        continue;
      }

      await fs.promises.writeFile(filePath, fileBackup.content, 'utf8');
      this.logger.info(`✅ Restaurado: ${fileBackup.filename}`);
    }

    this.logger.success(`🎉 ${botBackup.botName} restaurado exitosamente`);
  }

  /**
   * 🔧 Utilidades privadas
   */
  private ensureBackupDirectory(): void {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  private generateBackupId(): string {
    return `backup_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  }

  private getSystemInfo(): any {
    return {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    };
  }

  private parseEnvFile(content: string): { [key: string]: string } {
    const envVars: { [key: string]: string } = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    }
    
    return envVars;
  }

  private async updateBackupMetadata(metadata: IBackupMetadata): Promise<void> {
    const backups = await this.listBackups();
    backups.unshift(metadata); // Agregar al inicio
    await this.saveBackupMetadata(backups);
  }

  private async saveBackupMetadata(backups: IBackupMetadata[]): Promise<void> {
    const metadata = { backups };
    await fs.promises.writeFile(this.metadataFile, JSON.stringify(metadata, null, 2), 'utf8');
  }

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }

  private getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'hace menos de un minuto';
  }
}

export default BackupManager;