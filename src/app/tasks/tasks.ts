import { Component, Input } from '@angular/core';
import { Task } from './task/task';
import { NewTaskData, Task as TaskType } from '../../types/Task';
import { DUMMY_TASKS } from '../../utils/dummy-tasks';
import { NewTask } from './new-task/new-task';

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

  tasks: TaskType[] = this.loadTasks();

  get userTasks(): TaskType[] {
    return this.tasks.filter((task) => task.userId === this.userId);
  }

  removeTask(id: string | number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
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
      const newTask = this.buildTaskFromData(data);
      this.tasks = [newTask, ...this.tasks];

      this.isAddDialogOpen = false;
    } finally {
      this.isSavingTask = false;
      this.saveTasks(this.tasks);
    }
  }

  private buildTaskFromData(data: NewTaskData): TaskType {
    return {
      id: new Date().getTime().toString(),
      userId: this.userId,
      title: data.title,
      summary: data.summary,
      dueDate: data.dueDate,
    } as TaskType;
  }

  private saveTasks(tasks: TaskType[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  private loadTasks() {
    return JSON.parse(localStorage.getItem('tasks') ?? JSON.stringify(DUMMY_TASKS)) || [];
  }
}
