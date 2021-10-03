import mongoose from 'mongoose';


export interface UserOtherDB {
    email: string;
    password: string;
    userType: string;
    firstName?: string;
    lastName?: string;
}

const UserSchema = new mongoose.Schema<UserOtherDB>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

const User = mongoose.model<UserOtherDB>('User', UserSchema);

export {User};