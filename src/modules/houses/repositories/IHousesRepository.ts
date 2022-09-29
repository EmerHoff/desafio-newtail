import { House } from '../entities/House';
import { ICreateHouseDTO } from '../useCases/createHouse/ICreateHouseDTO';
import { IListHouseDTO } from '../useCases/listHouse/IListHouseDTO';

export interface IHousesRepository {
  create: (data: ICreateHouseDTO) => Promise<House>;
  findAll: (data: IListHouseDTO) => Promise<House[] | []>;
  findById: (house_id: string) => Promise<House | undefined>;
  findByName: (house: string) => Promise<House | undefined>;
  removeById: (house_id: string) => Promise<void>;
}
