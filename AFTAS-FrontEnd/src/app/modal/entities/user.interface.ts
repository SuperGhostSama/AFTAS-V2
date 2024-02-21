import { Role } from '../entities/role.interface';
import { IdentityDocumentType } from '../enums/IdentityDocumentType.enum';

export interface User {
  id: number;
  membershipNumber: number;
  name: string;
  familyName: string;
  accessDate: Date;
  nationality: string;
  identityDocumentType: IdentityDocumentType;
  identityNumber: string;
  hunting: any[]; 
  ranking: any[]; 
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  role: Role;
}