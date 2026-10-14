export class TrainerNotFoundError extends Error {
  constructor(id: string) {
    super(`Treinador com identificador '${id}' não foi encontrado.`);
    this.name = 'TrainerNotFoundError';
  }
}
