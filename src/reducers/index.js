import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { errorMessageReducer } from './errorMessageReducer';
import { hotelsReducer } from './hotels';

const rootReducer = combineReducers({
  auth: authReducer,
  errorMessage: errorMessageReducer,
  hotels: hotelsReducer,
});

export default rootReducer;
