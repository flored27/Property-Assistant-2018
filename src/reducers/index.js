import { combineReducers } from 'redux';
import { authReducer, properties } from './AuthReducer'
export default combineReducers({
    auth: authReducer
});
