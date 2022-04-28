import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { FindTaskInput } from './dto/find-task.input';
import { Task } from './models/task.model';
import { TaskService } from './tasks.service';

@Resolver()
export class TasksResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  tasks() {
    return this.taskService.findAll();
  }
  @Query(() => Task, { name: 'task' })
  task(@Args('taskInput') { id }: FindTaskInput) {
    return this.taskService.findOne(id);
  }
}
