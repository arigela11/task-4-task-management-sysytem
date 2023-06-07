import {GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING, UPDATE_ITEMS} from './types';
import axios from 'axios';
import {tokenConfig} from './AuthActions';
import {returnErrors} from './ErrorActions';
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/items').then(res => dispatch({type: GET_ITEMS,payload: res.data})).catch(err => dispatch(returnErrors(err.response.data, err.response.status) ))
};

export const deleteItems = (id) => (dispatch, getState) => {
   axios.delete(`/api/items/${id}`, tokenConfig(getState)).then(res =>
        dispatch({
            type: DELETE_ITEMS,
            payload: id            
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status) ))

}

export const addItem = item => (dispatch, getState) => {
    axios.post('/api/items', item, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_ITEMS,
                payload: res.data
            }))
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status) ))
}
export const updateItems = (id, item) => (dispatch, getState) => {
    axios.put(`/api/items/${id}`, item, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: UPDATE_ITEMS,
                payload: res.data
            }))
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
            
}
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}