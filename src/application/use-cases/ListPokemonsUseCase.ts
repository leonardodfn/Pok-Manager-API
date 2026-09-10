import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { PokemonResponseDTO, toPokemonResponseDTO } from '@application/dtos/PokemonResponseDTO';

export class ListPokemonsUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(type?: string): Promise<PokemonResponseDTO[]> {
    const pokemons = await this.pokemonRepository.findAll(type ? { type } : undefined);
    return pokemons.map(toPokemonResponseDTO);
  }
}
