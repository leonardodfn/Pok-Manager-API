import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { PokemonNotFoundError } from '@domain/errors/PokemonNotFoundError';

export class DeletePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.pokemonRepository.findById(id);
    if (!existing) {
      throw new PokemonNotFoundError(id);
    }
    await this.pokemonRepository.delete(id);
  }
}
