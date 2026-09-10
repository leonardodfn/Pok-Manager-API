import { PokemonStats } from '@domain/entities/Pokemon';

export interface CreatePokemonDTO {
  id?: string;
  name: string;
  types: string[];
  attributes: PokemonStats;
  height?: number;
  weight?: number;
  spriteUrl?: string;
}
