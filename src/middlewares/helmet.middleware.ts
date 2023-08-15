import { Request, Response, NextFunction } from 'express';
import FrameguardConfig from '../config/frameguard.config';
import CSPConfig from '../config/csp.config';

class HelmetMiddleware {
  private static instance: HelmetMiddleware;
  private frameguardConfig: FrameguardConfig;
  private cspConfig: CSPConfig;

  private constructor() {
    this.frameguardConfig = new FrameguardConfig();
    this.cspConfig = new CSPConfig();
  }

  public static getInstance(): HelmetMiddleware {
    if (!this.instance) {
      this.instance = new HelmetMiddleware();
    }
    return this.instance;
  }

  public applyHeaders(req: Request, res: Response, next: NextFunction): void {
    this.frameguardConfig.apply(req, res, () => {});
    this.cspConfig.apply(req, res, () => {});
    next();
  }
}

export default HelmetMiddleware;
