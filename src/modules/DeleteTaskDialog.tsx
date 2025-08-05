import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { toast } from "react-toastify";
import type { Task } from "@/stores/slices/taskApi";

interface DeleteTaskDialogProps {
  task: Task;
  trigger?: React.ReactNode;
  onDelete?: () => void;
}

export default function DeleteTaskDialog({ task, trigger, onDelete }: DeleteTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const { deleteTask, isDeleting } = useTasks();

  const handleDelete = async () => {
    const result = await deleteTask(task.id);
    
    if (result.success) {
      toast.success("Task deleted successfully!");
      setOpen(false);
      onDelete?.();
    } else {
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="sm">
            <Trash2 className="w-5 h-5 text-red-600" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Delete Task
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h4 className="font-medium text-gray-900 mb-2">Task to be deleted:</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-700">Title:</span>
                <p className="text-sm text-gray-900">{task.title}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {task.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Deleting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Task
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
