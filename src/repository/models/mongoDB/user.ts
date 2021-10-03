import mongoose from 'mongoose';

export interface UserMongoDB extends mongoose.Document{
    email: string;
    password: string;
    userType: string;
    firstName?: string;
    lastName?: string;
}

const UserSchema = new mongoose.Schema<UserMongoDB>({
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
        type: String
    },
    lastName: {
        type: String
    }
});

const User = mongoose.model<UserMongoDB>('User', UserSchema);

export {User};