import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../../../types/Task';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.less',
})
export class NewTask {
  @Input() isShowDialog!: boolean;
  // If true the form is disabled (used to indicate saving/loading)
  @Input() isDisabled = false;
  @Output() cancelAdd = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<NewTaskData>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  onCancel() {
    this.cancelAdd.emit();
  }

  onSubmit() {
    if (this.isDisabled) return; // prevent duplicate submits while saving

    this.taskCreated.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDueDate,
    });
  }
}
