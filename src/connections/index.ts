import {MongooseConnection} from './mongoose'
import {MySQL2Connection} from './mySQL2'
import { MongooseConnectionInputParams,MongooseConnectionOptions,MongooseConnectionType } from '../application/base/types';
import { MySQL2ConnectionInputParams,MySQL2ConnectionOptions,MySQL2ConnectionType } from '../application/base/types';
import { ConnectionStatus,ConnectionType } from 'application/base/types/connection';

export class DataBaseConnections {
    public static defaultConnections : Array<Connection>=[];
    public static connectionSummary: Array<Connection|null>=[];
    public static availableConnections: Array<Connection>=[];

    public static async connectAll(connections: Array<Connection>){
        for(let i=0;i<connections.length;i++){
            var connection=await connections[i].connect();
            DataBaseConnections.connectionSummary.push(connection);
            if(connection!= null && connection.status==ConnectionStatus.Up){
                DataBaseConnections.availableConnections.push(connection);
            }
        }
    }
}

export class Connection{                
    public name:string;
    public type: ConnectionType;
    public status: ConnectionStatus;
    public instance: null|MongooseConnection|MySQL2Connection;
    public connection : null|MongooseConnectionType|MySQL2ConnectionType;

    constructor(
        name:string,type:ConnectionType,
        input: MongooseConnectionInputParams|MySQL2ConnectionInputParams,
        options: MongooseConnectionOptions|MySQL2ConnectionOptions
        ) {
        this.name=name;
        this.type=type;
        this.status=ConnectionStatus.Down;
        (this.type==ConnectionType.Mongoose) 
            ? this.instance=(new MongooseConnection(name,<MongooseConnectionInputParams>input,<MongooseConnectionOptions>options))
            : (this.type==ConnectionType.MySQL2) 
                ? this.instance=(new MySQL2Connection  (name,<MySQL2ConnectionInputParams  >input,<MySQL2ConnectionOptions  >options))
                : this.instance=null;
        this.connection=null;
    }

    //Standard Mehtods For Both Connections
    async connect(): Promise<null|MongooseConnection|MySQL2Connection>{return null};
    async disconnect(): Promise<null|MongooseConnection|MySQL2Connection>{return null};
}