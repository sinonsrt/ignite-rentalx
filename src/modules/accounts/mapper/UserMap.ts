import { IUserResponseDTO } from "../dtos";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
  }: User): IUserResponseDTO {
    return {
      email,
      name,
      id,
      avatar,
      driver_license,
    };
  }
}

export { UserMap };
