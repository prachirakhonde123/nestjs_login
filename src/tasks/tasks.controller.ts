import { Controller, Get } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller('tasks')
export class TaskController {
    constructor(private tasksService : TasksService){}
    
    @Get()
    getAllTasks (){
       return this.tasksService.getAllTasks()
    }

}