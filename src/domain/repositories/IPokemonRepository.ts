import { Pokemon } from '@domain/entities/Pokemon';

export interface PokemonFilters {
  type?: string;
}

export interface IPokemonRepository {
  findAll(filters?: PokemonFilters): Promise<Pokemon[]>;
  findById(id: string): Promise<Pokemon | null>;
  findByName(name: string): Promise<Pokemon | null>;
  create(pokemon: Pokemon): Promise<void>;
  update(pokemon: Pokemon): Promise<void>;
  delete(id: string): Promise<boolean>;
}
