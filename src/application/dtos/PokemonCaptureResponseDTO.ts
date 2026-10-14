import { PokemonCapture } from '@domain/entities/PokemonCapture';
import { PokemonSearchDTO } from '@application/dtos/PokemonSearchDTO';

export interface PokemonCaptureResponseDTO {
  id: string;
  capturedAt: string;
  pokemon: PokemonSearchDTO;
}

export function toPokemonCaptureResponseDTO(capture: PokemonCapture): PokemonCaptureResponseDTO {
  return {
    id: capture.id,
    capturedAt: capture.capturedAt.toISOString(),
    pokemon: {
      id: capture.pokemon.id,
      name: capture.pokemon.name,
      types: capture.pokemon.types,
      attributes: capture.pokemon.attributes,
      height: capture.pokemon.height,
      weight: capture.pokemon.weight,
      spriteUrl: capture.pokemon.spriteUrl,
    },
  };
}
