
export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: Priority;
  status: Status;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  customerName: string;
  projectName: string;
  unitName: string;
  completed: boolean;
}
