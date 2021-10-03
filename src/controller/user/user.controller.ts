import { UserInputModel, Credential } from "application/domain";
import { dbs,entities } from "../../data";
import { RegisterUserUseCase } from "../../application/services/auth/register";
import { Token } from "../../token";
import { AuthenticateUserUseCase } from "../../application/services/auth/login";

export class UserController {
    async registerUser(user: UserInputModel): Promise<string> {
        dbs.Repositories.getInstances();
        const tokenGenerator = new Token();
        const useCase = new RegisterUserUseCase(dbs.Repositories.mongoDB, tokenGenerator);
        const data = useCase.execute(user);
        return data;
    }

    async authenticateUser(details: Credential): Promise<string> {
        dbs.Repositories.getInstances();
        const tokenGenerator = new Token();
        const useCase = new AuthenticateUserUseCase(dbs.Repositories.mongoDB, tokenGenerator);
        const data = useCase.execute(details);
        return data;
    }
}