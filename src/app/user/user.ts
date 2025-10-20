import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../types/User';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.html',
  styleUrls: ['./user.less'],
})
export class UserComponent {
  @Input() user!: User;
  @Input() selected!: boolean;
  @Output() userSelected = new EventEmitter<string | number>();

  get getUsername() {
    return this.user.name;
  }

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser() {
    this.userSelected.emit(this.user.id);
  }
}
