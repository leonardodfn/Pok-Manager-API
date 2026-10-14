import { Router } from 'express';
import { TrainerController } from '@infrastructure/http/controllers/TrainerController';
import { validate } from '@infrastructure/http/middlewares/validate';
import {
  capturePokemonSchema,
  createTrainerSchema,
  trainerIdParamsSchema,
} from '@infrastructure/http/validation/schemas';

export function createTrainerRoutes(controller: TrainerController): Router {
  const router = Router();
  router.post('/', validate(createTrainerSchema), (req, res, next) =>
    controller.create(req, res, next),
  );
  router.post(
    '/:trainerId/captures',
    validate(trainerIdParamsSchema, 'params'),
    validate(capturePokemonSchema),
    (req, res, next) => controller.capture(req, res, next),
  );
  router.get('/:trainerId/team', validate(trainerIdParamsSchema, 'params'), (req, res, next) =>
    controller.team(req, res, next),
  );
  return router;
}
