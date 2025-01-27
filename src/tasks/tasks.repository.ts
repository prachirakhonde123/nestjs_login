// import {  EntityRepository, Repository } from "typeorm";
// import { Tasks } from "./tasks.entity";
// import { CreateTaskDto } from "./dto/create-tasks.dto";
// import { TaskStatus } from "./tasks-status.enum";
// import { TaskFilterDto } from "./dto/get-tasks-filterDto";

// export class TasksRepository extends Repository<Tasks> {
//     async createTask(createTaskDto : CreateTaskDto): Promise<Tasks>{
//         const {title,description} = createTaskDto;

//         const create_task = this.create({
//             title,
//             description,
//             status : TaskStatus.DONE
//         })

//         await this.save(create_task)
//         return create_task

//     }

//     async getTasks(filterDto : TaskFilterDto): Promise<Tasks[]>{
//         const {status,search} = filterDto;

//         const query = this.createQueryBuilder('tasks')

//         if(status){
//             query.andWhere('task.status = :status', {status})
//         }

//         if(search){
//            query.andWhere(
//             'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',  // LIKE means partial match , just like regex in mongo
//             { search : `%${search}%` }
//            )
//         }

//         const task = await query.getMany();
//         return task;

//     }
// }