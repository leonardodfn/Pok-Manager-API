import { Router } from 'express';
import { PokemonController } from '@infrastructure/http/controllers/PokemonController';
import { validate } from '@infrastructure/http/middlewares/validate';
import {
  createPokemonSchema,
  pokemonIdParamsSchema,
  pokemonListQuerySchema,
  updatePokemonSchema,
} from '@infrastructure/http/validation/schemas';

export function createPokemonRoutes(controller: PokemonController): Router {
  const router = Router();

  router.get('/', validate(pokemonListQuerySchema, 'query'), (req, res, next) =>
    controller.list(req, res, next),
  );
  router.get('/:id', validate(pokemonIdParamsSchema, 'params'), (req, res, next) =>
    controller.getById(req, res, next),
  );
  router.post('/', validate(createPokemonSchema), (req, res, next) =>
    controller.create(req, res, next),
  );
  router.put(
    '/:id',
    validate(pokemonIdParamsSchema, 'params'),
    validate(updatePokemonSchema),
    (req, res, next) => controller.update(req, res, next),
  );
  router.delete('/:id', validate(pokemonIdParamsSchema, 'params'), (req, res, next) =>
    controller.delete(req, res, next),
  );

  return router;
}
