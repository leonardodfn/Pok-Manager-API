export class TrainerAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Já existe um treinador cadastrado com o e-mail '${email}'.`);
    this.name = 'TrainerAlreadyExistsError';
  }
}
