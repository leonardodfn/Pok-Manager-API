import { Pokemon, PokemonStats } from '@domain/entities/Pokemon';

export interface PokemonResponseDTO {
  id: string;
  name: string;
  types: string[];
  attributes: PokemonStats;
  height: number;
  weight: number;
  spriteUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export function toPokemonResponseDTO(pokemon: Pokemon): PokemonResponseDTO {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    attributes: pokemon.attributes,
    height: pokemon.height,
    weight: pokemon.weight,
    spriteUrl: pokemon.spriteUrl,
    createdAt: pokemon.createdAt.toISOString(),
    updatedAt: pokemon.updatedAt.toISOString(),
  };
}
