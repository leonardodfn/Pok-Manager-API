import { Pokemon } from '@domain/entities/Pokemon';
import { IPokemonRepository, PokemonFilters } from '@domain/repositories/IPokemonRepository';

export class InMemoryPokemonRepository implements IPokemonRepository {
  private pokemons: Map<string, Pokemon> = new Map();

  constructor(seed = true) {
    if (seed) {
      this.seedInitialData();
    }
  }

  async findAll(filters?: PokemonFilters): Promise<Pokemon[]> {
    let list = Array.from(this.pokemons.values());

    if (filters?.type) {
      const targetType = filters.type.trim().toLowerCase();
      list = list.filter((p) => p.types.includes(targetType));
    }

    return list.sort((a, b) => {
      const numA = Number(a.id);
      const numB = Number(b.id);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      return a.name.localeCompare(b.name);
    });
  }

  async findById(id: string): Promise<Pokemon | null> {
    const pokemon = this.pokemons.get(id);
    return pokemon || null;
  }

  async findByName(name: string): Promise<Pokemon | null> {
    const normalized = name.trim().toLowerCase();
    for (const pokemon of this.pokemons.values()) {
      if (pokemon.name === normalized) {
        return pokemon;
      }
    }
    return null;
  }

  async create(pokemon: Pokemon): Promise<void> {
    this.pokemons.set(pokemon.id, pokemon);
  }

  async update(pokemon: Pokemon): Promise<void> {
    this.pokemons.set(pokemon.id, pokemon);
  }

  async delete(id: string): Promise<boolean> {
    return this.pokemons.delete(id);
  }

  private seedInitialData(): void {
    const starters: Pokemon[] = [
      new Pokemon({
        id: '1',
        name: 'bulbasaur',
        types: ['grass', 'poison'],
        attributes: {
          hp: 45,
          attack: 49,
          defense: 49,
          specialAttack: 65,
          specialDefense: 65,
          speed: 45,
        },
        height: 7,
        weight: 69,
        spriteUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      }),
      new Pokemon({
        id: '4',
        name: 'charmander',
        types: ['fire'],
        attributes: {
          hp: 39,
          attack: 52,
          defense: 43,
          specialAttack: 60,
          specialDefense: 50,
          speed: 65,
        },
        height: 6,
        weight: 85,
        spriteUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
      }),
      new Pokemon({
        id: '7',
        name: 'squirtle',
        types: ['water'],
        attributes: {
          hp: 44,
          attack: 48,
          defense: 65,
          specialAttack: 50,
          specialDefense: 64,
          speed: 43,
        },
        height: 5,
        weight: 90,
        spriteUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
      }),
      new Pokemon({
        id: '25',
        name: 'pikachu',
        types: ['electric'],
        attributes: {
          hp: 35,
          attack: 55,
          defense: 40,
          specialAttack: 50,
          specialDefense: 50,
          speed: 90,
        },
        height: 4,
        weight: 60,
        spriteUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      }),
      new Pokemon({
        id: '94',
        name: 'gengar',
        types: ['ghost', 'poison'],
        attributes: {
          hp: 60,
          attack: 65,
          defense: 60,
          specialAttack: 130,
          specialDefense: 75,
          speed: 110,
        },
        height: 15,
        weight: 405,
        spriteUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
      }),
    ];

    for (const item of starters) {
      this.pokemons.set(item.id, item);
    }
  }
}
