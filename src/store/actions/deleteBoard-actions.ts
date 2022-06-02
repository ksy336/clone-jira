import axios from "axios";
import { AppDispatch } from '../../types/types';
import { getTokenFromCookie } from '../../common/helper';
import {showError} from "../slices/board-slice";
import { API_URL } from '../../common/constants';

const deleteBoard = (boardId) => {
  return async (dispatch: AppDispatch) => {
    dispatch(showError(null));
    const fetchingDeleteRequest = async() => {
      const options = {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          Accept: "*/*",
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
      const response = await axios.delete(`${API_URL}boards/${boardId}`, options);
      if(!response) {
        throw new Error("Something went wrong!");
      }
      return response.data;
    }
    try{
      await fetchingDeleteRequest();
    } catch (e) {
      dispatch(showError("Fetching delete data failed!"));
    }
  }
}
export default deleteBoard;