import { Request, Response, NextFunction } from 'express';
import { ListPokemonsUseCase } from '@application/use-cases/ListPokemonsUseCase';
import { GetPokemonByIdUseCase } from '@application/use-cases/GetPokemonByIdUseCase';
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemonUseCase';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemonUseCase';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemonUseCase';

export class PokemonController {
  constructor(
    private readonly listPokemonsUseCase: ListPokemonsUseCase,
    private readonly getPokemonByIdUseCase: GetPokemonByIdUseCase,
    private readonly createPokemonUseCase: CreatePokemonUseCase,
    private readonly updatePokemonUseCase: UpdatePokemonUseCase,
    private readonly deletePokemonUseCase: DeletePokemonUseCase,
  ) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const type = typeof req.query.type === 'string' ? req.query.type : undefined;
      const pokemons = await this.listPokemonsUseCase.execute(type);
      res.status(200).json(pokemons);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const pokemon = await this.getPokemonByIdUseCase.execute(id);
      res.status(200).json(pokemon);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pokemon = await this.createPokemonUseCase.execute(req.body);
      res.status(201).json(pokemon);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await this.updatePokemonUseCase.execute(id, req.body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await this.deletePokemonUseCase.execute(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
