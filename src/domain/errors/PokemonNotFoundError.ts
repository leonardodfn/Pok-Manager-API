export class PokemonNotFoundError extends Error {
  constructor(identifier: string) {
    super(`Pokémon com identificador '${identifier}' não foi encontrado.`);
    this.name = 'PokemonNotFoundError';
  }
}
