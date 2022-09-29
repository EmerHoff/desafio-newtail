import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryLordsRepository } from "../../../lords/repositories/in-memory/InMemoryLordsRepository";
import { CreateLordUseCase } from "../../../lords/useCases/CreateLordUseCase";
import { House } from "../../entities/House";
import { InMemoryHousesRepository } from "../../repositories/in-memory/InMemoryHousesRepository";
import { CreateHouseUseCase } from "../createHouse/CreateHouseUseCase";
import { ICreateHouseDTO } from "../createHouse/ICreateHouseDTO";
import { ListHouseUseCase } from "./ListHouseUseCase";

let inMemoryHousesRepository: InMemoryHousesRepository;
let inMemoryLordsRepository: InMemoryLordsRepository;
let createHouseUseCase: CreateHouseUseCase;
let createLordUseCase: CreateLordUseCase;
let listHouseUseCase: ListHouseUseCase;

describe('Remove a house', () => {
    beforeEach(() => {
        inMemoryHousesRepository = new InMemoryHousesRepository();
        inMemoryLordsRepository = new InMemoryLordsRepository();
        createLordUseCase = new CreateLordUseCase(inMemoryLordsRepository);
        createHouseUseCase = new CreateHouseUseCase(inMemoryHousesRepository);
        listHouseUseCase = new ListHouseUseCase(inMemoryHousesRepository);
    });

    it('should be able to list a created house', async () => {
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

        const houses = await listHouseUseCase.execute({ id: house.id });

        expect(houses.every(house => house instanceof House)).toBeTruthy();
        expect(houses[0].name).toEqual('House Test');
    });
})