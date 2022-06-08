import { createSlice } from '@reduxjs/toolkit';

export interface TaskStateTask {
  newTasks: any[];
}

const initialState: TaskStateTask = {
  newTasks: [],

}
const addTaskSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {
    addTaskItem(state, action) {
      state.newTasks = [...state.newTasks, action.payload];
      //state.newTasks = state.newTasks.filter((task) => task.id === action.payload.columnId)
    },
    removeTask(state, action) {
      const id = action.payload;
      state.newTasks = state.newTasks.filter((task) => task.id !== id);
    },
    removeAllTasks(state) {
      state.newTasks = [];
    }

  }
});

export const {
  addTaskItem,
  removeTask,
  removeAllTasks
} = addTaskSlice.actions;
export default addTaskSlice.reducer;

