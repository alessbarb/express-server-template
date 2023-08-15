import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

class CSPConfig {
  public apply(req: Request, res: Response, next: NextFunction): void {
    // Establecer encabezados de Content Security Policy:
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'example.com'],
        objectSrc: ["'none'"],
        imgSrc: ["'self'", 'img.com'],
      },
    })(req, res, () => {});
    next();
  }
}

export default CSPConfig;
