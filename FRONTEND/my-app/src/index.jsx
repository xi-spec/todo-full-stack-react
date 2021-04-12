import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import './index.css';
import ToDoList from './components/ToDoList/ToDoList';

render(
  <Provider store={store}>
    <ToDoList />
  </Provider>,
  document.getElementById('root'),
);
