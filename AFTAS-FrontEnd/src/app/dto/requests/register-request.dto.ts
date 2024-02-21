import { IdentityDocumentType } from "src/app/modal/enums/IdentityDocumentType.enum";

export interface RegisterRequestDTO {
    name: string;
    familyName: string;
    accessDate?: string; 
    nationality: string;
    email: string;
    identityDocumentType: IdentityDocumentType;
    identityNumber: string;
    password: string;
    membershipNumber: number;
}