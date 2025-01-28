import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Tasks } from './tasks/tasks.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

// console.log('Environment Stage:', process.env.STAGE); 

@Module({
  imports:[
    ConfigModule.forRoot({
      envFilePath : [`.env.stage.${process.env.STAGE}`],
      validationSchema : configValidationSchema, // This will throw error if any variable present in validationschema is missing in env file. Comment any variable from env to check error
      // isGlobal: true,
    }),
    TaskModule,
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : async (configService : ConfigService) => {
        console.log('DB_HOST:', configService.get('DB_HOST'));
        console.log('DB_PORT:', configService.get('DB_PORT'));
        console.log('DB_USERNAME:', configService.get('DB_USERNAME'));
        console.log('DB_PASSWORD:', configService.get('DB_PASSWORD'));
        console.log('DB_DATABASE:', configService.get('DB_DATABASE'));
        return{
            type : 'postgres',
            autoLoadEntities : true,
            synchronize : true,
            host : configService.get('DB_HOST'),
            port : configService.get('DB_PORT'),
            username : configService.get('DB_USERNAME'),
            password : configService.get('DB_PASSWORD'),
            database : configService.get('DB_DATABASE'),
        }
      }
    }),
    AuthModule
  ],
})
export class AppModule {}
