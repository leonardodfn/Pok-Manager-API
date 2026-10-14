import { Trainer } from '@domain/entities/Trainer';
import { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import { TrainerAlreadyExistsError } from '@domain/errors/TrainerAlreadyExistsError';
import { prisma } from '@infrastructure/database/prisma';

function isUniqueConstraintError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002';
}

export class PrismaTrainerRepository implements ITrainerRepository {
  async create(trainer: Trainer): Promise<void> {
    try {
      await prisma.trainer.create({
        data: {
          id: trainer.id,
          name: trainer.name,
          email: trainer.email,
          createdAt: trainer.createdAt,
        },
      });
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        throw new TrainerAlreadyExistsError(trainer.email);
      }
      throw error;
    }
  }

  async findById(id: string): Promise<Trainer | null> {
    const record = await prisma.trainer.findUnique({ where: { id } });
    return record
      ? new Trainer({
          id: record.id,
          name: record.name,
          email: record.email,
          createdAt: record.createdAt,
        })
      : null;
  }

  async findByEmail(email: string): Promise<Trainer | null> {
    const record = await prisma.trainer.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    return record
      ? new Trainer({
          id: record.id,
          name: record.name,
          email: record.email,
          createdAt: record.createdAt,
        })
      : null;
  }
}
