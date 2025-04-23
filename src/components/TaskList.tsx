
import { Task } from '../types/task';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-orange-500 hover:bg-orange-600';
    case 'medium':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'low':
      return 'bg-gray-500 hover:bg-gray-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'done':
      return 'bg-green-500 hover:bg-green-600';
    case 'in_progress':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'todo':
      return 'bg-gray-500 hover:bg-gray-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

export const TaskList = ({ tasks, onDelete, onEdit }: TaskListProps) => {
  return (
    <div className="space-y-4 w-full max-w-4xl">
      {tasks.map((task) => (
        <Card key={task.id} className="relative group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(task)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className={cn(getPriorityColor(task.priority), "text-white")}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
              <Badge variant="secondary" className={cn(getStatusColor(task.status), "text-white")}>
                {task.status.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Badge>
              {task.category && (
                <Badge variant="outline">
                  {task.category}
                </Badge>
              )}
              {task.dueDate && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(task.dueDate, 'PP')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
