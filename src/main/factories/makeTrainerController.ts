import { CapturePokemonUseCase } from '@application/use-cases/CapturePokemonUseCase';
import { CreateTrainerUseCase } from '@application/use-cases/CreateTrainerUseCase';
import { GetTrainerTeamUseCase } from '@application/use-cases/GetTrainerTeamUseCase';
import { PrismaPokemonCaptureRepository } from '@infrastructure/repositories/PrismaPokemonCaptureRepository';
import { PrismaPokemonRepository } from '@infrastructure/repositories/PrismaPokemonRepository';
import { PrismaTrainerRepository } from '@infrastructure/repositories/PrismaTrainerRepository';
import { PokeApiGateway } from '@infrastructure/providers/PokeApiGateway';
import { TrainerController } from '@infrastructure/http/controllers/TrainerController';

export function makeTrainerController(): TrainerController {
  const trainerRepository = new PrismaTrainerRepository();
  const pokemonCaptureRepository = new PrismaPokemonCaptureRepository();
  const pokemonRepository = new PrismaPokemonRepository();
  const pokeApiGateway = new PokeApiGateway();

  return new TrainerController(
    new CreateTrainerUseCase(trainerRepository),
    new CapturePokemonUseCase(
      trainerRepository,
      pokemonCaptureRepository,
      pokemonRepository,
      pokeApiGateway,
    ),
    new GetTrainerTeamUseCase(trainerRepository, pokemonCaptureRepository),
  );
}
