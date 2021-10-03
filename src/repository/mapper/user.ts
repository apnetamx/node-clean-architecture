import { Mapper } from "../../application/base";
import { UserInputModel, UserTypes } from "../../application/domain";
import { UserBaseModel } from "../entities";
import models from '../models/';
import * as model_types from '../models';

const UserMongoDB = models.mongoDB.User;

export class UserMapper extends Mapper<UserInputModel, UserBaseModel> {
    mapFrom(param: UserInputModel): UserBaseModel {
        return {
            _id: null,
            email: param.email,
            password: param.password,
            userType: UserTypes.Regular,
            firstName: param.firstName,
            lastName: param.lastName
        }
    }    
    mapTo(param: UserBaseModel): UserInputModel {
        return {
            _id: param._id,
            email: param.email,
            password: param.password,
            userType: param.userType,
            firstName: param.firstName,
            lastName: param.lastName
        }
    }
}

export class UserMapperMongoDB extends Mapper<model_types.UserMongoDB, UserBaseModel> {
    mapFrom(param: model_types.UserMongoDB): UserBaseModel {
        return {
            _id: null,
            email: param.email,
            password: param.password,
            userType: UserTypes.Regular,
            firstName: param.firstName,
            lastName: param.lastName
        }
    }    
    mapTo(param: UserBaseModel): model_types.UserMongoDB {
        return new UserMongoDB({
            password: param.password,
            email: param.email,
            userType: param.userType,
            firstName: param.firstName,
            lastName: param.lastName
        })
    }
}


export class UserMapperOtherDB extends Mapper<model_types.UserOtherDB, UserBaseModel> {
    mapFrom(param: model_types.UserOtherDB): UserBaseModel {
        return {
            _id: null,
            email: param.email,
            password: param.password,
            userType: UserTypes.Regular,
            firstName: param.firstName,
            lastName: param.lastName
        }
    }    
    mapTo(param: UserBaseModel): model_types.UserOtherDB {
        return new UserMongoDB({
            password: param.password,
            email: param.email,
            userType: param.userType,
            firstName: param.firstName,
            lastName: param.lastName
        })
    }
}