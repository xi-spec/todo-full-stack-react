import reduxImmutableStatInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers';

function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(reduxImmutableStatInvariant(), thunk)),
  );
}

export default configureStore();
