import { inject, injectable } from "tsyringe";
import { IHousesRepository } from "../../repositories/IHousesRepository";
import { ICreateHouseDTO } from "./ICreateHouseDTO";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class CreateHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
  ) {}

  async execute({ name, region, founded_in, lord }: ICreateHouseDTO) {
    const houseAlreadyExists = await this.housesRepository.findByName(name);

    if (houseAlreadyExists) {
      throw new AppError('House already exists', 400);
    }

    const house = await this.housesRepository.create({
      name,
      region,
      founded_in,
      lord,
    });

    return house;
  }
}
