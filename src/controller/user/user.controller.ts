import { UserInputModel, Credential } from "../../application/domain";
import { RegisterUserUseCase } from "../../application/services/useCases/auth/register";
import { Token } from "../../token";
import { AuthenticateUserUseCase } from "../../application/services/useCases/auth/login";

export class UserController {
    async registerUser(user: UserInputModel): Promise<null|Array<string|null>> {
        try{
            const tokenGenerator = new Token();
            const useCase = new RegisterUserUseCase(user,tokenGenerator);
            const data = await useCase.execute();
            if(data==null || data.length==0) return null;
            return data;
        }catch(error){
            //console.log(error);
            return null;
        }   
        
    }

    async authenticateUser(details: Credential): Promise<string|null> {
        const tokenGenerator = new Token();
        const useCase = new AuthenticateUserUseCase(details,tokenGenerator);
        const data = useCase.execute(details);
        return data;
    }
}