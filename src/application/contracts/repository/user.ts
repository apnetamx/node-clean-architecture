import { UserInputModel, Credential } from "../../domain";

export interface IUserRepository {
    addNewUser(user: UserInputModel): Promise<boolean>;
    authenticateUser(details: Credential): Promise<string>;
}