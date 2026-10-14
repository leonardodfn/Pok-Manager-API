import { Pokemon } from '@domain/entities/Pokemon';
import { IPokemonRepository, PokemonFilters } from '@domain/repositories/IPokemonRepository';
import { prisma } from '@infrastructure/database/prisma';
import { toDomainPokemon, toPrismaPokemonData } from './prismaMappers';
import { PokemonAlreadyExistsError } from '@domain/errors/PokemonAlreadyExistsError';

function isUniqueConstraintError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002';
}

export class PrismaPokemonRepository implements IPokemonRepository {
  async findAll(filters?: PokemonFilters): Promise<Pokemon[]> {
    const records = await prisma.pokemon.findMany({
      where: filters?.type
        ? { types: { has: filters.type.trim().toLowerCase() } }
        : undefined,
    });
    const pokemons = records.map(toDomainPokemon);

    return pokemons.sort((a, b) => {
      const numA = Number(a.id);
      const numB = Number(b.id);
      if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
        return numA - numB;
      }
      return a.name.localeCompare(b.name);
    });
  }

  async findById(id: string): Promise<Pokemon | null> {
    const record = await prisma.pokemon.findUnique({ where: { id } });
    return record ? toDomainPokemon(record) : null;
  }

  async findByName(name: string): Promise<Pokemon | null> {
    const record = await prisma.pokemon.findUnique({
      where: { name: name.trim().toLowerCase() },
    });
    return record ? toDomainPokemon(record) : null;
  }

  async create(pokemon: Pokemon): Promise<void> {
    try {
      await prisma.pokemon.create({ data: toPrismaPokemonData(pokemon) });
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        throw new PokemonAlreadyExistsError(pokemon.name);
      }
      throw error;
    }
  }

  async update(pokemon: Pokemon): Promise<void> {
    await prisma.pokemon.update({
      where: { id: pokemon.id },
      data: toPrismaPokemonData(pokemon),
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await prisma.pokemon.deleteMany({ where: { id } });
    return result.count > 0;
  }
}
