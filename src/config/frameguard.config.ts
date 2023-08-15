import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

class FrameguardConfig {
  public apply(req: Request, res: Response, next: NextFunction): void {
    // Usar la función de protección contra clickjacking:
    helmet.frameguard({ action: 'deny' })(req, res, () => {});
    next();
  }
}

export default FrameguardConfig;
