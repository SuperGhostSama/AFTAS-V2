import { AuthorityEnum } from "../enums/authority.enum";

export interface Role {
  id: number;
  name: string;
  authorities: AuthorityEnum[];
  isDefault: boolean;
}