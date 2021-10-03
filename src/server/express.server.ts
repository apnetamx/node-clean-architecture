import * as bodyParser from 'body-parser';
import express from 'express';
import { Express } from 'express';
import { Routes } from './routes';

export class ExpressServer {
    public server: Express;

    constructor() {
      this.server=express();
      this.setupStandardMiddleware();
      new Routes(this.server);
    }

    public listen(port: string|number){
      return this.server.listen(port)
    }

    private setupStandardMiddleware() {
        this.server.use(bodyParser.json());
        this.server.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
              'Access-Control-Allow-Headers',
              'Origin, X-Requested-With, Content-Type, Accept'
            );
            next();
          });
    }

}