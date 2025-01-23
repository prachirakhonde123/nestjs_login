import { Injectable } from "@nestjs/common";
import { Tasks } from "./tasks.model";

@Injectable()
export class TasksService {
    private tasks : Tasks[] = []; 
    
    getAllTasks (){
        return this.tasks;
    }
}