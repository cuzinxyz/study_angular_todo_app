export interface Task {
  id: string | number;
  userId: string | number;
  title: string;
  summary: string | null;
  dueDate: Date | string;
}

export interface NewTaskData {
  title: string;
  summary: string;
  dueDate: string;
}
