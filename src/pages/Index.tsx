
import { useState } from 'react';
import { Task } from '../types/task';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTasks([...tasks, newTask]);
    setShowForm(false);
    toast({
      title: "Task created",
      description: "Your new task has been created successfully.",
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
    });
  };

  const handleEditTask = (task: Task) => {
    // To be implemented in the next iteration
    console.log('Edit task:', task);
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Tasks</h1>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        {showForm ? (
          <div className="mt-4">
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : null}

        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </div>
  );
};

export default Index;
