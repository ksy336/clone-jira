import axios from "axios";
import {showError} from "../slices/edit-slice";
import { getTokenFromCookie } from '../../common/helper';
import { API_URL } from '../../common/constants';

export const editProfileData = (editData, userId) => {
  return async (dispatch) => {
    dispatch(showError(null));
    const sendEditData = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
           Authorization: `Bearer ${getTokenFromCookie()}`,
        },
      };
      const response = await axios.put(`${API_URL}users/${userId}`, JSON.stringify(editData), options);
      if (!response) {
        throw new Error("Something went wrong!");
      }
      const data = response.data;
      return data;
    };
    try {
      await sendEditData();
    } catch (e) {
      dispatch(showError("Something went wrong!"));
    }
  }
};