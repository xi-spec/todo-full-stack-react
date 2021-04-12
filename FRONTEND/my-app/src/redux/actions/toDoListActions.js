import axios from 'axios';
import firebase from 'firebase';
import toDoListActionTypes from './toDoListActionTypes';
import '../../firebase';

const url = 'http://localhost:7000/api/lists/';
const userUrl = 'http://localhost:7000/api/users/';

export function loadLists(id) {
  return async (dispatch) => {
    const { data: { todoLists } } = await axios(`${userUrl}${id}`);
    dispatch({
      type: toDoListActionTypes.LOAD_LISTS,
      todoLists,
    });
  };
}

export function addList(list, toDo) {
  const { toDoLists } = toDo;
  return async (dispatch) => {
    const { data: { _id } } = await axios.post(url, list);
    const { data } = await axios.put(`${userUrl}${toDo._id}`, { toDoLists: [...toDoLists, _id] });
    dispatch({
      type: toDoListActionTypes.ADD_LIST,
      data,
    });
  };
}

export function deleteList(listId, user) {
  const newUser = { ...user, toDoLists: user.toDoLists.filter((elem) => elem !== listId) };

  axios.delete(`${url}${listId}`, { _id: listId });
  axios.put(userUrl, newUser);
  return {
    type: toDoListActionTypes.DELETE_LIST,
    listId,
  };
}

export function userLogin() {
  return async (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const {
      user: { displayName, email, photoURL },
    } = await firebase.auth().signInWithPopup(provider);

    const { data } = await axios.post(userUrl, {
      displayName, email, photoURL,
    });

    dispatch({
      type: toDoListActionTypes.USER_LOGIN,
      data,

    });
  };
}

export function userLogout() {
  firebase.auth().signOut();
  return {
    type: toDoListActionTypes.USER_LOGOUT,
  };
}
