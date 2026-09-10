export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonProps {
  id?: string;
  name: string;
  types: string[];
  attributes: PokemonStats;
  height?: number;
  weight?: number;
  spriteUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdatePokemonData {
  name?: string;
  types?: string[];
  attributes?: Partial<PokemonStats>;
  height?: number;
  weight?: number;
  spriteUrl?: string;
}

export class Pokemon {
  public readonly id: string;
  public name: string;
  public types: string[];
  public attributes: PokemonStats;
  public height: number;
  public weight: number;
  public spriteUrl?: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: PokemonProps) {
    this.id = props.id || crypto.randomUUID();
    this.name = props.name.trim().toLowerCase();
    this.types = props.types.map((t) => t.trim().toLowerCase());
    this.attributes = props.attributes;
    this.height = props.height ?? 0;
    this.weight = props.weight ?? 0;
    this.spriteUrl = props.spriteUrl;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  public update(data: UpdatePokemonData): void {
    if (data.name) {
      this.name = data.name.trim().toLowerCase();
    }
    if (data.types) {
      this.types = data.types.map((t) => t.trim().toLowerCase());
    }
    if (data.attributes) {
      this.attributes = { ...this.attributes, ...data.attributes };
    }
    if (data.height !== undefined) {
      this.height = data.height;
    }
    if (data.weight !== undefined) {
      this.weight = data.weight;
    }
    if (data.spriteUrl !== undefined) {
      this.spriteUrl = data.spriteUrl;
    }
    this.updatedAt = new Date();
  }
}
