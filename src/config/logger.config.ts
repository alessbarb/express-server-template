import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export class LoggerConfig {
  private static instance: LoggerConfig;
  private logger: winston.Logger;

  private constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        // Configuración de transportes (e.g., DailyRotateFile)
        // ... (aquí va tu configuración anterior)
      ],
    });

    // Manejar excepciones no capturadas
    this.logger.exceptions.handle(
      new DailyRotateFile({
        // ... (aquí va tu configuración anterior)
      }),
    );

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
    }
  }

  static getInstance(): LoggerConfig {
    if (!this.instance) {
      this.instance = new LoggerConfig();
    }
    return this.instance;
  }

  getLogger(): winston.Logger {
    return this.logger;
  }
}
