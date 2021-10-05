import { UseCase } from "../../../base";
import { UserInputModel } from "../../../domain";
import { UserService } from "../../../services/entities";
import { ITokenGenerator } from "../../../contracts/token";
import { User, UserBaseModel } from "../../../../data/entities";
import { IServiceResponse,ServiceResponse } from "../../../../application/base/service";

export class RegisterUserUseCase implements UseCase<UserInputModel, null|Array<string|null>> {
    public inputData: UserInputModel;
    private _userService: UserService;
    private tokenGen: ITokenGenerator;

    constructor(user: UserInputModel,token: ITokenGenerator ) {
        this.inputData=user;
        this._userService = new UserService();
        this.tokenGen = token;
    }
        
    async execute(): Promise<null|Array<string|null>> {
        try{
            if(this._userService==null) return null;
            const user=await this._userService.newUserInstance(this.inputData);
            if(!user) return null;
            const result = await this._userService.addNewUser(user);
            if(!result || result.successes==null || result.successes.length==0) return null;
            var maxInfo=10;
            var filteredSucceses=[]
            let i=0;
            //Aca hago condiciones con respecto a respuestas de base de datos
            while(i<result.successes.length && i<maxInfo){
                const tk=this.tokenGen.generateToken(result.successes[i].response);
                if(tk!=null){
                    result.successes[i].response=tk;
                    filteredSucceses.push(tk);
                }
                i++;
            }
            return filteredSucceses;
        } catch(error){
            //console.log(error)
            return null;
        }
    }

}