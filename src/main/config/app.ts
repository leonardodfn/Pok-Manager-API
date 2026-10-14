import express, { Express } from 'express';
import cors from 'cors';
import { createApiRouter } from '@infrastructure/http/routes';
import { errorHandler } from '@infrastructure/http/middlewares/errorHandler';
import { setupSwagger } from '@infrastructure/http/docs/swagger';
import { makePokemonController } from '@main/factories/makePokemonController';
import { makePokedexController } from '@main/factories/makePokedexController';
import { makeTrainerController } from '@main/factories/makeTrainerController';

export function createApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  setupSwagger(app);

  const pokemonController = makePokemonController();
  const pokedexController = makePokedexController();
  const trainerController = makeTrainerController();
  const apiRouter = createApiRouter(pokemonController, pokedexController, trainerController);

  app.use('/api/v1', apiRouter);

  app.get('/', (_req, res) => {
    res.json({
      name: 'PokéManager API',
      version: '1.0.0',
      docs: '/api/docs',
    });
  });

  app.use(errorHandler);

  return app;
}
