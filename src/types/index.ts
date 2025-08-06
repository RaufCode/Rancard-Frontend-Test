export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  total: number;
  skip: number;
  limit: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TaskStatus = "To Do" | "In Progress" | "Done";

export type FilterStatus = "All" | TaskStatus;

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface ErrorMessageProps {
  message: string;
  className?: string;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type AsyncResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};
