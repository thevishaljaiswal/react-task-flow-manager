
import { useState } from 'react';
import { Task } from '../types/task';
import ActivityForm from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
      title: "Activity created",
      description: "Your new activity has been created successfully.",
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Activity deleted",
      description: "The activity has been deleted successfully.",
    });
  };

  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
    toast({
      title: "Activity updated",
      description: "Activity completion status has been updated.",
    });
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Activities</h1>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Activity
          </Button>
        </div>

        {showForm && (
          <div className="mt-4">
            <ActivityForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onComplete={handleCompleteTask}
        />
      </div>
    </div>
  );
};

export default Index;
