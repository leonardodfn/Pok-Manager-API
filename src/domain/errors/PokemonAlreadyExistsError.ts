export class PokemonAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Pokémon com o nome '${name}' já está cadastrado no catálogo.`);
    this.name = 'PokemonAlreadyExistsError';
  }
}
