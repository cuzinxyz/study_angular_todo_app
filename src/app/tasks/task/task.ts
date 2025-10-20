import { Component, Input } from '@angular/core';
import { Task as TaskType } from '../../../types/Task';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.less'
})

export class Task {
  @Input() task!: TaskType;
}
