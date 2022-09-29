import { getRepository, Repository } from "typeorm";

import { Lord } from "../entities/Lord";
import { ICreateLordDTO } from "../useCases/ICreateLordDTO";
import { ILordsRepository } from "./ILordsRepository";

export class LordsRepository implements ILordsRepository {
  private repository: Repository<Lord>;

  constructor() {
    this.repository = getRepository(Lord);
  }

  async findById(lord_id: string): Promise<Lord | undefined> {
    return this.repository.findOne(lord_id);
  }

  async findByName(name: string): Promise<Lord | undefined> {
    return this.repository.findOne({
        name,
    });
  }

  async create({ name, seasons }: ICreateLordDTO): Promise<Lord> {
    const lord = this.repository.create({ name, seasons });

    return this.repository.save(lord);
  }
}
