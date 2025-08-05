import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/stores/slices/filterSlice";
import type { RootState } from "@/stores/store";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/loading";
import { useTasks } from "@/hooks/useTasks";

import DashboardHeader from "../components/DashboardHeader";
import NewTaskDialog from "@/modules/NewTaskDialog";
import TaskTable from "@/components/TaskTable";

export default function DashBoard() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.filter.status);
  const { isLoading, error } = useTasks();

  const filters = ["All", "To Do", "In Progress", "Done"] as const;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="max-w-6xl mx-auto py-4 px-4 sm:px-8">
          <ErrorMessage message="Failed to load tasks. Please try again." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      <div className="max-w-6xl mx-auto py-4 px-4 sm:px-8">
        <div className="flex items-center justify-between mt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">My Tasks</h1>
          <NewTaskDialog />
        </div>

        <div className="flex items-center gap-6 border-b border-gray-200 dark:border-gray-700 mt-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => dispatch(setFilter(f))}
              className={`pb-2 font-medium transition ${
                currentFilter === f
                  ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <TaskTable />
      </div>
    </div>
  );
}
