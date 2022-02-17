import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
  description: string;
  name: string;
}
interface ISpecificationRepository {
  findByName(name: string): Specification;
  create({ description, name }: ICreateSpecificationDTO): void;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
