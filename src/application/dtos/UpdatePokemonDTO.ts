import { PokemonStats } from '@domain/entities/Pokemon';

export interface UpdatePokemonDTO {
  name?: string;
  types?: string[];
  attributes?: Partial<PokemonStats>;
  height?: number;
  weight?: number;
  spriteUrl?: string;
}
