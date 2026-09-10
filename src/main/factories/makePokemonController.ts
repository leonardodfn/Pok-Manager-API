import { InMemoryPokemonRepository } from '@infrastructure/repositories/InMemoryPokemonRepository';
import { ListPokemonsUseCase } from '@application/use-cases/ListPokemonsUseCase';
import { GetPokemonByIdUseCase } from '@application/use-cases/GetPokemonByIdUseCase';
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemonUseCase';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemonUseCase';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemonUseCase';
import { PokemonController } from '@infrastructure/http/controllers/PokemonController';

const pokemonRepository = new InMemoryPokemonRepository();

export function makePokemonController(): PokemonController {
  const listPokemonsUseCase = new ListPokemonsUseCase(pokemonRepository);
  const getPokemonByIdUseCase = new GetPokemonByIdUseCase(pokemonRepository);
  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
  const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);
  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);

  return new PokemonController(
    listPokemonsUseCase,
    getPokemonByIdUseCase,
    createPokemonUseCase,
    updatePokemonUseCase,
    deletePokemonUseCase,
  );
}
