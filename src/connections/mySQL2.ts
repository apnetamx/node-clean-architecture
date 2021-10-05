import mySQL2 from 'mySQL2/promise';
import fs from 'fs/promises';
import { MySQL2ConnectionType, MySQL2ConnectionInputParams,MySQL2ConnectionOptions } from '../application/base/types';
import { decodeBase64 } from 'bcryptjs';

export class MySQL2Connection {
    public name: string;
    public params: MySQL2ConnectionInputParams;
    public options: MySQL2ConnectionOptions;
    public connection: MySQL2ConnectionType|null;
    
    constructor(name: string,params: MySQL2ConnectionInputParams,options:MySQL2ConnectionOptions) {
      this.name=name;
      this.params=params;
      this.options=options;
      this.connection=null;
    }

    public async connectMySQL2() : Promise<boolean> {
        var port_parsed: number;
        var results, fields;
        (!this.params.port) ? port_parsed=3306 : port_parsed=+this.params.port;
        this.params.port;
        try{
            this.connection = await mySQL2.createPool({
                    host: this.params.host,
                    port: port_parsed,
                    user: this.params.username,
                    password: this.params.password,
                    database: this.params.database,
                    connectionLimit: this.options.connectionLimit,
                    waitForConnections: this.options.waitForConnections,
                    queueLimit: this.options.queueLimit,
                    multipleStatements: true
                });
            [results, fields] = await this.executeQuery('SELECT table_name FROM information_schema.tables WHERE table_schema = ?',[this.params.database]);
            return true;
        }catch(error: any){
            try{
                this.connection = await mySQL2.createPool({
                    host: this.params.host,
                    port: port_parsed,
                    user: this.params.username,
                    password: this.params.password,
                    connectionLimit: this.options.connectionLimit,
                    waitForConnections: this.options.waitForConnections,
                    queueLimit: this.options.queueLimit
                });
                [results, fields] = await this.executeQuery('CREATE DATABASE IF NOT EXISTS ??',[this.params.database]);
                this.connection = await mySQL2.createPool({
                    host: this.params.host,
                    port: port_parsed,
                    user: this.params.username,
                    password: this.params.password,
                    database: this.params.database,
                    connectionLimit: this.options.connectionLimit,
                    waitForConnections: this.options.waitForConnections,
                    queueLimit: this.options.queueLimit
                });
                const initialDataBase=await this.serializeQueries(await this.readSetSQLFile('src/data/db/mySQL/initialDataBase.sql'));
                [results, fields] = await this.executeQuery('SELECT table_name FROM information_schema.tables WHERE table_schema = ?',[this.params.database]);
                return  true;
            }catch(error2: any){
                console.log(error);
                console.log(error2);
                return  false;
            }
        }
    }

    public async executeQuery(query: string,params?: Array<string>):Promise<any>{
        return (this.connection) ? await this.connection.execute(mySQL2.format(query,params)) : null;
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

    public async disconnectMySQL2() : Promise<boolean> {
        this.connection=mySQL2.createPool({});
        return true;
    }

    public toString = () : string => {
        return this.name;
    }
}