import { Lord } from "../../../lords/entities/Lord";

export interface ICreateHouseDTO {
  name: string;
  region: string;
  founded_in: number;
  lord: Lord;
}
