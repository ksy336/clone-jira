import { createSlice } from '@reduxjs/toolkit';
import { BoardState } from '../../types/types';

const initialState: BoardState = {
  title: "",
  description: "",
  id: "",
  boardItems: [],
  boardData: {},
  error: null,

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
    }
  }
});
export const {
  createNewBoardTitle,
  createNewBoardDescription,
  createNewBoardId,
  createBoardItem,
  removeBoard,
  showError,
  getBoardData
} = boardSlice.actions;
export default boardSlice.reducer;