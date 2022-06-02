import axios from 'axios';
import { setCookie } from 'typescript-cookie';
import { getToken, showError, getAuth, setIsLoading } from '../slices/signin-slice';
import { getTokenFromCookie } from '../../common/helper';
import { API_URL } from '../../common/constants';

export const sendingSignInData = (signInData) => {
  return async (dispatch) => {
    dispatch(showError(null));
    const sendRequestSignIn = async () => {
      dispatch(setIsLoading(true));
      const options = {
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${getTokenFromCookie()}`,
          'Access-Control-Allow-Origin': '*',
        },
      };
      const response = await axios.post(
        `${API_URL}signin`,
        signInData,
        options
      );
      if (!response) {
        throw new Error(response.data?.message);
      }

      const token = response.data.token;
      setCookie('jwt', token, { expires: 2 });
      dispatch(getToken(token));
      return token;
    };
    try {
      await sendRequestSignIn();
      dispatch(getAuth(true));
    } catch (error) {
      dispatch(showError('User login already exists!"'));
    }
    dispatch(setIsLoading(false));
  };
};
