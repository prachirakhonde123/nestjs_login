import * as mongoose from 'mongoose';

export interface LoggedUser extends mongoose.Document {
    _id : String,
    firstName : String,
    lastName : String,
    userName: string;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

const LoggedUserSchema = new mongoose.Schema({
    _id: { type: String },
    firstName : {type : String},
    lastName : {type : String},
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


export const LoggedUserModel = mongoose.model<LoggedUser>('LoggedUser', LoggedUserSchema);
