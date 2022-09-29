import { getRepository, Repository } from "typeorm";

import { House } from "../entities/House";
import { ICreateHouseDTO } from "../useCases/createHouse/ICreateHouseDTO";
import { IListHouseDTO } from "../useCases/listHouse/IListHouseDTO";
import { IHousesRepository } from "./IHousesRepository";

export class HousesRepository implements IHousesRepository {
    private repository: Repository<House>;

    constructor() {
        this.repository = getRepository(House);
    }

    async findAll({ id, name, page, limit }: IListHouseDTO) {
        const houseBuilder = this.repository.createQueryBuilder('houses')
            .innerJoinAndSelect('houses.lord_id', 'lord')

        if (id) {
            houseBuilder.andWhere('houses.id = :id', { id });
        }

        if (name) {
            houseBuilder.andWhere('houses.name = :name', { name });
        }

        if (page && limit) {
            houseBuilder.skip(Number(page) * Number(limit)).take(Number(limit));
        } else {
            houseBuilder.skip(0).take(10);
        }

        return await houseBuilder.getMany();
    }

    async findById(house_id: string): Promise<House | undefined> {
        return this.repository.findOne(house_id, { relations: ['lord_id'] });
    }

    async findByName(name: string): Promise<House | undefined> {
        return this.repository.findOne({
            where: { name },
            relations: ['lord_id'],
        });
    }

    async create({ name, region, founded_in, lord }: ICreateHouseDTO): Promise<House> {
        const house = this.repository.create({ name, region, founded_in, lord_id: lord });

        return this.repository.save(house);
    }

    async removeById(house_id: string): Promise<void> {
        await this.repository.delete({ id: house_id });
    }
}
