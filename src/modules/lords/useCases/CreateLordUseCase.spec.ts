import { AppError } from "../../../shared/errors/AppError";
import { InMemoryLordsRepository } from "../repositories/in-memory/InMemoryLordsRepository";
import { CreateLordUseCase } from "./CreateLordUseCase";
import { ICreateLordDTO } from "./ICreateLordDTO";

let inMemoryLordsRepository: InMemoryLordsRepository;
let createLordUseCase: CreateLordUseCase;

describe('Create a new lord', () => {
    beforeEach(() => {
        inMemoryLordsRepository = new InMemoryLordsRepository();
        createLordUseCase = new CreateLordUseCase(inMemoryLordsRepository);
    });

    it('should be able to create a new lord', async () => {
        const lordInfo: ICreateLordDTO = {
            name: 'Lord',
            seasons: ['Season 1', 'Season 2'],
        };

        const lord = await createLordUseCase.execute(lordInfo);

        expect(lord).toHaveProperty('id');
        expect(lord).toHaveProperty('name');
        expect(lord).toHaveProperty('seasons');
    });

    it('should not be able to create a new lord with the same name', async () => {
        expect(async () => {
            const lordInfo: ICreateLordDTO = {
                name: 'Lord 1',
                seasons: ['Season 1'],
            };
    
            await createLordUseCase.execute(lordInfo);

            await createLordUseCase.execute(lordInfo);
        }).rejects.toEqual(new AppError('Lord already exists', 400));
    });
})