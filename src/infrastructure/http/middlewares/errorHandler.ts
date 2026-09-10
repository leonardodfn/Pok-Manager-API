import { Request, Response, NextFunction } from 'express';
import { AppError } from '@infrastructure/errors/AppError';
import { PokemonNotFoundError } from '@domain/errors/PokemonNotFoundError';
import { PokemonAlreadyExistsError } from '@domain/errors/PokemonAlreadyExistsError';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof PokemonNotFoundError) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  if (err instanceof PokemonAlreadyExistsError) {
    res.status(409).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  console.error('Unhandled server error:', err.message);

  res.status(500).json({
    status: 'error',
    message: 'Ocorreu um erro interno no servidor.',
  });
}
