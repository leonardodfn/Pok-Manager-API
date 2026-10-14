import { PokemonCapture } from '@domain/entities/PokemonCapture';
import { IPokemonCaptureRepository } from '@domain/repositories/IPokemonCaptureRepository';
import { prisma } from '@infrastructure/database/prisma';
import { toDomainPokemon } from './prismaMappers';

export class PrismaPokemonCaptureRepository implements IPokemonCaptureRepository {
  countByTrainerId(trainerId: string): Promise<number> {
    return prisma.pokemonCapture.count({ where: { trainerId } });
  }

  async create(trainerId: string, pokemonId: string): Promise<PokemonCapture> {
    const record = await prisma.pokemonCapture.create({
      data: { trainerId, pokemonId },
      include: { pokemon: true },
    });
    return new PokemonCapture({
      id: record.id,
      trainerId: record.trainerId,
      pokemon: toDomainPokemon(record.pokemon),
      capturedAt: record.capturedAt,
    });
  }

  async findByTrainerId(trainerId: string): Promise<PokemonCapture[]> {
    const records = await prisma.pokemonCapture.findMany({
      where: { trainerId },
      include: { pokemon: true },
      orderBy: { capturedAt: 'asc' },
    });
    return records.map(
      (record) =>
        new PokemonCapture({
          id: record.id,
          trainerId: record.trainerId,
          pokemon: toDomainPokemon(record.pokemon),
          capturedAt: record.capturedAt,
        }),
    );
  }
}
