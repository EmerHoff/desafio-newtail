import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryLordsRepository } from "../../../lords/repositories/in-memory/InMemoryLordsRepository";
import { CreateLordUseCase } from "../../../lords/useCases/CreateLordUseCase";
import { InMemoryHousesRepository } from "../../repositories/in-memory/InMemoryHousesRepository";
import { CreateHouseUseCase } from "../createHouse/CreateHouseUseCase";
import { ICreateHouseDTO } from "../createHouse/ICreateHouseDTO";
import { RemoveHouseUseCase } from "./RemoveHouseUseCase";

let inMemoryHousesRepository: InMemoryHousesRepository;
let inMemoryLordsRepository: InMemoryLordsRepository;
let createHouseUseCase: CreateHouseUseCase;
let createLordUseCase: CreateLordUseCase;
let removeHouseUseCase: RemoveHouseUseCase;

describe('Remove a house', () => {
    beforeEach(() => {
        inMemoryHousesRepository = new InMemoryHousesRepository();
        inMemoryLordsRepository = new InMemoryLordsRepository();
        createLordUseCase = new CreateLordUseCase(inMemoryLordsRepository);
        createHouseUseCase = new CreateHouseUseCase(inMemoryHousesRepository);
        removeHouseUseCase = new RemoveHouseUseCase(inMemoryHousesRepository);
    });

    it('should be able to remove a created house', async () => {
        const lord = await createLordUseCase.execute({
            name: 'Lord House Test',
            seasons: ['Season 1', 'Season 2'],
        });

        const houseInfo: ICreateHouseDTO = {
            name: 'House Test',
            region: 'Region Test',
            founded_in: 1000,
            lord: lord,
        };

        const house = await createHouseUseCase.execute(houseInfo);

        expect(house).toHaveProperty('id');

        await removeHouseUseCase.execute({ id: house.id || '' });
    });

    it('should not be able to remove a not existing house', async () => {
        expect(async () => {
            await removeHouseUseCase.execute({ id: 'not-exists' });
        }).rejects.toEqual(new AppError('House not found', 404));
    });
})