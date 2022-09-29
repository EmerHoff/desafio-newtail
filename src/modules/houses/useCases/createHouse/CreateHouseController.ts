import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateLordUseCase } from '../../../lords/useCases/CreateLordUseCase';
import { CreateHouseUseCase } from './CreateHouseUseCase';

export class CreateHouseController {
  async execute(request: Request, response: Response) {
    const { name, region, founded_in, lord_name, lord_seasons } = request.body;

    const createLord = container.resolve(CreateLordUseCase);

    const lord = await createLord.execute({
      name: lord_name,
      seasons: lord_seasons,
    });

    const createHouse = container.resolve(CreateHouseUseCase);

    await createHouse.execute({
      name,
      region,
      founded_in,
      lord: lord,
    });

    return response.status(201).json({ message: 'House created successfully', success: true });
  }
}
