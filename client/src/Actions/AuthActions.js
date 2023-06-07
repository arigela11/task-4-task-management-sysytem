import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';

import {returnErrors} from './ErrorActions' ;
//Check Token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({type: USER_LOADING});

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

// Register User
export const register = ({name, email,password}) => dispatch => {
    //config
    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({name, email, password})
    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

//helper function
export const tokenConfig = getState => {
    //Setup configuration and tokens
    //GET token from localstorage
    const token = getState().auth.token
    
    //Headers
    const config = {
        headers : {
            "Content-type":"application/json"
        }
    }

    //if token, add to headers 
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config
}

//Logout

export const Logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

//Login 

export const Login = ({email, password}) => dispatch => {
     //config
     const config = {
        headers : {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email, password})
    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}