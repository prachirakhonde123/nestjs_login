import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./tasks-status.enum";
import { User } from "../auth/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    title : string

    @Column()
    description : string

    @Column()
    status : TaskStatus;

    @ManyToOne((type)=>User, (user)=>user.tasks, {eager:false})
    @Exclude({ toPlainOnly:true })
    user : User
}

/*
When we are sending Json response , we are excluding User property
To exclude user , we need transform.interceptor.ts and need to make this interceptor 
global in main.ts file. After doing this , we will not get user in response, while creating task.
*/