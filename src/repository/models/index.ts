
import {User as User_mongoDB} from './mongoDB'
const mongoDB = {
    User: User_mongoDB
}
export {UserMongoDB} from './mongoDB'



import {User as User_otherDB} from './otherDB'
const otherDB = {
    User: User_otherDB
}
export {UserOtherDB} from './otherDB'




export default {mongoDB,otherDB};
