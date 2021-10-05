import mongoose from 'mongoose';
import { MongooseConnectionType, MongooseConnectionInputParams,MongooseConnectionOptions } from '../application/base/types';

export class MongooseConnection {
    public name: string;
    public params: MongooseConnectionInputParams;
    public uri: string;
    public options: MongooseConnectionOptions;
    public connection: MongooseConnectionType;

    constructor(name: string,params: MongooseConnectionInputParams ,options: MongooseConnectionOptions) {
      this.name=name;
      this.params=params;
      this.uri=this.generateMongooseURI(params);
      this.options=options;
      this.connection=mongoose.connection;
    }

    private generateMongooseURI(params:MongooseConnectionInputParams):string {
        var auth;
        (params.username) ? (params.password) ? auth=params.username+':'+params.password + '@' : auth='' : auth='';
        return 'mongodb://'+auth+params.host+':'+params.port+'/'+params.database;
    }

    public async connectMongoose() : Promise<boolean> {
        try{
            this.connection=(await mongoose.connect(this.uri,this.options)).connection;
            return true;
        }catch(error){
            return false;
        } 
    }

    public async disconnectMongoose() : Promise<boolean> {
        try{
            await this.connection.close();
            return false;
        }catch(error){
            return true;
        } 
    }

    public toString = () : string => {
        return this.name;
    }
}