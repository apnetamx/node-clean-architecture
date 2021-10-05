import App from './app';
import Connections, { AppConnection } from './connections'


const setMongoose = {
    input: {
        username: process.env.DATABASE_MONGODB_USER || '',
        password: process.env.DATABASE_MONGODB_PASSWORD || '',
        host: process.env.DATABASE_MONGODB_HOST|| 'localhost',
        port: process.env.DATABASE_MONGODB_PORT || 27017,
        database: process.env.DATABASE_MONGODB_NAME || 'r2_security'
    },
    options: {
        serverSelectionTimeoutMS: 5000
    }
};
const setMySQL2 = {
    input: {
        username: process.env.DATABASE_MYSQL_USER || 'root',
        password: process.env.DATABASE_MYSQL_PASSWORD || 'Andresposada015!',
        host: process.env.DATABASE_MYSQL_HOST|| 'localhost',
        port: process.env.DATABASE_MYSQL_PORT || 3306,
        database: process.env.DATABASE_MYSQL_NAME || 'r2_security'
    },
    options: {
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0
    }
};

export const connections=new Connections(setMongoose,setMySQL2);

async function appStart():Promise<string> {
    const app= new App(3000);
    const appConections= await connections.connectDataBases();
    var successes=0;
    var errors:Array<AppConnection> = [];
    appConections.forEach(c=> (c.status=='Up') ? successes++ : errors.push(c));

    return (appConections.length>0 && successes==(appConections.length-1)) ?  app.start() : ("Error in connections:\n\n"+errors);
}
console.log("Starting App\n\n");
appStart().then(val => console.log(val));
