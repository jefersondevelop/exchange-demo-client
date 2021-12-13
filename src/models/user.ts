import { Profile } from "./profile";
export enum UserStatus {
    PENDING_FOR_DOCUMENT = 'PENDING_FOR_DOCUMENT'
}
import { Role } from "./role";

export interface User {
    email?: string,
    profile?: Profile,
    role?: Role,
    status?: string,
    password?: string,
    newPassword?: string,
    confirmPassword?: string
}