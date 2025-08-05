import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "@/hooks/useTasks";
import { Trash2, UserPen } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EditTaskDialog from "@/modules/EditTaskDialog";
import DeleteTaskDialog from "@/modules/DeleteTaskDialog";
import type { Task } from "@/stores/slices/taskApi";

const TaskRow = React.memo(({ 
  task, 
  onRowClick 
}: { 
  task: Task; 
  onRowClick: (id: string) => void;
}) => {
  const handleRowClick = useCallback(() => {
    onRowClick(task.id);
  }, [task.id, onRowClick]);

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <TableRow
      onClick={handleRowClick}
      className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
    >
      <TableCell className="px-6 py-3 text-gray-900 dark:text-gray-100">{task.title}</TableCell>
      <TableCell className="px-6 py-3">
        <StatusBadge status={task.status} />
      </TableCell>
      <TableCell
        className="px-6 py-3 text-center flex justify-center gap-2"
        onClick={handleEditClick}
      >
        <EditTaskDialog
          task={task}
          trigger={
            <Button variant="ghost" size="sm">
              <UserPen className="w-5 h-5 text-green-600 dark:text-green-400" />
            </Button>
          }
        />
        <DeleteTaskDialog
          task={task}
          trigger={
            <Button variant="ghost" size="sm">
              <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
            </Button>
          }
        />
      </TableCell>
    </TableRow>
  );
});

TaskRow.displayName = 'TaskRow';

const StatusBadge = React.memo(({ status }: { status: Task['status'] }) => {
  const badgeClasses = useMemo(() => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "To Do":
        return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300`;
      case "In Progress":
        return `${baseClasses} bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300`;
      case "Done":
        return `${baseClasses} bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300`;
      default:
        return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300`;
    }
  }, [status]);

  return <span className={badgeClasses}>{status}</span>;
});

StatusBadge.displayName = 'StatusBadge';

export default function TaskTable() {
  const navigate = useNavigate();
  const { tasks, isDeleting } = useTasks();

  const handleRowClick = useCallback((id: string) => {
    navigate(`/tasks/${id}`);
  }, [navigate]);

  const emptyState = useMemo(() => (
    <TableRow>
      <TableCell colSpan={3} className="px-6 py-3 text-center text-gray-400 dark:text-gray-500">
        No tasks match this filter.
      </TableCell>
    </TableRow>
  ), []);

  return (
    <div className="mt-5 overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm relative bg-white dark:bg-gray-800">
      <Table className="min-w-full text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <TableHead className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">Task</TableHead>
            <TableHead className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">Status</TableHead>
            <TableHead className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            emptyState
          ) : (
            tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onRowClick={handleRowClick}
              />
            ))
          )}
        </TableBody>
      </Table>
      {isDeleting && (
        <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      )}
    </div>
  );
}
