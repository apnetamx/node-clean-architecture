import {ConnectOptions,Connection} from 'mongoose';
export type MongooseConnectionInputParams = {
    username: string;
    password: string;
    host: string,
    port: string|number,
    database: string
};

export {ConnectOptions as MongooseConnectionOptions} 
export {Connection as MongooseConnectionType};