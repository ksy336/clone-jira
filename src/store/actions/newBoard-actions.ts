import axios from "axios";
import {showError, createBoardItem, createNewBoardId} from "../slices/board-slice";
import { getTokenFromCookie } from '../../common/helper';
import { API_URL } from '../../common/constants';

const getNewBoard = (boardFormData) => {
  return async(dispatch) => {
    const fetchingBoardData = async () => {
      dispatch(showError(null));
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
           Authorization: `Bearer ${getTokenFromCookie()}`,
        },
      }
      const response = await axios.post(`${API_URL}boards`, boardFormData, options);
      if(!response) {
        throw new Error("Something went wrong!");
      }
      dispatch(createBoardItem(response.data));
      dispatch(createNewBoardId(response.data.id));
      return response.data;
    }
    try {
      await fetchingBoardData();

    } catch(e) {
      dispatch(showError("Creating board data failed!"));
    }
  }
};
export default getNewBoard;