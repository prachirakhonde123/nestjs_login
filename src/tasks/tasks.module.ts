import { Module } from "@nestjs/common";
import { TaskController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { TasksRepository } from "./tasks.repository";
import { Tasks } from "./tasks.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports : [TypeOrmModule.forFeature([Tasks]), AuthModule],
    controllers : [TaskController],
    providers : [TasksService]
})

export class TaskModule{}