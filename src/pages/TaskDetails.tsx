import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { allTasks } = useTasks();

  const task = allTasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="max-w-4xl mx-auto py-6 px-4">
          <p className="text-gray-500 dark:text-gray-400 text-center">Task not found.</p>
          <div className="flex justify-center mt-4">
            <Button onClick={() => navigate("/")}>Back to Tasks</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      <div className="max-w-4xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{task.title}</h1>

        <div className="space-y-3 text-gray-700 dark:text-gray-300 text-lg">
          <p>
            <strong>Status:</strong> {task.status}
          </p>
        </div>

        <Button
          className="mt-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
          onClick={() => navigate("/")}
        >
          Back to Tasks
        </Button>
      </div>
    </div>
  );
}
