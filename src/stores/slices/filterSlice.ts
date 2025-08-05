import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FilterStatus = "All" | "To Do" | "In Progress" | "Done";

interface FilterState {
  status: FilterStatus;
}

const initialState: FilterState = {
  status: "All",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.status = action.payload;
    },
    resetFilter: (state) => {
      state.status = "All";
    },
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
