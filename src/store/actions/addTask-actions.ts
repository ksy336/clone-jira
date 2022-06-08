import axios from "axios";
import { API_URL } from '../../common/constants';
import { getTokenFromCookie } from '../../common/helper';
import { showError } from '../slices/signin-slice';
import { getId} from "../slices/task-slices";
import {addTaskItem} from "../slices/addTask-slice";


const addTask = (boardId, columnId, taskData) => {
  return async (dispatch) => {
    const createNewTask = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          Accept: "*/*",
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
      const response = await axios.post(`${API_URL}boards/${boardId}/columns/${columnId}/tasks`, JSON.stringify(taskData), options);
      if (!response) {
        throw new Error("Fetching task data failed!");
      }
      const data = response.data;
      dispatch(addTaskItem(data));
      dispatch(getId(data.id));

      return data;
    }
    try {
      await createNewTask();
    } catch(e) {
      dispatch(showError("Fetching task data failed!"));
    }
  }
}
export default addTask;