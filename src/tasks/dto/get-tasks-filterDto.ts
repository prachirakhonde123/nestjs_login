import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../tasks-status.enum";

export class TaskFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status : TaskStatus;

    @IsOptional()
    @IsString()
    search : string
}