export interface UserInputModel {
    _id?: string|null;
    email: string;
    password: string;
    userType: string;
    firstName?: string;
    lastName?: string;
}