import { Controller,Post,Body } from "@nestjs/common";
import { ContactUsFormService } from "./contactus.service";



@Controller('contactus')
export class ContactUsFormController {
    constructor(private readonly contactUsFormService : ContactUsFormService){}

    @Post('add')
    async addForm(@Body() formdata : Record<string,any>){
        try{
            let {name,email,phone,message} = formdata
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