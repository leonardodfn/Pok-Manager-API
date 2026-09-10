import { createApp } from './config/app';
import { env } from './config/env';

const app = createApp();

app.listen(env.port, '127.0.0.1', () => {
  console.log(`PokéManager API rodando em http://localhost:${env.port}`);
  console.log(`Documentação Swagger disponível em http://localhost:${env.port}/api/docs`);
});
