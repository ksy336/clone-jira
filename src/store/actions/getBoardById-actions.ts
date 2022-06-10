import axios from "axios";
import { API_URL } from '../../common/constants';
import {showError} from "../slices/signin-slice";
import { getTokenFromCookie } from '../../common/helper';
import { getBoardData } from "../slices/board-slice";
import {getColumnArr} from "../slices/column-slice";

const getBoardById = (id) => {
  return async (dispatch) => {
    const getBoard = async() => {
      const options = {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          Accept: "*/*",
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
      const response = await axios.get(`${API_URL}boards/${id}`, options);
      if (!response) {
        throw new Error("Something went wrong!");
      }
      dispatch(getBoardData(response.data));
      dispatch(getColumnArr(response.data.columns));
      return response.data;
    }
    try {
      await getBoard();
    } catch (e) {
      dispatch(showError("Fetching board data failed!"));
    }
  }
}
export default getBoardById;