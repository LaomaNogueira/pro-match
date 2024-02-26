import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import httpStatus from 'http-status';

export function validateSchema<T extends object>(schema: { new (): T }) {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const body = plainToClass(schema, req.body);
      const errors = await validate(body);

      if (errors.length > 0) {
        const errorMessages = Object.values(errors[0].constraints).join('; ');
        return res.status(httpStatus.BAD_REQUEST).json(`Validation error: ${errorMessages}`);
      }

      next();
    } catch (error) {
      console.error('Validation error:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal server error');
    }
  };
}
