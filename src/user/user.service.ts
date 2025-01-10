import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LoggedUser } from './user.schema';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
    private readonly usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

    constructor(
        @InjectModel('LoggedUser') private readonly loggedUserModel: Model<LoggedUser> // Use Model<User> instead of Model<UserModule>
    ) {}

    private readonly saltRounds = 10;
    
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

            const hashedPassword = await bcrypt.hash(userData.password, this.saltRounds);
            userData.password = hashedPassword;
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

    async findByEmail(email:string):Promise<any>{
        return await this.loggedUserModel.findOne({email})
    }

    async findByUsername(userName:string):Promise<LoggedUser | null>{
        return this.loggedUserModel.findOne({userName}).exec();
    }

    async findById(id:string):Promise<any>{
        return await this.loggedUserModel.findById(id)
    }
}
