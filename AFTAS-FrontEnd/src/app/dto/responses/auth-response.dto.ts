import { Role } from "src/app/modal/entities/role.interface";

export interface AuthenticationResponseDTO {
    token: string;
    refreshToken: string;
    name: string;
    familyName: string;
    email: string;
    role: Role;
}