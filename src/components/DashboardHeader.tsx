import { LogOut, Pin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/stores/slices/authSlice";
import type { AppDispatch, RootState } from "@/stores/store";
import ThemeToggle from "@/components/ThemeToggle";
import { toast } from "react-toastify";

export default function DashboardHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout()); 
    toast.success("Log out successful!");
    navigate("/signin"); 
  };

  const initials = user
    ? `${user.firstName?.[0]}${user.lastName?.[0]}`.toUpperCase()
    : "U";

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between max-w-6xl mx-auto py-3 px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <Pin className="w-5 h-5 fill-gray-700 dark:fill-gray-300 hover:fill-gray-950 dark:hover:fill-gray-100 transition" />
          <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white">
            TaskMaster
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-900 dark:bg-gray-700 text-white font-semibold text-lg cursor-pointer hover:opacity-90 transition">
            {initials}
          </div>
          <ThemeToggle />
          <LogOut
            className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition"
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}
