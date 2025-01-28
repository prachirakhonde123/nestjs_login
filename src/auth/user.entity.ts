import { Tasks } from "src/tasks/tasks.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({unique : true})
    username : string

    @Column()
    password : string

    @OneToMany((type)=>Tasks,(task)=>task.user,{eager:true})
    tasks : Tasks[]
}

/*
OneToMany means, one user has multiple task
When you create relation between 2 , onw of them will be eager:true
eager:true means, when we will fetch the user, we are also going to fetch the tasks automatically

Just like populate in mongodb
*/