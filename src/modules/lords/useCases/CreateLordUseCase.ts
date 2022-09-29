import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { Lord } from "../entities/Lord";
import { ILordsRepository } from "../repositories/ILordsRepository";
import { ICreateLordDTO } from "./ICreateLordDTO";

@injectable()
export class CreateLordUseCase {
  constructor(
    @inject('LordsRepository')
    private lordsRepository: ILordsRepository,
  ) {}

  async execute({ name, seasons }: ICreateLordDTO): Promise<Lord> {
    const lordAlreadyExists = await this.lordsRepository.findByName(name);

    if (lordAlreadyExists) {
      throw new AppError('Lord already exists', 400);
    }

    const lord = await this.lordsRepository.create({
      name,
      seasons,
    });

    return lord;
  }
}
