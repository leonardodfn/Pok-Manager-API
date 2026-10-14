import { PokemonSearchDTO } from '@application/dtos/PokemonSearchDTO';

export interface IPokeApiGateway {
  findByName(name: string): Promise<PokemonSearchDTO>;
}
