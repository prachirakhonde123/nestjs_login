import { Module } from "@nestjs/common";
import { ContactUsFormController } from "./contactus.controller";
import { ContactUsFormService } from "./contactus.service";
import { contactUsFormModel } from "./contactus.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports : [
        MongooseModule.forFeature([{name : 'contactUsForm',schema : contactUsFormModel.schema}])
    ],
    controllers : [ContactUsFormController],
    providers : [ContactUsFormService],
    // exports : [ContactUsFormService,MongooseModule]
})
export class ContactUsFormModule{}