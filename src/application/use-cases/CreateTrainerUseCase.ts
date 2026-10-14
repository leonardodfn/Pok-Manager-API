import { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import { Trainer } from '@domain/entities/Trainer';
import { TrainerAlreadyExistsError } from '@domain/errors/TrainerAlreadyExistsError';
import { TrainerResponseDTO, toTrainerResponseDTO } from '@application/dtos/TrainerResponseDTO';

export class CreateTrainerUseCase {
  constructor(private readonly trainerRepository: ITrainerRepository) {}

  async execute(name: string, email: string): Promise<TrainerResponseDTO> {
    const existing = await this.trainerRepository.findByEmail(email);
    if (existing) {
      throw new TrainerAlreadyExistsError(email);
    }

    const trainer = new Trainer({ name, email });
    await this.trainerRepository.create(trainer);
    return toTrainerResponseDTO(trainer);
  }
}
