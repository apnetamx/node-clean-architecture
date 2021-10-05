import { Connection } from './index';
import mongoose  from 'mongoose';
import { MongooseConnectionInputParams,MongooseConnectionOptions,MongooseConnectionType,ConnectionStatus,ConnectionType} from '../application/base/types';

export class MongooseConnection extends Connection{
    public input: MongooseConnectionInputParams;
    public options: MongooseConnectionOptions; 

    public uri:string;
    public static defaultConnection: MongooseConnectionType|null=null;

    constructor(name:string,input: MongooseConnectionInputParams,options: MongooseConnectionOptions) {
        super(name,ConnectionType.Mongoose,input,options);
        this.input=input;
        this.options=options;
        this.uri=this.generateMongooseURI();
    }

    private generateMongooseURI():string {
        var auth;
        (this.input.username) ? (this.input.password) ? auth=this.input.username+':'+this.input.password + '@' : auth='' : auth='';
        return 'mongodb://'+auth+this.input.host+':'+this.input.port+'/'+this.input.database;
    }


    //Metodos se ejecutan a nivel objeto pero en verdad Mongoose se ejecuta a nivel static. Conexiones individuales
    //Se debe desconectar antes de volver a conectar
    public async connect() : Promise<null|MongooseConnection> {
        try{
            super.connection=(await mongoose.connect(this.uri,this.options)).connection;
            super.status=ConnectionStatus.Up;
            return this;
        }catch(error){
            super.connection=null;
            super.status=ConnectionStatus.Error;
            return null;
        } 
    }

    public async disconnect() : Promise<null|MongooseConnection> {
        try{
            await mongoose.connection.close();
            super.connection=null;
            super.status=ConnectionStatus.Down;
            return this;
        }catch(error){
            super.status=ConnectionStatus.Error;
            return null;
        } 
    }
}