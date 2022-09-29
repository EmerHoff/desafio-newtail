import { Lord } from '../entities/Lord';
import { ICreateLordDTO } from '../useCases/ICreateLordDTO';

export interface ILordsRepository {
  create: (data: ICreateLordDTO) => Promise<Lord>;
  findById: (lord_id: string) => Promise<Lord | undefined>;
  findByName: (name: string) => Promise<Lord | undefined>;
}
