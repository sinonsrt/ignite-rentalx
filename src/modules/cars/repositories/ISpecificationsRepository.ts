import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  description: string;
  name: string;
}
interface ISpecificationRepository {
  findByName(name: string): Promise<Specification>;
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
