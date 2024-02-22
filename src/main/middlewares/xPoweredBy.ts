import { NextFunction, Request, Response } from 'express';

export const xPoweredBy = (req: Request, res: Response, next: NextFunction): void => {
  res.removeHeader('x-powered-by');
  next();
};
