import { SearchPokemonUseCase } from '@application/use-cases/SearchPokemonUseCase';
import { PokedexController } from '@infrastructure/http/controllers/PokedexController';
import { PokeApiGateway } from '@infrastructure/providers/PokeApiGateway';

export function makePokedexController(): PokedexController {
  return new PokedexController(new SearchPokemonUseCase(new PokeApiGateway()));
}
