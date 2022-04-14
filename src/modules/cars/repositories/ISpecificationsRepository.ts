import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationRepository {
  findByName(name: string): Promise<Specification>;
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRepository };
