import { AuthorityEnum } from '../../modal/enums/authority.enum';

export interface RoleResponseDTO {
    name: string;
    authorities: AuthorityEnum[];
    isDefault: boolean;
}