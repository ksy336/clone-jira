import axios from "axios";
import { API_URL } from '../../common/constants';
import { getTokenFromCookie } from '../../common/helper';
import {showError} from "../slices/signin-slice";

const deleteTask = (boardId, columnId, taskId) => {
  return async (dispatch) => {
    const deleteColumnFromDataBase = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          Accept: "*/*",
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
      const response = await axios.delete(`${API_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, options);
      if (!response) {
        throw new Error("Deleting data was failed!");
      }

      return response.data;
    }
    try{
      await deleteColumnFromDataBase();
    } catch(e) {
      dispatch(showError("Deleting data was failed!"));
    }
  }
}
export default deleteTask;