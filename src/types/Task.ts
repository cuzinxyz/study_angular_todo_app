export type Task = {
  id: string | number;
  userId: string | number;
  title: string;
  summary: string | null;
  dueDate: Date | string;
};
