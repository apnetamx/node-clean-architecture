import { UserInputModel, Credential } from "../../application/domain";
import { RepositoryMongoDB } from "../../repository";
import { RegisterUserUseCase } from "../../application/services/auth/register";
import { Token } from "../../token";
import { AuthenticateUserUseCase } from "../../application/services/auth/login";

export class UserController {
    async registerUser(user: UserInputModel): Promise<string> {
        const repo = RepositoryMongoDB.getInstance();
        const tokenGenerator = new Token();
        const useCase = new RegisterUserUseCase(repo, tokenGenerator);
        const data = useCase.execute(user);
        return data;
    }

    async authenticateUser(details: Credential): Promise<string> {
        const repo = RepositoryMongoDB.getInstance();
        const tokenGenerator = new Token();
        const useCase = new AuthenticateUserUseCase(repo, tokenGenerator);
        const data = useCase.execute(details);
        return data;
    }
}