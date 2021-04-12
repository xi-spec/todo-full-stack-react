import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import {
  loadLists,
  addList,
  deleteList,
} from '../../redux/actions/toDoListActions';
import './toDoList.css';
import Header from './header/header';

function ToDoList({ toDo, actions }) {
  const [listInput, setListInput] = useState('');

  function add() {
    const list = { task: listInput, done: false };
    actions.addList(list, toDo);
    setListInput('');
  }

  return (
    <>
      <div className="m-4 todo">

        <Header />

        {toDo.isLogin && (
          <div className="todo___list">
            <div className="mt-2">
              <input type="text" className="todo-input " value={listInput} onChange={(event) => setListInput(event.target.value)} aria-label="Text input with checkbox" />
              <button disabled={!listInput} className="btn btn-light" type="submit" onClick={() => add()}>add</button>
            </div>
            <ul>
              {toDo.toDoLists && toDo.toDoLists.map(({ task, _id }) => (
                <li
                  key={_id}
                  className="list"
                >
                  <div className="input-group">

                    <div className="input-group-text">
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                    </div>

                    <input type="text" className="form-control" value={task} aria-label="Text input with radio button" />

                  </div>

                  <button className="btn btn-light delete-btn" type="button" onClick={() => actions.deleteList(_id, toDo)}>x</button>
                </li>

              ))}

            </ul>
          </div>
        )}

      </div>

    </>

  );
}

ToDoList.propTypes = {
  toDo: PropTypes.shape({
    toDoLists: PropTypes.arrayOf(PropTypes.object),
    _id: PropTypes.string,
    isLogin: PropTypes.bool,
  }).isRequired,
  actions: PropTypes.shape({
    loadLists: PropTypes.func,
    addList: PropTypes.func,
    deleteList: PropTypes.func,
  }).isRequired,
};

function mapStateToProps({ toDo }) {
  return {
    toDo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ loadLists, addList, deleteList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
