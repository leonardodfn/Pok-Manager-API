import { Router } from 'express';
import { PokemonController } from '@infrastructure/http/controllers/PokemonController';
import { PokedexController } from '@infrastructure/http/controllers/PokedexController';
import { TrainerController } from '@infrastructure/http/controllers/TrainerController';
import { createPokemonRoutes } from './pokemon.routes';
import { createPokedexRoutes } from './pokedex.routes';
import { createTrainerRoutes } from './trainers.routes';

export function createApiRouter(
  pokemonController: PokemonController,
  pokedexController: PokedexController,
  trainerController: TrainerController,
): Router {
  const router = Router();

  router.use('/pokemons', createPokemonRoutes(pokemonController));
  router.use('/pokedex', createPokedexRoutes(pokedexController));
  router.use('/trainers', createTrainerRoutes(trainerController));

  return router;
}
