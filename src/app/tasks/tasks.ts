import { Component, Input } from '@angular/core';
import { Task } from './task/task';
import { Task as TaskType } from '../../types/Task';
import { DUMMY_TASKS } from '../../utils/dummy-tasks';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [Task],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.less'],
})
export class Tasks {
  @Input() userId!: string | number;
  @Input() name!: string;
  tasks: TaskType[] = DUMMY_TASKS;

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId);
  }
}
