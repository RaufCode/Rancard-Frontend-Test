import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authApi } from "./slices/authSlice";
import filterReducer from "./slices/filterSlice";
import { taskApi } from "./slices/taskApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
