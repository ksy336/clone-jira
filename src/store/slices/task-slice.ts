import { createSlice } from '@reduxjs/toolkit';

export interface TaskState {
  title: string;
  description: string;
  tasks: any[]
}

const initialState: TaskState = {
  title: "",
  description: "",
  tasks: []
}
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTitle(state, action) {
      state.title = action.payload;
    },
    getDescription(state, action) {
      state.description = action.payload;
    },
    addTaskItem(state, action) {
      state.tasks = [...state.tasks, action.payload];
    }
  }
});

export const {
  getTitle,
  getDescription,
  addTaskItem
} = taskSlice.actions;

export default taskSlice.reducer;