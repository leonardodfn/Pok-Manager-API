import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodType } from 'zod';
import { AppError } from '@infrastructure/errors/AppError';

type RequestPart = 'body' | 'params' | 'query';

export function validate(schema: ZodType, part: RequestPart = 'body'): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[part]);
    if (!result.success) {
      const details = result.error.issues.map((issue) => issue.message).join(', ');
      next(new AppError(`Dados da requisição inválidos: ${details}`, 400));
      return;
    }
    next();
  };
}
