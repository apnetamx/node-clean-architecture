import {MongooseConnection} from './mongoose'
import {MySQL2Connection} from './mySQL2'
import { MongooseConnectionInputParams,MongooseConnectionOptions } from '../application/base/types';
import { MySQL2ConnectionInputParams,MySQL2ConnectionOptions } from '../application/base/types';

export type GenerateConnection= {
    input: MongooseConnectionInputParams|MySQL2ConnectionInputParams;
    options: MongooseConnectionOptions|MySQL2ConnectionOptions;
};

export type AppConnection= {
    connection: MongooseConnection|MySQL2Connection;
    status: string;
};


export default class DataBaseConnections {
    public mongooseConnection: MongooseConnection;
    public mySQL2Connection: MySQL2Connection;
    public connectionSummary: Array<AppConnection>;

    constructor(mongoose: GenerateConnection,mySQL2: GenerateConnection) {
        this.mongooseConnection=new MongooseConnection('Mongoose',<MongooseConnectionInputParams>mongoose.input,<MongooseConnectionOptions>mongoose.options);
        this.mySQL2Connection=new MySQL2Connection('MySQL2',<MySQL2ConnectionInputParams>mySQL2.input,<MySQL2ConnectionOptions>mySQL2.options);
        this.connectionSummary=[];
    }

    public async connectDataBases():Promise<Array<AppConnection>>{
        this.connectionSummary=[];
        (await this.mongooseConnection.connectMongoose()) ? this.connectionSummary.push({connection: this.mongooseConnection,status: 'Up'}) : this.connectionSummary.push({connection: this.mongooseConnection,status: 'Error'});

        (await this.mySQL2Connection.connectMySQL2()) ? this.connectionSummary.push({connection: this.mySQL2Connection,status: 'Up'}) : this.connectionSummary.push({connection: this.mySQL2Connection,status: 'Error'});

        return this.connectionSummary;
    }
}

