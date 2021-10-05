import { UseCase } from "../../../base";
import { ITokenGenerator } from "../../../contracts/token";
import { Credential } from '../../../domain';
import { UserService } from "../../entities/user";

export class AuthenticateUserUseCase implements UseCase<Credential, string|null> {
    private credential: Credential;
    private _userService: UserService;
    private tokenGen: ITokenGenerator;

    constructor(credential: Credential,tGen: ITokenGenerator) {
        this.credential=credential;
        this._userService = new UserService();
        this.tokenGen = tGen;
    }

    public async execute(params: Credential): Promise<string|null> {
        const result=await this._userService.authenticateUser(this.credential);
        //Aca hacer cosas cn tGen
        return result;
    }

}