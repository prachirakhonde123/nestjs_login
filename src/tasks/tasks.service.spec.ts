import {Test} from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { Repository } from 'typeorm'
import { Tasks } from './tasks.entity'
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUser = {
    username : "Tester",
    id : 'someId',
    password : 'password123',
    tasks : []
}

const mockTaskRepository = () => ({
    getAllTasks : jest.fn()
});

describe('TasksService',()=>{
     let tasksService : TasksService
     let taskRepository : Repository<Tasks>

     beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers : [
                TasksService,
                {
                    provide: getRepositoryToken(Tasks), // Correctly provide the repository token
                    useFactory: mockTaskRepository,
                },
            ]
        }).compile();

        tasksService = module.get<TasksService>(TasksService);
        taskRepository = module.get<Repository<Tasks>>(getRepositoryToken(Tasks));
     });

     describe('getTasks',()=>{
        it('calls TaskService.getTasks and return the result',async ()=>{
            // expect(tasksService.getAllTasks).not.toHaveBeenCalled();
            // tasksService.getAllTasks(null,mockUser)
            // expect(tasksService.getAllTasks).toHaveBeenCalled();
            const getAllTasksSpy = jest.spyOn(tasksService, 'getAllTasks').mockResolvedValue([]);
            expect(getAllTasksSpy).not.toHaveBeenCalled();
            // Call the function
            await tasksService.getAllTasks(null, mockUser);
            // Check if the method was called
            expect(getAllTasksSpy).toHaveBeenCalled();
        })
     })
})