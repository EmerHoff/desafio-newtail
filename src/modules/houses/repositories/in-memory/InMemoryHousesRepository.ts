import { House } from "../../entities/House";
import { ICreateHouseDTO } from "../../useCases/createHouse/ICreateHouseDTO";

import { IListHouseDTO } from "../../useCases/listHouse/IListHouseDTO";
import { IHousesRepository } from "../IHousesRepository";


export class InMemoryHousesRepository implements IHousesRepository {
    private houses: House[] = [];

    async create(data: ICreateHouseDTO): Promise<House> {
        const house = new House();
        Object.assign(house, data);

        this.houses.push(house);
        return house;
    }

    async findById(house_id: string): Promise<House | undefined> {
        return this.houses.find(house => house.id === house_id);
    }

    async findByName(house_name: string): Promise<House | undefined> {
        return this.houses.find(house => house.name === house_name);
    }

    async findAll(data: IListHouseDTO): Promise<House[] | []> {
        let foundHouses = this.houses.filter(house => {
            if (data.id && house.id === data.id) {
                return house;
            }

            if (data.name && house.name === data.name) {
                return house;
            }
        });

        return foundHouses;
    }

    async removeById(house_id: string): Promise<void> {
        const house = this.houses.findIndex(house => house.id === house_id);
        this.houses = this.houses.slice(house, 1);
    }
}