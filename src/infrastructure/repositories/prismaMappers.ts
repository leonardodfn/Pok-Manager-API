import { Pokemon as DomainPokemon } from '@domain/entities/Pokemon';
import { Pokemon as PrismaPokemon } from '@prisma/client';

export function toDomainPokemon(pokemon: PrismaPokemon): DomainPokemon {
  return new DomainPokemon({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    attributes: {
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      specialAttack: pokemon.specialAttack,
      specialDefense: pokemon.specialDefense,
      speed: pokemon.speed,
    },
    height: pokemon.height,
    weight: pokemon.weight,
    spriteUrl: pokemon.spriteUrl ?? undefined,
    createdAt: pokemon.createdAt,
    updatedAt: pokemon.updatedAt,
  });
}

export function toPrismaPokemonData(pokemon: DomainPokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    hp: pokemon.attributes.hp,
    attack: pokemon.attributes.attack,
    defense: pokemon.attributes.defense,
    specialAttack: pokemon.attributes.specialAttack,
    specialDefense: pokemon.attributes.specialDefense,
    speed: pokemon.attributes.speed,
    height: pokemon.height,
    weight: pokemon.weight,
    spriteUrl: pokemon.spriteUrl,
    createdAt: pokemon.createdAt,
    updatedAt: pokemon.updatedAt,
  };
}
