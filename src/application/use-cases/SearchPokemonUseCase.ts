import { IPokeApiGateway } from '@application/gateways/IPokeApiGateway';
import { PokemonSearchDTO } from '@application/dtos/PokemonSearchDTO';

export class SearchPokemonUseCase {
  constructor(private readonly pokeApiGateway: IPokeApiGateway) {}

  execute(name: string): Promise<PokemonSearchDTO> {
    return this.pokeApiGateway.findByName(name);
  }
}
