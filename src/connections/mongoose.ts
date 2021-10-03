import mongoose from 'mongoose';


export type MongooseConnectionStatus = {
    status: boolean;
    mongoose: typeof mongoose|null|undefined;
};


export type MongooseConnectionInputParams = {
    username: string;
    password: string;
    host: string,
    port: string|number,
    database: string
};

export class MongooseConnection {
    public name: string;
    public params: MongooseConnectionInputParams;
    public uri: string;
    public options: mongoose.ConnectOptions;

    constructor(name: string,params: MongooseConnectionInputParams ,options: mongoose.ConnectOptions) {
      this.name=name;
      this.params=params;
      this.uri=this.generateMongooseURI(params);
      this.options=options;
    }

    private generateMongooseURI(params:MongooseConnectionInputParams):string {
        var auth;
        (params.username) ? (params.password) ? auth=params.username+':'+params.password + '@' : auth='' : auth='';
        return 'mongodb://'+auth+params.host+':'+params.port+'/'+params.database;
    }

    public async connectMongoDB() : Promise<MongooseConnectionStatus> {
        try{
            return {
                status: true,
                mongoose: await mongoose.connect(this.uri,this.options)
            }
        }catch(error){
            return {
                status: false,
                mongoose: null
            }
        } 
    }

    public async disconnectMongoDB() : Promise<MongooseConnectionStatus> {
        try{
            await mongoose.connection.close();
            return {
                status: false,
                mongoose: null
            }
        }catch(error){
            if(mongoose.connection){
                return {
                    status: true,
                    mongoose: mongoose
                }
            } else{
                return {
                    status: false,
                    mongoose: null
                }
            }
            
        } 
    }

    public toString = () : string => {
        return this.name;
    }
}