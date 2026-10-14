import { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import { IPokemonCaptureRepository } from '@domain/repositories/IPokemonCaptureRepository';
import { TrainerNotFoundError } from '@domain/errors/TrainerNotFoundError';
import {
  PokemonCaptureResponseDTO,
  toPokemonCaptureResponseDTO,
} from '@application/dtos/PokemonCaptureResponseDTO';

export class GetTrainerTeamUseCase {
  constructor(
    private readonly trainerRepository: ITrainerRepository,
    private readonly pokemonCaptureRepository: IPokemonCaptureRepository,
  ) {}

  async execute(trainerId: string): Promise<PokemonCaptureResponseDTO[]> {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) {
      throw new TrainerNotFoundError(trainerId);
    }

    const team = await this.pokemonCaptureRepository.findByTrainerId(trainerId);
    return team.map(toPokemonCaptureResponseDTO);
  }
}
