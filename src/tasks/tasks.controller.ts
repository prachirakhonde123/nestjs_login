import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./tasks-status.enum";
import { CreateTaskDto } from "./dto/create-tasks.dto";
import { TaskFilterDto } from "./dto/get-tasks-filterDto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { Tasks } from "./tasks.entity";

@Controller('tasks')
export class TaskController {
    constructor(private tasksService : TasksService){}

    @Get()
    getTasks(@Query() filterDto : TaskFilterDto) : Promise<Tasks[]> {
        return this.tasksService.getAllTasks(filterDto)
       
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Promise<Tasks>{
        return this.tasksService.getTaskById(id) 
    }

    @Post()
    createTask(@Body() createTaskDto : CreateTaskDto) : Promise<Tasks>{
        return this.tasksService.createTask(createTaskDto)    
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string) : Promise<void>{
       return this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    updateTaskById(@Param('id') id : string, @Body() updateTaskStatusDto : UpdateTaskStatusDto ) : Promise<Tasks>{
        const {status} = updateTaskStatusDto
        return this.tasksService.updateTaskById(id,status)
    }
    
    // @Get()
    // getTasks(@Query() filterDto : TaskFilterDto) : Tasks[] {
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTaskByfilter(filterDto);
    //     }
    //     else{
    //         return this.tasksService.getAllTasks()
    //     }
    // }
   

    // @Get('/:id')
    // getTaskById (@Param('id') id:string) : Tasks{
    //     return this.tasksService.getTaskById(id);
    // }

    // @Post()
    // createTask(@Body() createTaskDto : CreateTaskDto) : Tasks{
    //     return this.tasksService.createTask(createTaskDto)    
    // }

    // @Post()
    // without using DTO
    // createTask(@Body('title') title:string, @Body('description') description : string) : Tasks{
    //     return this.tasksService.createTask(title,description)    
    // }

    // @Patch('/:id/status')
    // updateTaskById(@Param('id') id : string, @Body() updateTaskStatusDto : UpdateTaskStatusDto ) : Tasks{
    //     const {status} = updateTaskStatusDto
    //     return this.tasksService.updateTaskById(id,status)
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id') id:string) : void{
    //    return this.tasksService.deleteTaskById(id)
    // }

}


/*
TaskDto already contains the particular fields which define the structure of incoming data
*/