import axios from "axios";
import { API_URL } from '../../common/constants';
import {showError} from "../slices/signin-slice";
import { getTokenFromCookie } from '../../common/helper';

const postColumns = (id, title) => {
  return async (dispatch) => {
    const postBoardByColumns = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          Accept: "*/*",
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
      const response =  await axios.post(`${API_URL}boards/${id}/columns`, JSON.stringify(title), options);
      if (!response) {
        throw new Error("Fetching columns data failed!");
      }
      return response.data;
    }
    try{
      await postBoardByColumns();
    } catch(e) {
      dispatch(showError("Fetching columns data failed!"));
    }
  }
};
export default postColumns;