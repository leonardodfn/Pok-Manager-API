import { NextFunction, Request, Response } from 'express';
import { CreateTrainerUseCase } from '@application/use-cases/CreateTrainerUseCase';
import { CapturePokemonUseCase } from '@application/use-cases/CapturePokemonUseCase';
import { GetTrainerTeamUseCase } from '@application/use-cases/GetTrainerTeamUseCase';

export class TrainerController {
  constructor(
    private readonly createTrainerUseCase: CreateTrainerUseCase,
    private readonly capturePokemonUseCase: CapturePokemonUseCase,
    private readonly getTrainerTeamUseCase: GetTrainerTeamUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const trainer = await this.createTrainerUseCase.execute(req.body.name, req.body.email);
      res.status(201).json(trainer);
    } catch (error) {
      next(error);
    }
  }

  async capture(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const trainerId = Array.isArray(req.params.trainerId)
        ? req.params.trainerId[0]
        : req.params.trainerId;
      const capture = await this.capturePokemonUseCase.execute(
        trainerId,
        req.body.name,
      );
      res.status(201).json(capture);
    } catch (error) {
      next(error);
    }
  }

  async team(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const trainerId = Array.isArray(req.params.trainerId)
        ? req.params.trainerId[0]
        : req.params.trainerId;
      const team = await this.getTrainerTeamUseCase.execute(trainerId);
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
