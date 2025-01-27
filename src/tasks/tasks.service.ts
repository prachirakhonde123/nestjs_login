import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./tasks-status.enum";
import { CreateTaskDto } from "./dto/create-tasks.dto";
import { TaskFilterDto } from "./dto/get-tasks-filterDto";
import { InjectRepository } from "@nestjs/typeorm";
import { Tasks } from "./tasks.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {
    constructor(
       @InjectRepository(Tasks) // Use @InjectRepository with the User entity instead of UserRepository
        private taskRepository: Repository<Tasks>,
    ){}

    async getTaskById(id:string): Promise<Tasks>{
        const found = await this.taskRepository.findOne({
            where: { id: id }
        });
        if(!found){
            throw new NotFoundException(`Task with ${id} not found`)
        }
        return found;

    }

    async createTask(createTaskDto : CreateTaskDto): Promise<Tasks>{
        const {title,description} = createTaskDto;

        const create_task = this.taskRepository.create({
            title,
            description,
            status : TaskStatus.DONE
        })

        await this.taskRepository.save(create_task)
        return create_task
    }

    async deleteTaskById(id:string) : Promise<void>{
       const result = await this.taskRepository.delete(id)
       
       if(result.affected === 1){
         throw new NotFoundException(`Task with ID "${id}" not found`)
       }
    }

    async updateTaskById(id:string,status:TaskStatus): Promise<Tasks>{
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }

    async getAllTasks(filterDto : TaskFilterDto) : Promise<Tasks[]> {
        const {status,search} = filterDto;

        const query = this.taskRepository.createQueryBuilder('tasks')

        if(status){
            query.andWhere('tasks.status = :status', {status})
        }

        if(search){
           query.andWhere(
            'LOWER(tasks.title) LIKE LOWER(:search) OR LOWER(tasks.description) LIKE LOWER(:search)',  // LIKE means partial match , just like regex in mongo
            { search : `%${search}%` }
           )
        }

        const task = await query.getMany();
        return task;
    }



    // private tasks : Tasks[] = []; 
    
    // getAllTasks() : Tasks[] {
    //     return this.tasks;
    // }

    // getTaskByfilter(filterDto:TaskFilterDto) : Tasks[]{
    //     const {status,search} = filterDto;

    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = tasks.filter((task)=> task.status === status)
    //     }

    //     if(search){
    //         tasks = tasks.filter((task)=>{
    //             if(task.title.includes(search) || task.description.includes(search)){
    //                 return true;
    //             }

    //             return false;
    //         })
    //     }
    //     return tasks

    // }

    // getTaskById(id : string) : Tasks{
    //     let foundTask = this.tasks.find((task)=> task.id === id ) // if function doesnot have curly braces block, you can skip the return statement
    //     if(!foundTask){
    //         throw new NotFoundException(`Task with ${id} not found`)
    //     }
        
    //     return foundTask
    // }

    // createTask(createTaskDto : CreateTaskDto) : Tasks{
    //     let {title,description} = createTaskDto
    //     let task : Tasks = {
    //         id : uuid(),
    //         title,
    //         description,
    //         status : TaskStatus.OPEN
    //     }

    //     this.tasks.push(task)
    //     return task;
    // }

    // updateTaskById(id:string,status:TaskStatus) {
    //     let getTask = this.getTaskById(id);
    //     getTask.status = status
    //     return getTask;
    // }

    // deleteTaskById(id:string) : void{
    //     let found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task)=>task.id !== found.id)
    // }

}