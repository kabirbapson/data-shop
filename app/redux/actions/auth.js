import EncryptedStorage from 'react-native-encrypted-storage';

import axios from '../../axios';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  USER_LOGOUT,
  SET_TOKEN,
  USER_RESTORING,
} from '../constants/auth';

export const restoreUser = () => (dispatch, getState) => {
  dispatch({type: USER_RESTORING});
  //Get Token from the state

  const token = getState().auth.token;
  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //Check to see if there is an token and to header
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios
    .get('/api/user', config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: AUTH_ERROR,
        });
      } else {
        alert('Network error Please check your connection');
      }
    });
};

export const signUp = (userData, ErrorOccur) => dispatch => {
  dispatch({type: USER_LOADING});

  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(userData);

  axios
    .post('/api/register', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        if (error.response.data.username) {
          ErrorOccur('Sorry account with this phone number already exist');
          dispatch({type: LOGIN_FAIL});
        }
      } else {
        ErrorOccur(error.message);
        dispatch({type: LOGIN_FAIL});
      }
    });
};

export const signIn = (userData, ErrorOccur) => dispatch => {
  dispatch({type: USER_LOADING});

  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(userData);

  axios
    .post('/api/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        if (error.response.data.non_field_errors) {
          ErrorOccur(error.response.data.non_field_errors);
          dispatch({type: LOGIN_FAIL});
        }
      } else {
        ErrorOccur(error.message);
        dispatch({type: LOGIN_FAIL});
      }
    });
};
