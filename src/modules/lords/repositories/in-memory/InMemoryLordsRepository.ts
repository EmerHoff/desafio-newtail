import { Lord } from "../../entities/Lord";

import { ICreateLordDTO } from "../../useCases/ICreateLordDTO";
import { ILordsRepository } from "../ILordsRepository";


export class InMemoryLordsRepository implements ILordsRepository {
    private lords: Lord[] = [];

    async create(data: ICreateLordDTO): Promise<Lord> {
        const lord = new Lord();
        Object.assign(lord, data);

        this.lords.push(lord);
        return lord;
    }

    async findById(lord_id: string): Promise<Lord | undefined> {
        return this.lords.find(lord => lord.id === lord_id);
    }

    async findByName(name: string): Promise<Lord | undefined> {
        return this.lords.find(lord => lord.name === name);
    }
}