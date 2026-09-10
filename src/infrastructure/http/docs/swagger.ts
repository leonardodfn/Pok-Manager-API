import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

export function setupSwagger(app: Express): void {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
