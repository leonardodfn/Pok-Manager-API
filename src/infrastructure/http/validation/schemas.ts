import { z } from 'zod';

const pokemonStatsSchema = z.object({
  hp: z.number().int().nonnegative(),
  attack: z.number().int().nonnegative(),
  defense: z.number().int().nonnegative(),
  specialAttack: z.number().int().nonnegative(),
  specialDefense: z.number().int().nonnegative(),
  speed: z.number().int().nonnegative(),
});

export const createPokemonSchema = z.object({
  id: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1),
  types: z.array(z.string().trim().min(1)).min(1),
  attributes: pokemonStatsSchema,
  height: z.number().int().nonnegative().optional(),
  weight: z.number().int().nonnegative().optional(),
  spriteUrl: z.string().url().optional(),
});

export const updatePokemonSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    types: z.array(z.string().trim().min(1)).min(1).optional(),
    attributes: pokemonStatsSchema.partial().optional(),
    height: z.number().int().nonnegative().optional(),
    weight: z.number().int().nonnegative().optional(),
    spriteUrl: z.string().url().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, 'Informe ao menos um campo para atualizar.');

export const pokemonIdParamsSchema = z.object({ id: z.string().trim().min(1) });
export const trainerIdParamsSchema = z.object({ trainerId: z.string().trim().min(1) });
export const pokemonListQuerySchema = z.object({
  type: z.string().trim().min(1).optional(),
});
export const searchPokemonQuerySchema = z.object({
  name: z.string().trim().min(1),
});
export const createTrainerSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
});
export const capturePokemonSchema = z.object({
  name: z.string().trim().min(1),
});
