import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const response = await api.signIn(formData); //{message: asdasd}

    dispatch({ type: AUTH, data: response.data });

    router.push('/');
  } catch (error) {
    // const error = new Error(response)
    console.log(error.response.data);
    dispatch({type: "AUTH_ERROR", payload: error.response.data.message})
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
