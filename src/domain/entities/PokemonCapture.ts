import { Pokemon } from '@domain/entities/Pokemon';

export interface PokemonCaptureProps {
  id: string;
  trainerId: string;
  pokemon: Pokemon;
  capturedAt: Date;
}

export class PokemonCapture {
  public readonly id: string;
  public readonly trainerId: string;
  public readonly pokemon: Pokemon;
  public readonly capturedAt: Date;

  constructor(props: PokemonCaptureProps) {
    this.id = props.id;
    this.trainerId = props.trainerId;
    this.pokemon = props.pokemon;
    this.capturedAt = props.capturedAt;
  }
}
