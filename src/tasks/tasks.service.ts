import { Injectable } from "@nestjs/common";
import { Tasks } from "./tasks.model";

@Injectable()
export class TasksService {
    private tasks : Tasks[] = []; 
    
    getAllTasks() : Tasks[]{
        return this.tasks;
    }
}