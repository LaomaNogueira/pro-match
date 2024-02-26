import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import httpStatus from 'http-status';
import { StatusError } from '@/presentation/errors/status-error';

export function validateSchema<T extends object>(schema: { new (): T }) {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const body = plainToClass(schema, req.body);
      const errors = await validate(body);

      if (errors.length > 0) {
        const errorMessages = extractErrorMessages(errors);
        throw new Error(errorMessages.join('; '));
      }

      next();
    } catch (error: any) {
      let statusError = new StatusError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]);

      if (error instanceof Error) {
        statusError = new StatusError(httpStatus.BAD_REQUEST, error);
      }

      res.status(httpStatus.BAD_REQUEST).send(statusError);
    }
  };
}

function extractErrorMessages(errors: ValidationError[]): string[] {
  let errorMessages: string[] = [];

  errors.forEach((error) => {
    if (error.constraints) {
      errorMessages = errorMessages.concat(Object.values(error.constraints));
    }

    if (error.children && error.children.length > 0) {
      errorMessages = errorMessages.concat(extractErrorMessages(error.children));
    }
  });

  return errorMessages;
}
