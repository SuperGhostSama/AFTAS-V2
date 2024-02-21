import { Role } from "../entities/role.interface";
import AuthorityEnum from "../enums/authority.enum";

export interface Authority {
  id: number;
  roles: Role[];
  name: AuthorityEnum;
}