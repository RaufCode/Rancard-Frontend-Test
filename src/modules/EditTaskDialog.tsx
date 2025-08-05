import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTasks } from "@/hooks/useTasks";
import { taskSchema, type TaskFormData } from "@/schemas/taskSchema";
import type { Task } from "@/stores/slices/taskApi";
import { toast } from "react-toastify";

interface EditTaskDialogProps {
  task: Task;
  trigger?: React.ReactNode;
}

export default function EditTaskDialog({ task, trigger }: EditTaskDialogProps) {
  const { updateTask, isUpdating } = useTasks();
  const [open, setOpen] = useState(false);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      status: task.status,
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

  useEffect(() => {
    if (open) {
      reset({
        title: task.title,
        status: task.status,
      });
    }
  }, [open, task, reset]);

  const onSubmit = async (data: TaskFormData) => {
    const result = await updateTask(task.id, {
      title: data.title,
      status: data.status,
    });

    if (result.success) {
      toast.success("Task updated successfully!");
      setOpen(false);
    } else {
      toast.error("Failed to update task. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Edit Task</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Update the task details below.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">Task Name</Label>
            <Input
              id="title"
              placeholder="Enter task name"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 dark:text-red-400 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status" className="text-gray-700 dark:text-gray-300">Status</Label>
            <select
              id="status"
              {...register("status")}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.status && (
              <p className="text-red-500 dark:text-red-400 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
