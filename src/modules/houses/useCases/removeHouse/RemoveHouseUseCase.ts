import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IHousesRepository } from "../../repositories/IHousesRepository";
import { IRemoveHouseDTO } from "./IRemoveHouseDTO";

@injectable()
export class RemoveHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
  ) {}

  async execute({ id }: IRemoveHouseDTO) {
    const house = await this.housesRepository.findById(id);

    if (!house) {
        throw new AppError('House not found', 404);
    }

    await this.housesRepository.removeById(id);
  }
}
