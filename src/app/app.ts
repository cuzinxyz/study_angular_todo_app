import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { UserComponent } from './user/user';
import { DUMMY_USERS } from '../utils/dummy-users';
import { User } from '../types/User';
import { Tasks } from './tasks/tasks';
import { Task as TaskType } from '../types/Task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, UserComponent, Tasks],
  templateUrl: './app.html',
  styleUrls: ['./app.less'],
})
export class App {
  protected readonly title = signal('story-stream');

  selectedUserId?: string | number | null;
  users: User[] = DUMMY_USERS;
  tasks: TaskType[] = [];

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId) ?? undefined;
  }

  onSelectUser(id: string | number) {
    this.selectedUserId = id;
  }
}
