import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task as TaskType } from '../../../types/Task';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.less',
})
export class Task {
  @Input() task!: TaskType;
  @Output() complete = new EventEmitter<string | number>();

  onCompleteTask() {
    this.complete.emit(this.task.id);
  }
}
