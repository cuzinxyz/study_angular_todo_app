import { Component, inject, Input } from '@angular/core';
import { Task } from './task/task';
import { NewTaskData, Task as TaskType } from '../../types/Task';
import { NewTask } from './new-task/new-task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [Task, NewTask],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.less'],
})
export class Tasks {
  @Input() userId!: string | number;
  @Input() name!: string;

  isAddDialogOpen = false;
  isSavingTask = false;

  private tasksService = inject(TasksService);

  get allTasks() {
    return this.tasksService.getTasks();
  }

  get userTasks(): TaskType[] {
    return this.tasksService.getUserTasks(this.userId);
  }

  removeTask(id: string | number) {
    this.tasksService.removeTask(id);
  }

  openAddDialog() {
    if (this.isAddDialogOpen || this.isSavingTask) return;
    this.isAddDialogOpen = true;
  }

  closeAddDialog() {
    if (this.isSavingTask) return;
    this.isAddDialogOpen = false;
  }

  async createTask(data: NewTaskData) {
    if (this.isSavingTask) return;
    this.isSavingTask = true;

    try {
      this.tasksService.storeTask(this.userId, data);
      this.isAddDialogOpen = false;
    } finally {
      this.isSavingTask = false;
      this.tasksService.saveTasks();
    }
  }
}
