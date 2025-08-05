import { useSelector } from 'react-redux';
import { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '@/stores/slices/taskApi';
import type { RootState } from '@/stores/store';
import type { Task } from '@/stores/slices/taskApi';
import { handleApiError } from '@/lib/storage';

export const useTasks = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const filter = useSelector((state: RootState) => state.filter.status);
  const userId = user?.id || 1;
  
  const {
    data: allTasks = [],
    isLoading,
    error,
    refetch,
  } = useGetTasksQuery(userId);

  const tasks = filter === "All" 
    ? allTasks 
    : allTasks.filter((task) => task.status === filter);

  const [addTaskMutation, { isLoading: isAdding }] = useAddTaskMutation();
  const [updateTaskMutation, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTaskMutation, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      await addTaskMutation({ task, userId }).unwrap();
      return { success: true };
    } catch (error) {
      const apiError = handleApiError(error);
      console.error('Add task failed:', apiError);
      return { success: false, error: apiError };
    }
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    try {
      await updateTaskMutation({ id, task }).unwrap();
      return { success: true };
    } catch (error) {
      const apiError = handleApiError(error);
      console.error('Update task failed:', apiError);
      return { success: false, error: apiError };
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskMutation(id).unwrap();
      return { success: true };
    } catch (error) {
      const apiError = handleApiError(error);
      console.error('Delete task failed:', apiError);
      return { success: false, error: apiError };
    }
  };

  return {
    tasks, 
    allTasks,
    isLoading,
    error,
    refetch,
    addTask,
    updateTask,
    deleteTask,
    isAdding,
    isUpdating,
    isDeleting,
    tasksCount: {
      all: allTasks.length,
      todo: allTasks.filter(t => t.status === "To Do").length,
      inProgress: allTasks.filter(t => t.status === "In Progress").length,
      done: allTasks.filter(t => t.status === "Done").length,
    }
  };
};
