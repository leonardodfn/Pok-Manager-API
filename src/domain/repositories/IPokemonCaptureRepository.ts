import { PokemonCapture } from '@domain/entities/PokemonCapture';

export interface IPokemonCaptureRepository {
  countByTrainerId(trainerId: string): Promise<number>;
  create(trainerId: string, pokemonId: string): Promise<PokemonCapture>;
  findByTrainerId(trainerId: string): Promise<PokemonCapture[]>;
}
