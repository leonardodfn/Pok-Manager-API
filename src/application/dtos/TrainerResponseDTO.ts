import { Trainer } from '@domain/entities/Trainer';

export interface TrainerResponseDTO {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export function toTrainerResponseDTO(trainer: Trainer): TrainerResponseDTO {
  return {
    id: trainer.id,
    name: trainer.name,
    email: trainer.email,
    createdAt: trainer.createdAt.toISOString(),
  };
}
