import {combineReducers} from 'redux';
import ItemReducer from './itemReducer';
import AuthReducer from './AuthReducer';
import errorReducer from './errorReducer'
export default combineReducers({
    item: ItemReducer,
    error : errorReducer,
    auth : AuthReducer
})