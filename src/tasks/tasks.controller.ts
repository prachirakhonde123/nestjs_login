import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards, Logger } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./tasks-status.enum";
import { CreateTaskDto } from "./dto/create-tasks.dto";
import { TaskFilterDto } from "./dto/get-tasks-filterDto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { Tasks } from "./tasks.entity";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/auth/user.entity";
import { GetUser } from "src/auth/get-user.decorator";
// import { ConfigService } from "@nestjs/config";

@Controller('tasks')
@UseGuards(AuthGuard())  // making all routes protected
// Here we need token while createing,updating,deleteing and gettiing the tasks. 
// If there is no token, then we will get error , Unauthorised with 401 status code


export class TaskController {
    private logger = new Logger()
    constructor(
        private tasksService : TasksService,
        // private configService : ConfigService
    ){
        // console.log(configService.get('TEST_VALUE'))
    }
    
    // To get the task created by that user, we need to call @getUser decorator as it contain user info
    @Get()
    getTasks(@Query() filterDto : TaskFilterDto, @GetUser() user : User ) : Promise<Tasks[]> {
        this.logger.verbose(`User ${user.username} is retriving all tasks. Filter is ${JSON.stringify(filterDto)}`)
        return this.tasksService.getAllTasks(filterDto, user)
       
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Promise<Tasks>{
        return this.tasksService.getTaskById(id) 
    }

    @Post()
    createTask(
        @Body() createTaskDto : CreateTaskDto,
        @GetUser() user : User // in getUser Decorater we are getting user info
    ) : Promise<Tasks>{
        return this.tasksService.createTask(createTaskDto,user)    
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string,@GetUser() user : User) : Promise<void>{
       return this.tasksService.deleteTaskById(id,user)
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