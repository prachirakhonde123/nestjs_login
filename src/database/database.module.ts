import { Module, OnModuleInit} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { InjectConnection } from "@nestjs/mongoose";
import { ConfigService, ConfigModule } from "@nestjs/config";

@Module({
    imports: [
      ConfigModule, // env se variable access karne ke liye import kiya module
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('MONGO_URI'), // Get value from .env
        }),
        inject: [ConfigService],
      }),
    ],
})
export class DatabaseModule implements OnModuleInit{
    constructor(
        @InjectConnection() private readonly connection: Connection, // Use @InjectConnection here
    ) {}
    
    async onModuleInit() {
        try {
            // console.log('DatabaseModule onModuleInit called'); // Debug entry
            // console.log('Connection ready state:', this.connection.readyState);

            if (this.connection.readyState === 1) {
              console.log('MongoDB is connected.');
            }

            this.connection.on('connected', () => {
              console.log('MongoDB connected successfully');
            });
      
            this.connection.on('error', (err) => {
              console.error('Error connecting to MongoDB:', err);
            });
      
            this.connection.on('disconnected', () => {
              console.log('MongoDB disconnected');
            });

          } catch (err) {
            console.log('Error during MongoDB connection lifecycle:', err);
        }
    }
}

/*
The onModuleInit lifecycle hook is called when the module is initialized,
 so it’s a good place to check the connection.
*/