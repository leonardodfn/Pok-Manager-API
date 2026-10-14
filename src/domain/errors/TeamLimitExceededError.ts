export class TeamLimitExceededError extends Error {
  constructor() {
    super('O time do treinador já possui o limite de 6 Pokémons.');
    this.name = 'TeamLimitExceededError';
  }
}
