import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TaskModule,
    TypeOrmModule.forRoot({
      type : 'postgres',
      host : 'localhost',
      port : 5432,
      username : 'postgres',
      password : 'Prachi@123',
      database : 'task-management',
      autoLoadEntities : true,
      synchronize : true
    })
  
  ],
})
export class AppModule {}
