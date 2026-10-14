import { z } from 'zod';
import { IPokeApiGateway } from '@application/gateways/IPokeApiGateway';
import { PokemonSearchDTO } from '@application/dtos/PokemonSearchDTO';
import { PokemonNotFoundError } from '@domain/errors/PokemonNotFoundError';
import { AppError } from '@infrastructure/errors/AppError';

const pokeApiPokemonSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  types: z.array(z.object({ type: z.object({ name: z.string() }) })),
  stats: z.array(z.object({ base_stat: z.number(), stat: z.object({ name: z.string() }) })),
  sprites: z.object({
    front_default: z.string().nullable().optional(),
    other: z
      .object({
        'official-artwork': z.object({ front_default: z.string().nullable().optional() }).optional(),
      })
      .optional(),
  }),
});

export class PokeApiGateway implements IPokeApiGateway {
  async findByName(name: string): Promise<PokemonSearchDTO> {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name.trim().toLowerCase())}`,
      );

      if (response.status === 404) {
        throw new PokemonNotFoundError(name);
      }
      if (!response.ok) {
        throw new AppError('A PokéAPI não conseguiu atender à consulta.', 502);
      }

      const result = pokeApiPokemonSchema.safeParse(await response.json());
      if (!result.success) {
        throw new AppError('A PokéAPI retornou dados inválidos.', 502);
      }

      const pokemon = result.data;
      const stat = (name: string): number =>
        pokemon.stats.find((item) => item.stat.name === name)?.base_stat ?? 0;
      const spriteUrl =
        pokemon.sprites.other?.['official-artwork']?.front_default ??
        pokemon.sprites.front_default ??
        undefined;

      return {
        id: String(pokemon.id),
        name: pokemon.name,
        types: pokemon.types.map((item) => item.type.name),
        attributes: {
          hp: stat('hp'),
          attack: stat('attack'),
          defense: stat('defense'),
          specialAttack: stat('special-attack'),
          specialDefense: stat('special-defense'),
          speed: stat('speed'),
        },
        height: pokemon.height,
        weight: pokemon.weight,
        spriteUrl,
      };
    } catch (error) {
      if (error instanceof AppError || error instanceof PokemonNotFoundError) {
        throw error;
      }
      throw new AppError('Não foi possível conectar à PokéAPI.', 502);
    }
  }
}
