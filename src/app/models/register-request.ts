import { UserType } from "./user-type.enum";

export interface RegisterRequest {
    email?: string;
    username?: string;
    password?: string;
    profileImage?: string;
    govId?: number;
    cityId?: number;
    userType?: UserType;
    role?: string;
}
