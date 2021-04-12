import { combineReducers } from 'redux';
import toDo from './toDoListReducer';

const rootReducer = combineReducers({
  toDo,
});

export default rootReducer;
