import { Request, Response, NextFunction } from 'express';
import { ListPokemonsUseCase } from '@application/use-cases/ListPokemonsUseCase';
import { GetPokemonByIdUseCase } from '@application/use-cases/GetPokemonByIdUseCase';
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemonUseCase';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemonUseCase';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemonUseCase';
import { AppError } from '@infrastructure/errors/AppError';

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
      const paramId = req.params.id;
      const id = Array.isArray(paramId) ? paramId[0] : paramId;
      if (!id || typeof id !== 'string') {
        throw new AppError('O parâmetro id é obrigatório.', 400);
      }
      const pokemon = await this.getPokemonByIdUseCase.execute(id);
      res.status(200).json(pokemon);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, name, types, attributes, height, weight, spriteUrl } = req.body;

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new AppError('O campo "name" é obrigatório e deve ser uma string válida.', 400);
      }

      if (!types || !Array.isArray(types) || types.length === 0) {
        throw new AppError('O campo "types" deve ser um array com pelo menos um tipo.', 400);
      }

      if (!attributes || typeof attributes !== 'object') {
        throw new AppError('O campo "attributes" com os stats base é obrigatório.', 400);
      }

      const stats = {
        hp: Number(attributes.hp) || 0,
        attack: Number(attributes.attack) || 0,
        defense: Number(attributes.defense) || 0,
        specialAttack: Number(attributes.specialAttack) || 0,
        specialDefense: Number(attributes.specialDefense) || 0,
        speed: Number(attributes.speed) || 0,
      };

      const pokemon = await this.createPokemonUseCase.execute({
        id: id ? String(id).trim() : undefined,
        name,
        types,
        attributes: stats,
        height: height !== undefined ? Number(height) : undefined,
        weight: weight !== undefined ? Number(weight) : undefined,
        spriteUrl: typeof spriteUrl === 'string' ? spriteUrl.trim() : undefined,
      });

      res.status(201).json(pokemon);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paramId = req.params.id;
      const id = Array.isArray(paramId) ? paramId[0] : paramId;
      if (!id || typeof id !== 'string') {
        throw new AppError('O parâmetro id é obrigatório.', 400);
      }

      const { name, types, attributes, height, weight, spriteUrl } = req.body;

      const updated = await this.updatePokemonUseCase.execute(id, {
        name: typeof name === 'string' ? name : undefined,
        types: Array.isArray(types) ? types : undefined,
        attributes: attributes && typeof attributes === 'object' ? attributes : undefined,
        height: height !== undefined ? Number(height) : undefined,
        weight: weight !== undefined ? Number(weight) : undefined,
        spriteUrl: typeof spriteUrl === 'string' ? spriteUrl.trim() : undefined,
      });

      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paramId = req.params.id;
      const id = Array.isArray(paramId) ? paramId[0] : paramId;
      if (!id || typeof id !== 'string') {
        throw new AppError('O parâmetro id é obrigatório.', 400);
      }

      await this.deletePokemonUseCase.execute(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
