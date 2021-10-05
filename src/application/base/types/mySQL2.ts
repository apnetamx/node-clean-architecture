import {Pool} from 'mySQL2/promise';
export type MySQL2ConnectionInputParams = {
    username: string,
    password: string,
    host: string,
    port: string|number,
    database: string,
};

export type MySQL2ConnectionOptions = {
    connectionLimit: number
    waitForConnections: boolean,
    queueLimit: number
};

export {Pool as MySQL2ConnectionType};