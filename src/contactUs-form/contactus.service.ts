import { Injectable } from "@nestjs/common";
import { contactUsForm } from "./contactus.schema";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose'
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class ContactUsFormService {
    constructor(
        @InjectModel('contactUsForm') private readonly contactUsFormModel : Model<contactUsForm>
    ){}

    async addContactUsForm(formData : Record<string,any>): Promise<{status : boolean; message? : string, error? : string}>{
       try{
          let formId = uuidv4();
          formData['_id'] = formId
          await this.contactUsFormModel.create(formData);

          return {
            status : true,
            message : "Form Added Successfully"
          }

       }
       catch(error){
        return {
            status: false,
            message: 'Error occurred while adding user',
            error: error.message || 'An unknown error occurred'
        };
       }
    }
}