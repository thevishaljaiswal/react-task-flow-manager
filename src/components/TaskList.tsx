import { Task } from '../types/task';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2, Check, Building, Briefcase, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onComplete: (id: string) => void;
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

export const TaskList = ({ tasks, onDelete, onEdit, onComplete }: TaskListProps) => {
  return (
    <div className="space-y-4 w-full max-w-4xl">
      {tasks.map((task) => (
        <Card key={task.id} className={cn(
          "relative group hover:shadow-lg transition-shadow",
          task.completed && "bg-gray-50"
        )}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={cn(task.completed && "text-gray-500 line-through")}>
                  {task.title}
                </CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onComplete(task.id)}
                  className={cn(
                    "opacity-0 group-hover:opacity-100 transition-opacity",
                    task.completed && "text-green-600"
                  )}
                >
                  <Check className="h-4 w-4" />
                </Button>
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
          <CardFooter className="text-sm text-muted-foreground">
            <div className="flex items-center gap-4 flex-wrap">
              {task.customerName && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {task.customerName}
                </div>
              )}
              {task.projectName && (
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {task.projectName}
                </div>
              )}
              {task.unitName && (
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  {task.unitName}
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
