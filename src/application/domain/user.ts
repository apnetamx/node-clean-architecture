import { UserTypes } from "./user-types";

export interface UserInputModel {
    _id?: string|null;
    email: string;
    password: string;
    userType: UserTypes;
    firstName?: string;
    lastName?: string;
}