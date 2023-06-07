
import {GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING, UPDATE_ITEMS} from '../Actions/types';
const initialState = { 
    items: [],
    loading: false
}

export default function ItemReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            console.log(action)
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        
        case DELETE_ITEMS:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }

        case ADD_ITEMS:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        
        
        case ITEMS_LOADING:
            return {
                ...state,
                loading : true
            }
        case UPDATE_ITEMS:
            return {
                ...state
            }
        default:
            return state;
    }
}