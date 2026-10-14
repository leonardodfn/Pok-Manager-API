import { NextFunction, Request, Response } from 'express';
import { SearchPokemonUseCase } from '@application/use-cases/SearchPokemonUseCase';

export class PokedexController {
  constructor(private readonly searchPokemonUseCase: SearchPokemonUseCase) {}

  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pokemon = await this.searchPokemonUseCase.execute(String(req.query.name));
      res.status(200).json(pokemon);
    } catch (error) {
      next(error);
    }
  }
}
