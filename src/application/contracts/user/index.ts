import { Credential } from "../../domain";
import { UserBaseModel} from "../../../data/entities";
export interface IUserRepository {
    addNewUser(user: UserBaseModel): Promise<string|null>;
    authenticateUser(params: Credential): Promise<string|null>;
}