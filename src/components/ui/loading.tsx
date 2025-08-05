import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div 
        className={cn(
          "animate-spin rounded-full border-b-2 border-blue-600",
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
};

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => (
  <div className={cn(
    "text-red-600 bg-red-50 p-4 rounded-lg border border-red-200",
    className
  )}>
    <p>{message}</p>
  </div>
);
