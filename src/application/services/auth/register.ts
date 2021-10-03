import { UseCase } from "../../base";
import { UserInputModel } from "../../domain";
import { IUserRepository } from "../../contracts/repository/user";
import { Token } from "../../../token";
import { ITokenGenerator } from "../../contracts/token/token";

export class RegisterUserUseCase implements UseCase<UserInputModel, string> {
    repository: IUserRepository;
    tokenGen: ITokenGenerator;

    constructor(repo: IUserRepository, token: ITokenGenerator ) {
        this.repository = repo;
        this.tokenGen = token;
    }

    async execute(params: UserInputModel): Promise<string> {
        const result = await this.repository.addNewUser(params);
        let token;
        if(result) {
            token = this.tokenGen.generateToken(params._id as string);
        } else {
            token = '';
        }
        return token;
    }

}