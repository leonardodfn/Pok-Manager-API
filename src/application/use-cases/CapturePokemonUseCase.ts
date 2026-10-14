import { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import { IPokemonCaptureRepository } from '@domain/repositories/IPokemonCaptureRepository';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { IPokeApiGateway } from '@application/gateways/IPokeApiGateway';
import { Pokemon } from '@domain/entities/Pokemon';
import { TrainerNotFoundError } from '@domain/errors/TrainerNotFoundError';
import { TeamLimitExceededError } from '@domain/errors/TeamLimitExceededError';
import {
  PokemonCaptureResponseDTO,
  toPokemonCaptureResponseDTO,
} from '@application/dtos/PokemonCaptureResponseDTO';

export class CapturePokemonUseCase {
  constructor(
    private readonly trainerRepository: ITrainerRepository,
    private readonly pokemonCaptureRepository: IPokemonCaptureRepository,
    private readonly pokemonRepository: IPokemonRepository,
    private readonly pokeApiGateway: IPokeApiGateway,
  ) {}

  async execute(trainerId: string, pokemonName: string): Promise<PokemonCaptureResponseDTO> {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) {
      throw new TrainerNotFoundError(trainerId);
    }

    const teamSize = await this.pokemonCaptureRepository.countByTrainerId(trainerId);
    if (teamSize >= 6) {
      throw new TeamLimitExceededError();
    }

    const data = await this.pokeApiGateway.findByName(pokemonName);
    let pokemon = await this.pokemonRepository.findById(data.id);

    if (!pokemon) {
      pokemon = new Pokemon(data);
      await this.pokemonRepository.create(pokemon);
    }

    const capture = await this.pokemonCaptureRepository.create(trainerId, pokemon.id);
    return toPokemonCaptureResponseDTO(capture);
  }
}
