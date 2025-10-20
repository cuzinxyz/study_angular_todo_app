import { Component, signal } from '@angular/core';
import { Header } from "./header/header";
import { UserComponent } from './user/user';
import { DUMMY_USERS } from '../utils/dummy-users';
import { User } from '../types/User';
import { Tasks } from "./tasks/tasks";
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, UserComponent, Tasks, NgForOf],
  templateUrl: './app.html',
  styleUrls: ['./app.less']
})

export class App {
  protected readonly title = signal('story-stream');
  // default to the first dummy user if available (safe for empty arrays)
  selectedUserId?: string|number|null;
  users: User[] = DUMMY_USERS;
  tasks: any = [];

  get selectedUser() {
    return this.users.find(user => user.id === this.selectedUserId) ?? undefined;
  }

  onSelectUser(id: string|number) {
    this.selectedUserId = id;
  }
}
