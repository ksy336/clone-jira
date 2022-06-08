import axios from "axios";
import { API_URL } from '../../common/constants';
import {showError} from "../slices/signin-slice";
import { getTokenFromCookie } from '../../common/helper';
import {addTaskItem} from "../slices/addTask-slice";

const getAllTasks = (boardId, columnId) => {
  return async (dispatch) => {
    const getTasks = async() => {
      const options = {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          Accept: "*/*",
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
      const response = await axios.get(`${API_URL}boards/${boardId}/columns/${columnId}/tasks`, options);
      if (!response) {
        throw new Error("Something went wrong!");
      }
      console.log(response.data);
      //dispatch(addTaskItem(response.data));
      return response.data;
    }
    try {
      await getTasks();
    } catch (e) {
      dispatch(showError("Fetching board data failed!"));
    }
  }
}
export default getAllTasks;
