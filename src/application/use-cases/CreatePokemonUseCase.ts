import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { Pokemon } from '@domain/entities/Pokemon';
import { PokemonAlreadyExistsError } from '@domain/errors/PokemonAlreadyExistsError';
import { CreatePokemonDTO } from '@application/dtos/CreatePokemonDTO';
import { PokemonResponseDTO, toPokemonResponseDTO } from '@application/dtos/PokemonResponseDTO';

export class CreatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(dto: CreatePokemonDTO): Promise<PokemonResponseDTO> {
    const existing = await this.pokemonRepository.findByName(dto.name);
    if (existing) {
      throw new PokemonAlreadyExistsError(dto.name);
    }

    if (dto.id) {
      const existingById = await this.pokemonRepository.findById(dto.id);
      if (existingById) {
        throw new PokemonAlreadyExistsError(`ID ${dto.id}`);
      }
    }

    const pokemon = new Pokemon({
      id: dto.id,
      name: dto.name,
      types: dto.types,
      attributes: dto.attributes,
      height: dto.height,
      weight: dto.weight,
      spriteUrl: dto.spriteUrl,
    });

    await this.pokemonRepository.create(pokemon);
    return toPokemonResponseDTO(pokemon);
  }
}
