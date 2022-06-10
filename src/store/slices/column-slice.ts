import { createSlice } from '@reduxjs/toolkit';
export interface ColumnsState {
  columns: Array<object>;
}

const initialState: ColumnsState = {
  columns: []
}
const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    getColumnArr(state, action) {
      state.columns = action.payload;
    },

  }
});
export const {getColumnArr} = columnSlice.actions;
export default columnSlice.reducer;