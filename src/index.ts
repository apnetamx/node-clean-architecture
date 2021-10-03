import App from './app';
import { MongooseConnection } from './connections';
const mongo_Input={
    username: process.env.DATABASE_MONGODB_USER || '',
    password: process.env.DATABASE_MONGODB_PASSWORD || '',
    host: process.env.DATABASE_MONGODB_HOST|| 'localhost',
    port: process.env.DATABASE_MONGODB_PORT || 27017,
    database: process.env.DATABASE_MONGODB_NAME || 'r2_security'
}
const mongo_Options={
    serverSelectionTimeoutMS: 5000
}
const mongo_Input2={
    username: process.env.DATABASE_MONGODB_USER || '',
    password: process.env.DATABASE_MONGODB_PASSWORD || '',
    host: process.env.DATABASE_MONGODB_HOST|| 'localhost',
    port: process.env.DATABASE_MONGODB_PORT || 27017,
    database: process.env.DATABASE_MONGODB_NAME || 'r2_security'
}
const mongo_Options2={
    serverSelectionTimeoutMS: 5000
}
const mongooseConnection = new MongooseConnection('MyCustom1',mongo_Input,mongo_Options);
const mongooseConnection2 = new MongooseConnection('MyCustom2',mongo_Input2,mongo_Options2);
async function appStart():Promise<string> {
    const app= new App(3000);
    const appConections= await app.connectDataBases(mongooseConnection,mongooseConnection2);
    return (appConections.connections.length>0 && appConections.errors.length==0) ?  app.start() : "Error in connections from data bases:\n\n"+appConections.errors;
}
console.log("Starting App\n\n");
appStart().then(val => console.log(val));
