import { Mapper } from "../../application/base";
import { UserInputModel, UserTypes } from "../../application/domain";
import { UserBaseModel } from "../entities";
import * as models from "repository/models";

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

export class UserMapperMongoDB extends Mapper<models.UserMongoDB, UserBaseModel> {
    mapFrom(param: models.UserMongoDB): UserBaseModel {
        return {
            _id: null,
            email: param.email,
            password: param.password,
            userType: UserTypes.Regular,
            firstName: param.firstName,
            lastName: param.lastName
        }
    }    
    mapTo(param: UserBaseModel): models.UserMongoDB {
        return {
            password: param.password,
            email: param.email,
            userType: param.userType,
            firstName: param.firstName,
            lastName: param.lastName
        }
    }
}


export class UserMapperOtherDB extends Mapper<models.UserOtherDB, UserBaseModel> {
    mapFrom(param: models.UserOtherDB): UserBaseModel {
        return {
            _id: null,
            email: param.email,
            password: param.password,
            userType: UserTypes.Regular,
            firstName: param.firstName,
            lastName: param.lastName
        }
    }    
    mapTo(param: UserBaseModel): models.UserOtherDB {
        return {
            password: param.password,
            email: param.email,
            userType: param.userType,
            firstName: param.firstName,
            lastName: param.lastName
        }
    }
}