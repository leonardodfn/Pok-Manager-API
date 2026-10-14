export interface TrainerProps {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
}

export class Trainer {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly createdAt: Date;

  constructor(props: TrainerProps) {
    this.id = props.id || crypto.randomUUID();
    this.name = props.name.trim();
    this.email = props.email.trim().toLowerCase();
    this.createdAt = props.createdAt || new Date();
  }
}
