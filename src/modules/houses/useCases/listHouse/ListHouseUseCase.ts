import { inject, injectable } from "tsyringe";
import { IHousesRepository } from "../../repositories/IHousesRepository";
import { IListHouseDTO } from "./IListHouseDTO";

@injectable()
export class ListHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
  ) {}

  async execute({ id, name, page, limit }: IListHouseDTO) {
    const houses = await this.housesRepository.findAll({ id, name, page, limit });

    return houses;
  }
}
