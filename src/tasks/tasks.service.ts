import { Injectable, NotFoundException } from "@nestjs/common";
import { Tasks, TaskStatus } from "./tasks.model";
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from "./dto/create-tasks.dto";
import { TaskFilterDto } from "./dto/get-tasks-filterDto";

@Injectable()
export class TasksService {
    private tasks : Tasks[] = []; 
    
    getAllTasks() : Tasks[] {
        return this.tasks;
    }

    getTaskByfilter(filterDto:TaskFilterDto) : Tasks[]{
        const {status,search} = filterDto;

        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter((task)=> task.status === status)
        }

        if(search){
            tasks = tasks.filter((task)=>{
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }

                return false;
            })
        }
        return tasks

    }

    getTaskById(id : string) : Tasks{
        let foundTask = this.tasks.find((task)=> task.id === id ) // if function doesnot have curly braces block, you can skip the return statement
        if(!foundTask){
            throw new NotFoundException(`Task with ${id} not found`)
        }
        
        return foundTask
    }

    createTask(createTaskDto : CreateTaskDto) : Tasks{
        let {title,description} = createTaskDto
        let task : Tasks = {
            id : uuid(),
            title,
            description,
            status : TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task;
    }

    updateTaskById(id:string,status:TaskStatus) {
        let getTask = this.getTaskById(id);
        getTask.status = status
        return getTask;
    }

    deleteTaskById(id:string) : void{
        let found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task)=>task.id !== found.id)
    }

}