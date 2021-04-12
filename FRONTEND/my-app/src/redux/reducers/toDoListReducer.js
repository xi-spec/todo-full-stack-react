import toDoListActionTypes from '../actions/toDoListActionTypes';
import initialState from '../store/initialState';

export default function toDoListReducer(state = initialState.toDo, action) {
  switch (action.type) {
    case toDoListActionTypes.LOAD_LISTS: {
      return { ...state, toDoLists: action.toDoLists };
    }

    case toDoListActionTypes.ADD_LIST:
      return { ...state, ...action.data };

    case toDoListActionTypes.DELETE_LIST: {
      const newState = state.toDoLists.filter((list) => list._id !== action.listId);
      return { ...state, toDoLists: newState };
    }

    case toDoListActionTypes.USER_LOGOUT:
      return { toDoList: [], isLogin: false };

    case toDoListActionTypes.USER_LOGIN:
      return {
        ...action.data,
        isLogin: true,
      };

    default:
      return state;
  }
}
