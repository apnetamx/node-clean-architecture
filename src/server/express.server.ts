import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import * as pkg from '../../package.json';

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
        this.server.set('pkg',pkg);
        this.server.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
              'Access-Control-Allow-Headers',
              'Origin, X-Requested-With, Content-Type, Accept'
            );
            next();
          });
          this.server.use(morgan('dev'));
          this.server.use(express.json());
          this.server.use(express.urlencoded({extended:false}));
          this.server.use(helmet());
          this.server.use(compression());
          this.server.use(cors());
    }
}