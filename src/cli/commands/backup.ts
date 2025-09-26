/**
 * 🗄️ Backup command - Configuration backup and restore
 */

import { Logger } from '../../utils/logger';
import { BackupManager } from '../../services/backup';
import { PromptUtils } from '../../utils/prompt';

export class BackupCommand {
  private logger: Logger;
  private prompt: PromptUtils;
  private backupManager: BackupManager;

  constructor(logger: Logger, prompt: PromptUtils) {
    this.logger = logger;
    this.prompt = prompt;
    this.backupManager = new BackupManager(logger);
  }

  async execute(args?: string[]): Promise<void> {
    const action = args?.[0] || 'dashboard';
    const param = args?.[1];

    switch (action.toLowerCase()) {
      case 'create':
        await this.createBackup(param, args?.[2]);
        break;
      case 'restore':
        await this.restoreBackup(param);
        break;
      case 'list':
        await this.listBackups();
        break;
      case 'delete':
        await this.deleteBackup(param);
        break;
      case 'info':
        await this.showBackupInfo(param);
        break;
      case 'dashboard':
      default:
        await this.showDashboard();
        break;
    }
  }

  private async createBackup(name?: string, description?: string): Promise<void> {
    try {
      if (!name) {
        name = await this.prompt.question('🏷️ Nombre del backup (opcional): ');
      }
      
      if (!description) {
        description = await this.prompt.question('📝 Descripción (opcional): ');
      }

      const backupId = await this.backupManager.createFullBackup(
        name || undefined, 
        description || undefined
      );
      
      console.log('');
      this.logger.sparkleLog(`🎉 Backup creado exitosamente: ${backupId}`, 'success');
      
    } catch (error) {
      this.logger.error(`❌ Error creando backup: ${error instanceof Error ? error.message : error}`);
    }
  }

  private async restoreBackup(backupId?: string): Promise<void> {
    try {
      if (!backupId) {
        // Mostrar backups disponibles
        const backups = await this.backupManager.listBackups();
        if (backups.length === 0) {
          this.logger.warning('📭 No hay backups disponibles');
          return;
        }

        this.logger.log('📋 Backups disponibles:', 'accent');
        backups.slice(0, 5).forEach((backup, index) => {
          this.logger.log(`  ${index + 1}. ${backup.name} (${backup.id})`, 'dim');
        });

        backupId = await this.prompt.question('🆔 ID del backup a restaurar: ');
      }

      if (!backupId) {
        this.logger.warning('⚠️ ID de backup requerido');
        return;
      }

      // Confirmar restauración
      const confirm = await this.prompt.confirm(
        '⚠️ ¿Estás seguro de que deseas restaurar este backup? Esto puede sobrescribir configuraciones actuales',
        false
      );

      if (!confirm) {
        this.logger.info('Restauración cancelada');
        return;
      }

      await this.backupManager.restoreBackup(backupId, {
        overwriteExisting: true,
        createBackupBeforeRestore: true
      });

    } catch (error) {
      this.logger.error(`❌ Error restaurando backup: ${error instanceof Error ? error.message : error}`);
    }
  }

  private async listBackups(): Promise<void> {
    try {
      const backups = await this.backupManager.listBackups();
      
      if (backups.length === 0) {
        this.logger.warning('📭 No hay backups disponibles');
        this.logger.info('💡 Crea tu primer backup con: celia backup create');
        return;
      }

      this.logger.gradientLog('📋 Lista de Backups', ['primary', 'accent']);
      console.log('');

      backups.forEach((backup, index) => {
        const backupInfo = [
          `📦 ${backup.name}`,
          `🆔 ID: ${backup.id}`,
          `📅 Fecha: ${new Date(backup.timestamp).toLocaleString()}`,
          `🤖 Hermanas: ${backup.botCount}`,
          `💾 Tamaño: ${this.formatFileSize(backup.size)}`,
          ...(backup.description ? [`📄 ${backup.description}`] : [])
        ];

        this.logger.createBox(backupInfo, index === 0 ? 'success' : 'primary', 1);
        console.log('');
      });

    } catch (error) {
      this.logger.error(`❌ Error listando backups: ${error instanceof Error ? error.message : error}`);
    }
  }

  private async deleteBackup(backupId?: string): Promise<void> {
    try {
      if (!backupId) {
        backupId = await this.prompt.question('🆔 ID del backup a eliminar: ');
      }

      if (!backupId) {
        this.logger.warning('⚠️ ID de backup requerido');
        return;
      }

      const confirm = await this.prompt.confirm(
        `⚠️ ¿Estás seguro de que deseas eliminar el backup ${backupId}?`,
        false
      );

      if (!confirm) {
        this.logger.info('Eliminación cancelada');
        return;
      }

      await this.backupManager.deleteBackup(backupId);

    } catch (error) {
      this.logger.error(`❌ Error eliminando backup: ${error instanceof Error ? error.message : error}`);
    }
  }

  private async showBackupInfo(backupId?: string): Promise<void> {
    if (!backupId) {
      backupId = await this.prompt.question('🆔 ID del backup: ');
    }

    if (!backupId) {
      this.logger.warning('⚠️ ID de backup requerido');
      return;
    }

    this.logger.info(`ℹ️ Información detallada de backup ${backupId} próximamente`);
  }

  private async showDashboard(): Promise<void> {
    await this.backupManager.showBackupDashboard();
  }

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }

  private showUsage(): void {
    this.logger.createBox([
      '🗄️ Comando Backup - Gestión de respaldos',
      '',
      'Uso:',
      '  celia backup [comando] [parámetros]',
      '',
      'Comandos disponibles:',
      '  dashboard        - Ver dashboard de backups',
      '  create [nombre]  - Crear nuevo backup',
      '  restore <id>     - Restaurar backup',
      '  list             - Listar todos los backups',
      '  delete <id>      - Eliminar backup',
      '  info <id>        - Ver información de backup',
      '',
      'Ejemplos:',
      '  celia backup create "mi_backup"',
      '  celia backup restore backup_123',
      '  celia backup list'
    ], 'primary', 1);
  }
}

export default BackupCommand;