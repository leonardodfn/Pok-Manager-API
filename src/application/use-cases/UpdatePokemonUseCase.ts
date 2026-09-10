import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { PokemonNotFoundError } from '@domain/errors/PokemonNotFoundError';
import { PokemonAlreadyExistsError } from '@domain/errors/PokemonAlreadyExistsError';
import { UpdatePokemonDTO } from '@application/dtos/UpdatePokemonDTO';
import { PokemonResponseDTO, toPokemonResponseDTO } from '@application/dtos/PokemonResponseDTO';

export class UpdatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string, dto: UpdatePokemonDTO): Promise<PokemonResponseDTO> {
    const pokemon = await this.pokemonRepository.findById(id);
    if (!pokemon) {
      throw new PokemonNotFoundError(id);
    }

    if (dto.name && dto.name.trim().toLowerCase() !== pokemon.name) {
      const existingName = await this.pokemonRepository.findByName(dto.name);
      if (existingName && existingName.id !== id) {
        throw new PokemonAlreadyExistsError(dto.name);
      }
    }

    pokemon.update(dto);
    await this.pokemonRepository.update(pokemon);
    return toPokemonResponseDTO(pokemon);
  }
}
