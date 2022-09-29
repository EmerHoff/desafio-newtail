import { ListHouseUseCase } from "./ListHouseUseCase";
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListHouseController {
    async execute(request: Request, response: Response) {
        const { id, name, page, limit } = request.query;

        const listHouse = container.resolve(ListHouseUseCase);

        const houses = await listHouse.execute({
            id: id?.toString(),
            name: name?.toString(),
            page: page?.toString(),
            limit: limit?.toString()
        });

        return response.status(200).json({ houses });
    }
}
