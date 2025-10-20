import { Injectable } from '@angular/core';
import { DUMMY_TASKS } from '../../utils/dummy-tasks';
import { NewTaskData, Task as TaskType } from '../../types/Task';

@Injectable({ providedIn: 'root' })
export class TasksService {
  tasks: TaskType[] = this.getTasks();

  getTasks() {
    return JSON.parse(localStorage.getItem('tasks') ?? JSON.stringify(DUMMY_TASKS)) || [];
  }

  getUserTasks(userId: string | number): TaskType[] {
    return this.tasks.filter((task) => task.userId === userId);
  }

  removeTask(taskId: string | number) {
    this.tasks = this.tasks.filter((task) => String(task.id) !== String(taskId));
    this.saveTasks();
    return this.tasks;
  }

  storeTask(userId: string | number, data: NewTaskData) {
    const newTask = this.buildTaskFromData(userId, data);
    return (this.tasks = [newTask, ...this.tasks]);
  }

  private buildTaskFromData(userId: string | number, data: NewTaskData): TaskType {
    return {
      id: new Date().getTime().toString(),
      userId: userId,
      title: data.title,
      summary: data.summary,
      dueDate: data.dueDate,
    } as TaskType;
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
