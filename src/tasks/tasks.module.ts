import { Module } from "@nestjs/common";
import { TaskController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
    imports : [],
    controllers : [TaskController],
    providers : [TasksService]
})

export class TaskModule{}