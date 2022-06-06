import { createSlice } from '@reduxjs/toolkit';
import { BoardState } from '../../types/types';

const initialState: BoardState = {
  title: "",
  description: "",
  id: "",
  boardItems: [],
  boardData: {
    title: "",
    description: "",
    id: "",
    columns: [],
  },
  error: null,
  titleColumn: "",
  columnId: "",
}
const boardSlice = createSlice({
  name: "newBoard",
  initialState,
  reducers: {
    createNewBoardTitle(state, action) {
      state.title = action.payload;
    },
    createNewBoardDescription(state, action) {
      state.description = action.payload;
    },
    createNewBoardId(state, action) {
      state.id = action.payload;
    },
    createBoardItem(state, action) {
      state.boardItems.push(action.payload);
    },
    showError(state, action) {
      state.error = action.payload;
    },
    removeBoard(state, action) {
      const id = action.payload;
      state.boardItems = state.boardItems.filter((board) => board.id !== id);
    },
    getBoardData(state, action) {
      state.boardData = action.payload;
    },
    getEnteredTitle(state, action) {
      state.titleColumn = action.payload;
    },
    removeColumn(state, action) {
      const id = action.payload;
      console.log(id);
      state.boardData.columns = state.boardData.columns.filter((column: any) => column.id !== id);
    },
    addColumn(state, action) {
      state.boardData.columns = [...state.boardData.columns, action.payload];
    },
  }
});
export const {
  createNewBoardTitle,
  createNewBoardDescription,
  createNewBoardId,
  createBoardItem,
  removeBoard,
  showError,
  getBoardData,
  getEnteredTitle,
  removeColumn,
  addColumn,
} = boardSlice.actions;
export default boardSlice.reducer;