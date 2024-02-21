import { Role } from "src/app/modal/entities/role.interface";

export interface AuthenticationResponseDTO {
    token: string;
    name: string;
    familyName: string;
    email: string;
    role: Role;
}