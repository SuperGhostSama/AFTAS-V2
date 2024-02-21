import { AuthorityEnum } from '../../modal/enums/authority.enum';

export interface RoleRequestDTO {
    name: string;
    authorities: AuthorityEnum[];
    isDefault: boolean;
}