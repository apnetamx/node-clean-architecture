import { ExpressServer} from './server/express.server';
import mongoose from 'mongoose';
import { MongooseConnection,MongooseConnectionStatus} from 'connections/mongoose';

export type AppConnections= {
  connections: Array<MongooseConnection>;
  errors: Array<MongooseConnection>;
};

export type AppStatus= {
  status: string;
  running: boolean;
};

export default class App {
    private express_Server: ExpressServer;
    private port: string|number;
    private mongo_db: MongooseConnectionStatus;
    private mongo_db2: MongooseConnectionStatus;

    constructor(port: number) {
      this.express_Server=new ExpressServer();
      this.port=port;
      this.mongo_db={
        status: false,
        mongoose: null
      };
      this.mongo_db2={
        status: false,
        mongoose: null
      };
    }

    public async connectDataBases(mongoConnection: MongooseConnection,mongoConnection2: MongooseConnection):Promise<AppConnections>{
      let connections: Array<MongooseConnection>;
      let connectionErrors: Array<MongooseConnection>;
      connections=[];
      connectionErrors=[];

      this.mongo_db=await mongoConnection.connectMongoDB();
      (this.mongo_db.status) ? connections.push(mongoConnection) : connectionErrors.push(mongoConnection);
      mongoose.connection.close();

      this.mongo_db2=await mongoConnection2.connectMongoDB();
      (this.mongo_db2.status) ? connections.push(mongoConnection2) : connectionErrors.push(mongoConnection2);
      return {
        connections: connections,
        errors: connectionErrors
      };
    }

    public start():string{
      try{
        this.express_Server.listen(this.port);
        return "Server Listening On Port "+this.port;
      }catch(error){
        return  "Could Not Start Server on port "+this.port;
      }
    }

}