import { NextFunction, Request, Response } from 'express';
import { LoggerConfig } from '../config/logger.config';
import {
  OperationalError,
  ProgrammingError,
} from '../config/customErrors.config';

const logger = LoggerConfig.getInstance().getLogger();

export class ErrorHandler {
  static handle(err: any, req: Request, res: Response, _next: NextFunction) {
    // Diferenciar entre entornos
    const isDevelopment = process.env.NODE_ENV !== 'production';

    let errorMessage = isDevelopment
      ? err.message
      : 'Error interno del servidor.';
    const statusCode = err.statusCode || 500;

    if (err instanceof OperationalError) {
      logger.warn('Error operativo:', {
        message: err.message,
        stack: isDevelopment ? err.stack : undefined,
        url: req.originalUrl,
      });
    } else if (err instanceof ProgrammingError || !err.statusCode) {
      logger.error('Error de programación:', {
        message: err.message,
        stack: isDevelopment ? err.stack : undefined,
        url: req.originalUrl,
      });
    } else {
      errorMessage = 'Error desconocido';
      logger.error('Error desconocido:', {
        message: err.message,
        stack: isDevelopment ? err.stack : undefined,
        url: req.originalUrl,
      });
    }

    res.status(statusCode).json({
      error: {
        message: errorMessage,
      },
    });
  }
}
