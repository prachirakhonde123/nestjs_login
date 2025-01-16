import * as mongoose from 'mongoose'

export interface contactUsForm extends mongoose.Document {
    _id : String
    name : String,
    email : String,
    phone : String,
    message : String,
    created_at : Date,
    updated_at : Date
}

const contactUsFormSchema = new mongoose.Schema({
    _id : String,
    name : {type : String},
    email : {type : String},
    phone : {type : String},
    message : String,
    created_at : {type : Date, default : Date.now},
    updated_at : {type : Date,default : Date.now }
})

export const contactUsFormModel = mongoose.model<contactUsForm>('contactus-form',contactUsFormSchema)