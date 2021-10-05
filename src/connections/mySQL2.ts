import mySQL2 from 'mySQL2/promise';
import fs from 'fs/promises';
import { MySQL2ConnectionType, MySQL2ConnectionInputParams,MySQL2ConnectionOptions } from '../application/base/types';
import { decodeBase64 } from 'bcryptjs';
import { IConnection,ConnectionStatus,ConnectionType } from 'application/base/types';
import { Connection } from 'connections';


export class MySQL2Connection extends Connection {
    public input: MySQL2ConnectionInputParams;
    public options: MySQL2ConnectionOptions; 

    public static defaultConnection: MySQL2ConnectionType|null=null;

    constructor(name:string,input: MySQL2ConnectionInputParams,options: MySQL2ConnectionOptions) {
        super(name,ConnectionType.MySQL2,input,options);
        this.input=input;
        this.options=options;
    }
    
    public async connect() : Promise<null|MySQL2Connection> {
        var port_parsed: number;
        var results, fields;
        (!this.input.port) ? port_parsed=3306 : port_parsed=+this.input.port;
        this.input.port;
        try{
            this.connection = await mySQL2.createPool({
                    host: this.input.host,
                    port: port_parsed,
                    user: this.input.username,
                    password: this.input.password,
                    database: this.input.database,
                    connectionLimit: this.options.connectionLimit,
                    waitForConnections: this.options.waitForConnections,
                    queueLimit: this.options.queueLimit,
                    multipleStatements: true
                });
            [results, fields] = await this.executeQuery('SELECT table_name FROM information_schema.tables WHERE table_schema = ?',[this.input.database]);
            MySQL2Connection.defaultConnection=this.connection;
            super.status=ConnectionStatus.Up;
            return this;
        }catch(error: any){
            try{
                this.connection = await mySQL2.createPool({
                    host: this.input.host,
                    port: port_parsed,
                    user: this.input.username,
                    password: this.input.password,
                    connectionLimit: this.options.connectionLimit,
                    waitForConnections: this.options.waitForConnections,
                    queueLimit: this.options.queueLimit
                });
                [results, fields] = await this.executeQuery('CREATE DATABASE IF NOT EXISTS ??',[this.input.database]);
                this.connection = await mySQL2.createPool({
                    host: this.input.host,
                    port: port_parsed,
                    user: this.input.username,
                    password: this.input.password,
                    database: this.input.database,
                    connectionLimit: this.options.connectionLimit,
                    waitForConnections: this.options.waitForConnections,
                    queueLimit: this.options.queueLimit
                });
                const initialDataBase=await this.serializeQueries(await this.readSetSQLFile('src/data/db/mySQL/initialDataBase.sql'));
                [results, fields] = await this.executeQuery('SELECT table_name FROM information_schema.tables WHERE table_schema = ?',[this.input.database]);
                MySQL2Connection.defaultConnection=this.connection;
                super.status=ConnectionStatus.Up;
                return  this;
            }catch(error2: any){
                //console.log(error);
                //console.log(error2);
                super.status=ConnectionStatus.Error;
                return  null;
            }
        }
    }

    public async disconnect() : Promise<null|MySQL2Connection> {
        try{
            await (<MySQL2ConnectionType>super.connection).end();
            super.connection=null;
            super.status=ConnectionStatus.Down;
            return this;
        }catch(error){
            super.status=ConnectionStatus.Error;
            return null;
        }
    }

    public async executeQuery(query: string,input?: Array<string>):Promise<any>{
        return (super.connection) ? await (<MySQL2ConnectionType>super.connection).execute(mySQL2.format(query,input)) : null;
    }

    public async serializeQueries(dataArr:Array<string>):Promise<Array<any>>{
        var queries: Array<any> = [];
        if(this.connection){
            for(let i=0;i<dataArr.length;i++){
                try{
                    if (dataArr[i]) queries.push({Success: await this.executeQuery(dataArr[i])});
                }catch(error){
                    queries.push({Error: (<any>error).sqlMessage});
                }
            }
            return queries;
        }else{
            return queries;
        }
    }

    public async readSetSQLFile(uri:string):Promise<Array<string>>{
        const dataArr = ((await fs.readFile(uri)).toString()).toString().replace(/(\r\n|\n|\r|\t)/gm, "").replace(/\s+/g, ' ').trim().split(';');
        return dataArr;
    }
}