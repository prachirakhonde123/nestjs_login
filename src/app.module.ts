import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Tasks } from './tasks/tasks.entity';

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
      entities: [Tasks],
      autoLoadEntities : true,
      synchronize : true
    }),
    AuthModule
  ],
})
export class AppModule {}
