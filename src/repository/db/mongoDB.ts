import { IUserRepository } from "../../application/contracts/repository";
import { Credential } from "../../application/domain";
import { UserBaseModel } from "../entities/user";
import { UserMapperMongoDB } from "../mapper/user";
import models from '../models/'

const {User} = models.mongoDB;
 
export default class RepositoryMongoDB implements IUserRepository  {
    private static instance: RepositoryMongoDB = new RepositoryMongoDB();
    private userMapper: UserMapperMongoDB;
    
    constructor() {
        this.userMapper = new UserMapperMongoDB();
    }

    async addNewUser(user: UserBaseModel): Promise<boolean> {
       const data = this.userMapper.mapTo(user);
       const result = await new User(data).save();
       if(result) {
           return new Promise((resolve) => resolve(true));
       }
       return new Promise((resolve, reject) => reject());
    }

    async authenticateUser(details: Credential): Promise<string> {
       const result = await User.findOne(details);
       if(result && result.id) {
           return new Promise((resolve) => resolve(result.id as string));
       }
       return new Promise((resolve, reject) => reject());
    }
}