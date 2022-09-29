import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryLordsRepository } from "../../../lords/repositories/in-memory/InMemoryLordsRepository";
import { CreateLordUseCase } from "../../../lords/useCases/CreateLordUseCase";
import { InMemoryHousesRepository } from "../../repositories/in-memory/InMemoryHousesRepository";
import { CreateHouseUseCase } from "./CreateHouseUseCase";
import { ICreateHouseDTO } from "./ICreateHouseDTO";

let inMemoryHousesRepository: InMemoryHousesRepository;
let inMemoryLordsRepository: InMemoryLordsRepository;
let createHouseUseCase: CreateHouseUseCase;
let createLordUseCase: CreateLordUseCase;

describe('Create a new house', () => {
    beforeEach(() => {
        inMemoryHousesRepository = new InMemoryHousesRepository();
        inMemoryLordsRepository = new InMemoryLordsRepository();
        createLordUseCase = new CreateLordUseCase(inMemoryLordsRepository);
        createHouseUseCase = new CreateHouseUseCase(inMemoryHousesRepository);
    });

    it('should be able to create a new house', async () => {
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
    });

    it('should not be able to create a new house with the same name', async () => {
        expect(async () => {
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
    
            await createHouseUseCase.execute(houseInfo);

            await createHouseUseCase.execute(houseInfo);

        }).rejects.toEqual(new AppError('House already exists', 400));
    });
})