import { Router } from 'express';
import { PokemonController } from '@infrastructure/http/controllers/PokemonController';
import { createPokemonRoutes } from './pokemon.routes';

export function createApiRouter(pokemonController: PokemonController): Router {
  const router = Router();

  router.use('/pokemons', createPokemonRoutes(pokemonController));

  return router;
}
