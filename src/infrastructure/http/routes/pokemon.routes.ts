import { Router } from 'express';
import { PokemonController } from '@infrastructure/http/controllers/PokemonController';

export function createPokemonRoutes(controller: PokemonController): Router {
  const router = Router();

  router.get('/', (req, res, next) => controller.list(req, res, next));
  router.get('/:id', (req, res, next) => controller.getById(req, res, next));
  router.post('/', (req, res, next) => controller.create(req, res, next));
  router.put('/:id', (req, res, next) => controller.update(req, res, next));
  router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

  return router;
}
