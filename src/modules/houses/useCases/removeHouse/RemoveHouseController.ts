import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RemoveHouseUseCase } from './RemoveHouseUseCase';

export class RemoveHouseController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;

        const removeHouse = container.resolve(RemoveHouseUseCase);

        await removeHouse.execute({ id });

        return response.status(200).json({ message: 'House removed successfully', success: true });
    }
}
