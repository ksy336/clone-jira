import axios from "axios";
import { getTokenFromCookie } from '../../common/helper';
import { API_URL } from '../../common/constants';

class ColumnsService {
  async getAllColumns(boardId: string) {
    const options = {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
        Accept: "*/*",
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }
    const response = await axios.get(`${API_URL}boards/${boardId}/columns`, options);
    if (!response) {
      throw new Error("Getting column data is failed!");
    }
    const data = await response.data;

    return data;
  }
  async addColumn(boardId: string, title) {
    const options = {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
        Accept: "*/*",
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }
    const response =  await axios.post(`${API_URL}boards/${boardId}/columns`, JSON.stringify(title), options);
    if (!response) {
      throw new Error("Fetching columns data failed!");
    }
    const data = await response.data;
    return data;
  }
}
const columnsService = new ColumnsService();
export default columnsService;
