import axios from 'axios';
import { getUserData, showError, setIsLoading, getUserId } from '../slices/signUp-slice';
import { setCookie } from 'typescript-cookie';
import { API_URL } from '../../common/constants';

export let savedData;

export const sendingFormSignUp = (signUpData) => {
  return async (dispatch) => {
    dispatch(showError(null));
    // dispatch(setIsLoading(true));
    const sendRequest = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const response = await axios.post(
        `${API_URL}signup`,
        signUpData,
        options
      );

      console.log(response, signUpData);
      if (!response) {
        throw new Error(`${response.data.message}`);
      }
      const data = await response.data;
      savedData = setCookie('id', data.id, { expires: 1 });
      dispatch(getUserId(data.id));
      return data;
    };
    try {
      const allData = await sendRequest();
      dispatch(getUserData(allData));
    } catch (error) {
      dispatch(showError('Something went wrong!'));
    }
    dispatch(setIsLoading(false));
  };
};
