import { createSlice } from '@reduxjs/toolkit';

export interface TaskState {
  title: string;
  description: string;
  taskId: string;
}

const initialState: TaskState = {
  title: "",
  description: "",
  taskId: ""
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
    getId(state, action) {
      state.taskId = action.payload;
    }
  }
});

export const {
  getTitle,
  getDescription,
  getId
} = taskSlice.actions;

export default taskSlice.reducer;