import { combineReducers } from 'redux'
import contactReducer from './contact'
export default combineReducers({
  contact: contactReducer
})
