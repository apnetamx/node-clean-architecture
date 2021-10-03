import { Credential } from "../../application/domain";
import { IUserRepository } from 'application/contracts/repository';
import { UserInputModel} from 'application/domain/user';
import { UserBaseModel } from 'repository/entities';
import { UserMapper } from '../mapper/user';
import RepositoryMongoDB from './mongoDB'
 
export class Repositories implements IUserRepository  {
    private static instance: Repositories = new  Repositories();
    private  mongoDB: RepositoryMongoDB
    private  userMapper: UserMapper
    constructor() {
        this.userMapper = new UserMapper();
        this.mongoDB = new RepositoryMongoDB();
    }

    async addNewUser(user: UserInputModel): Promise<boolean> {
       const data: UserBaseModel = this.userMapper.mapFrom(user);
       const mongoResult=await this.mongoDB.addNewUser(data);
       if(mongoResult) {
           return new Promise((resolve) => resolve(true));
       }
       return new Promise((resolve, reject) => reject());
    }

    async authenticateUser(details: Credential): Promise<string> {
       const mongoResult=await this.mongoDB.authenticateUser(details);
       if(mongoResult) {
           return new Promise((resolve) => (mongoResult));
       }
       return new Promise((resolve, reject) => reject());
    }
}