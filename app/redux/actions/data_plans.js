import axios from '../../axios';
import {
  GET_DATA_BUNDLES,
  DATA_BUNDLE_LOADED,
  DATA_BUNDLE_CHECKOUT_SUCCESS,
  DATA_BUNDLE_CHECKOUT_FAILED,
  SET_LOADING,
  DATA_PURCHASE_HISTORY,
} from '../constants/data_bundles';
import {AUTH_ERROR} from '../constants/auth';

export const getDataBundle = () => (dispatch, getState) => {
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
    .get('/dataplans/list', config)
    .then(res => {
      dispatch({
        type: DATA_BUNDLE_LOADED,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        // do nothing
      } else {
        // do nothing
      }
    });
};

export const buyDataBundle =
  (userData, handleCheckoutSuccess) => (dispatch, getState) => {
    dispatch({type: SET_LOADING});
    //Get Token from the state

    const token = getState().auth.token;
    // Header
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = JSON.stringify(userData);

    //Check to see if there is an token and to header
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    axios
      .post('/dataplans/buy/data', data, config)
      .then(res => {
        dispatch({
          type: DATA_BUNDLE_CHECKOUT_SUCCESS,
          payload: res.data,
        });
        handleCheckoutSuccess();
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 501) {
            alert(error.response.data.reason);
          }
          dispatch({type: DATA_BUNDLE_CHECKOUT_FAILED});
        } else {
          // do nothing
        }
      });
  };

export const getDataPurchaseHistory = () => (dispatch, getState) => {
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
    .get('/dataplans/buy/data/history', config)
    .then(res => {
      dispatch({
        type: DATA_PURCHASE_HISTORY,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        // nothing
      } else {
        // do nothing
      }
    });
};
