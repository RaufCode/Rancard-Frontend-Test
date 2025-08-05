import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface DummyTask {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface Task {
  id: string;
  title: string;
  status: "To Do" | "In Progress" | "Done";
}

export interface TasksResponse {
  todos: DummyTask[];
  total: number;
  skip: number;
  limit: number;
}

export interface AddTaskRequest {
  todo: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTaskRequest {
  id: number;
  todo?: string;
  completed?: boolean;
  userId?: number;
}

const transformDummyTask = (dummyTask: DummyTask): Task => ({
  id: dummyTask.id.toString(),
  title: dummyTask.todo,
  status: dummyTask.completed ? "Done" : "To Do",
});

const transformToAddRequest = (task: Omit<Task, "id">, userId: number): AddTaskRequest => ({
  todo: task.title,
  completed: task.status === "Done",
  userId,
});

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], number>({
      query: (userId) => `todos/user/${userId}`,
      transformResponse: (response: TasksResponse) =>
        response.todos.map(transformDummyTask),
      providesTags: ["Task"],
    }),
    addTask: builder.mutation<Task, { task: Omit<Task, "id">; userId: number }>({
      query: ({ task, userId }) => ({
        url: "todos/add",
        method: "POST",
        body: transformToAddRequest(task, userId),
      }),
      transformResponse: (response: DummyTask) => transformDummyTask(response),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<Task, { id: string; task: Partial<Task> }>({
      query: ({ id, task }) => ({
        url: `todos/${id}`,
        method: "PUT",
        body: {
          todo: task.title,
          completed: task.status === "Done",
        },
      }),
      transformResponse: (response: DummyTask) => transformDummyTask(response),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<{ id: string; isDeleted: boolean }, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
