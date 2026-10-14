import { Router } from 'express';
import { PokedexController } from '@infrastructure/http/controllers/PokedexController';
import { validate } from '@infrastructure/http/middlewares/validate';
import { searchPokemonQuerySchema } from '@infrastructure/http/validation/schemas';

export function createPokedexRoutes(controller: PokedexController): Router {
  const router = Router();
  router.get('/search', validate(searchPokemonQuerySchema, 'query'), (req, res, next) =>
    controller.search(req, res, next),
  );
  return router;
}
