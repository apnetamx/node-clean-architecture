import bcrypt from 'bcryptjs';
import {  User,UserBaseModel } from "../../../data/entities";
import { IUserRepository } from "../../contracts";
import {RepositoryMongoDB} from "../../../data/db/mongoDB";
import {RepositoryMySQL} from "../../../data/db/mySQL";
import { Credential, UserInputModel } from '../../../application/domain';
import { ServiceResponse,IServiceResponse,GroupedService, IGroupedService } from '../../../application/base';
import { MySQL2ConnectionType,MongooseConnectionType,ConnectionType } from '../../../application/base/types';
import { Connection,DataBaseConnections } from '../../../connections';
export class UserService{
    public connections:Array<Connection> = DataBaseConnections.availableConnections;
    public repos: Array<MySQL2ConnectionType|MongooseConnectionType>=[];

    constructor(){
        this.connections.forEach(c=> (c.connection==null) ? null : (c.type==ConnectionType.Mongoose) ? new RepositoryMongoDB(c.connection) : (c.type==ConnectionType.MySQL2) ? new RepositoryMongoDB(c.connection) : null);
    }
   
    //Independiente de base de datos
    public async newUserInstance(data?:UserInputModel): Promise<UserBaseModel|null> {
        try{
            const user=new User(data);
            const encryptPassword=await this.encryptPasswordAsync(user.password);
            (encryptPassword==null) ? user.password=user.password : user.password=encryptPassword;
            return user;
        } catch(error){
            //console.log(error);
            return null;
        }
        
    };
    public async encryptPasswordAsync(password: string): Promise<string|null> {
        try{
            const salt = await bcrypt.genSalt(15);
            return await bcrypt.hash(password,salt);
        }
        catch(error){
            //console.log("Error Encrypting Password");
            return null;
        }
    };
    public async checkPasswordAsync(password: string,recievedPassword:string): Promise<boolean|null> {
        try{
            return await bcrypt.compare(password,recievedPassword);
        }
        catch(error){
            //console.log("Error Comparing Passwords");
            return null;
        }
    };

    //Conjunto de servicios bases de datos
    async addNewUser(user: UserBaseModel): Promise<IGroupedService<string,null>|null>{
        try{
            if(user==null || user==undefined) return null;
            var promises: Array<Promise<string|null>> = [];
            const entries=Object.entries(this.repos);
            
            entries.forEach(entry => promises.push((<IUserRepository>entry[1]).addNewUser(user)));
            const result_promises=await Promise.all(promises);
            if(result_promises.length>0){
                var succeses: Array<IServiceResponse<string>>=[];
                var errores: Array<IServiceResponse<null>>=[];
                result_promises.forEach((result,index)=> (result==null) ? errores.push((new ServiceResponse(result,entries[index][0],index))) : succeses.push((new ServiceResponse(result,entries[index][0],index))));
                return new GroupedService(promises,succeses,errores);
            } else{
                return null;
            }
        }catch(error){
            //console.log(error);
            return null;
        }
    }

    async authenticateUser(credential: Credential): Promise<string|null>{
        try{
            if(credential==null || credential==undefined) return null;
            var promises: Array<Promise<string|null>> = [];
            const entries=Object.entries(this.repos);
            
            entries.forEach(entry => promises.push((<IUserRepository>entry[1]).authenticateUser(credential)));
            const result_promises=await Promise.all(promises);
            
            if(result_promises.length>0){
                var success: Array<string>=[];
                var errors: Array<string>=[];
                result_promises.forEach((result,index)=> (result) ? errors.push(entries[index][0]) : success.push(entries[index][0]))
                return (errors.length>0) ? null : result_promises[0];
            } else{
                return null;
            }
        }catch(error){
            //console.log(error);
            return null;
        }
    }
}
