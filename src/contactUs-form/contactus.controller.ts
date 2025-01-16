import { Controller,Post,Body } from "@nestjs/common";
import { ContactUsFormService } from "./contactus.service";



@Controller('contactus')
export class ContactUsFormController {
    constructor(private readonly contactUsFormService : ContactUsFormService){}

    @Post('add')
    async addForm(@Body() formdata : Record<string,any>){
        try{
            let {name,email,phone,message} = formdata
            if(!name || name.length === 0){
                return {
                     status : false,
                     message : "Name is required"
                }
            }

            if(!email || email.length===0){
                return {
                    status : false,
                    message : "Email is required"
               }
            }

            if(!phone || phone.length===0){
                return {
                    status : false,
                    message : "Phone Number is required"
               }
            }

            let form_data = {
                name : name,
                email : email,
                phone : phone,
                message : message
            }

            let add_form = await this.contactUsFormService.addContactUsForm(form_data);
            return add_form;

        }
        catch(error){
            return {
                status: false,
                message: error.message || 'An unexpected error occurred'
            };
        }

    }
}