import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import {
  userLogout,
  userLogin,
} from '../../../redux/actions/toDoListActions';
import './header.css';

function Header({ toDo, actions }) {
  return (
    <>
      <div className="toDo__header">
        <h3>To Do List</h3>
        {!toDo.isLogin && (
        <button type="button" className="btn btn-light log-btn" onClick={actions.userLogin}>Continue with Google</button>
        )}
        {toDo.isLogin && (
        <button type="button" className="btn btn-light log-btn" onClick={actions.userLogout}>Log out</button>
        )}

      </div>
      {toDo.isLogin && (
      <div className="user-info">
        <p>
          {`Welcome! ${toDo.displayName}`}
        </p>
      </div>
      )}
    </>
  );
}

Header.propTypes = {
  toDo: PropTypes.shape({
    isLogin: PropTypes.bool,
    _id: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
  actions: PropTypes.shape({
    userLogout: PropTypes.func,
    userLogin: PropTypes.func,
  }).isRequired,
};

function mapStateToProps({ toDo }) {
  return {
    toDo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ userLogout, userLogin }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
