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
  // UI state
  isAddDialogOpen = false;
  isSavingTask = false;

  // tasks store (in-memory for this demo)
  tasks: TaskType[] = DUMMY_TASKS;

  // Derived data
  get userTasks(): TaskType[] {
    return this.tasks.filter((task) => task.userId === this.userId);
  }

  // Handlers
  removeTask(id: string | number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  openAddDialog() {
    if (this.isAddDialogOpen || this.isSavingTask) return;
    this.isAddDialogOpen = true;
  }

  closeAddDialog() {
    if (this.isSavingTask) return; // prevent closing while saving
    this.isAddDialogOpen = false;
  }

  async createTask(data: NewTaskData) {
    if (this.isSavingTask) return;
    this.isSavingTask = true;

    try {
      const newTask = this.buildTaskFromData(data);

      // simulate network / persistence latency
      await this.simulateSave();

      // Use immutable update for clarity
      this.tasks = [...this.tasks, newTask];

      // close dialog on success
      this.isAddDialogOpen = false;
    } finally {
      this.isSavingTask = false;
    }
  }

  // Helpers
  private buildTaskFromData(data: NewTaskData): TaskType {
    return {
      id: new Date().getTime().toString(),
      userId: this.userId,
      title: data.title,
      summary: data.summary,
      dueDate: data.dueDate,
    } as TaskType;
  }

  private simulateSave(): Promise<void> {
    // small artificial delay to show loading state
    return new Promise((resolve) => setTimeout(resolve, 600));
  }
}
