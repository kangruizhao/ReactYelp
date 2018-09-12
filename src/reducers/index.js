import { combineReducers } from 'redux';
import restReducer from './restReducer';
import { reducer as reduxForm } from 'redux-form';
import selectReducer from './selectReducer';
import authReducer from './authReducer';
import commentReducer from './commentReducer'
export default combineReducers({
  restaurants: restReducer,
  form: reduxForm,
  restaurant:selectReducer,
  Auth:authReducer,
  Comments:commentReducer
});
