import { getTokenFromCookie } from '../../common/helper';
import axios from 'axios';
import { API_URL } from '../../common/constants';
import { ICreateTask } from '../../types/types';


class TasksService {
  async getAllTasks(boardId: string, columnId: string) {
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
    const data = await response.data;
    return data;
  }
  async createTask(userId: string, {boardId, columnId, title, description}: ICreateTask) {
    const options = {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
        Accept: "*/*",
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }
    const response = await axios.post(`${API_URL}boards/${boardId}/columns/${columnId}/tasks`, JSON.stringify({userId, title, description}), options);
    if (!response) {
      throw new Error("Fetching task data failed!");
    }
    const data = await response.data;

    return data;
  }
  async deleteTask(boardId: string, columnId: string, taskId: string) {
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
    const data = await response.data;
    return data;
  }
}
const tasksService = new TasksService();
export default tasksService;