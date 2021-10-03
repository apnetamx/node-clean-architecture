import { UserTypes } from "../../application/domain/user-types";

export interface UserBaseModel {
    _id?: string|null;
    email: string;
    password: string;
    userType: UserTypes;
    firstName?: string;
    lastName?: string;
}