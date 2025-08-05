import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";


export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <div className="flex items-center justify-center w-20 h-20 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full">
          <AlertTriangle className="w-10 h-10 text-orange-600 dark:text-orange-400" />
        </div>
        <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-100">Oops! Something went wrong</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Please try again later or return to the homepage.
        </p>
        <div className="mt-6 flex justify-center gap-4">
        <Link
            to="/"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 font-semibold transition-all duration-200 ease-in-out"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
