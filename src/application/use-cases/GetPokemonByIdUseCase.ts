import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { PokemonNotFoundError } from '@domain/errors/PokemonNotFoundError';
import { PokemonResponseDTO, toPokemonResponseDTO } from '@application/dtos/PokemonResponseDTO';

export class GetPokemonByIdUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<PokemonResponseDTO> {
    const pokemon = await this.pokemonRepository.findById(id);
    if (!pokemon) {
      throw new PokemonNotFoundError(id);
    }
    return toPokemonResponseDTO(pokemon);
  }
}
