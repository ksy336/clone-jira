import axios from "axios";
import { showError } from '../slices/deleteUser-slice';
import { getTokenFromCookie } from '../../common/helper';
import { getAuth } from "../slices/signin-slice";
import {getToken} from "../slices/signin-slice";
import { API_URL } from '../../common/constants';

export const deleteUserProfile = (userId) => {
  return async (dispatch) => {
    dispatch(showError(null));
    const deleteDataUser = async () => {
      const options = {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${getTokenFromCookie()}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const response = await axios.delete(`${API_URL}users/${userId}`, options);
      console.log(response);
      if (!response) {
        throw new Error("Something went wrong!");
      }
      const data = await response.data;
      return data;
    }
    try {
      await deleteDataUser();
      dispatch(getAuth(false));
    } catch (error) {
      dispatch(showError("Something went wrong!"));
    }
  }
}
