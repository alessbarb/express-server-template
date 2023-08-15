import { LoggerConfig } from '../config/logger.config';

export class GlobalErrorHandler {
  static registerGlobalErrorHandlers(): void {
    const logger = LoggerConfig.getInstance().getLogger();

    process.on('uncaughtException', error => {
      logger.error('Excepción no capturada: ', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, _promise) => {
      logger.error('Rechazo de promesa no capturado: ', reason);
    });
  }
}
