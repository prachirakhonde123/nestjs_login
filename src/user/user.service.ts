import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LoggedUser } from './user.schema';

@Injectable()
export class UserService {
    private readonly usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

    constructor(
        @InjectModel('LoggedUser') private readonly loggedUserModel: Model<LoggedUser> // Use Model<User> instead of Model<UserModule>
    ) {}
    
    async registerUser(userData: Record<string, any>): Promise<{ status: boolean; message?: string; data?: Record<string, any>; error?: string }> {
        try {
            let userId = uuidv4();
            userData._id = userId

            let findDuplicateUser = await this.loggedUserModel.findOne({userName : userData.userName})
            if(findDuplicateUser){
                return{
                    status : false,
                    message : "Username is already used."
                }
            }
            const newUser = await this.loggedUserModel.create(userData);
            console.log('newUser is......',newUser)

            return {
                status: true,
                message: 'User Registered successfully',
                data: newUser // Return the newly created user
            };
        } catch (err) {
            return {
                status: false,
                message: 'Error occurred while adding user',
                error: err.message || 'An unknown error occurred'
            };
        }
    };

    async getUser(userName:string):Promise<any>{
        try{
           console.log('userName is..',userName)
           const findUser = await this.loggedUserModel.findOne({userName : userName});
        //    console.log('step 1 : //////getUser is...',findUser)
           return findUser
        }
        catch(error){
           return {
             status : false,
             message : error.message
           }
        }
    }
}
