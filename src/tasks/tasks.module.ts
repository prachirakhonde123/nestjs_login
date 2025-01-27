import { Module } from "@nestjs/common";
import { TaskController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { TasksRepository } from "./tasks.repository";
import { Tasks } from "./tasks.entity";

@Module({
    imports : [TypeOrmModule.forFeature([Tasks])],
    controllers : [TaskController],
    providers : [TasksService]
})

export class TaskModule{}