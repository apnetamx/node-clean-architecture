import { ExpressServer} from './server/express.server';
import { UserInputModel } from './application/domain';
import { UserController } from './controller';


export default class App {
    private express_Server: ExpressServer;
    private port: string|number;

    constructor(port: number) {
      this.express_Server=new ExpressServer();
      this.port=port;
    }

    public async start():Promise<string>{
      try{
        const data:UserInputModel= {
          "username":       "AndresPosada",
          "password":       "cositas2",
          "firstName":      "Feos Todos jeje",
          "lastName":        "Posada",
          "email":          "andresposada015@gmail.com",
          "zipPostalCode":  "050021",
          "address1":       "Cra 27 # 7b - 50",
          "phoneNumber":    "3137938895",
          "city":           "Medellin",
        };
        
        const userController= new UserController();
        const result_add=await userController.registerUser(data);
        console.log("Los id son: "+result_add);
        //id=await _userService.authenticateUser({identifier: 'Andres',password: '456'});
        this.express_Server.listen(this.port);
        return "Server Listening On Port "+this.port;
      }catch(error){
        return  "Could Not Start Server on port "+this.port;
      }
    }

}