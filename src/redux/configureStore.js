import { createRouterMiddleware, initialRouterState } from 'connected-next-router';
import { fromJS } from 'immutable';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

export default function configureStore(initialState = {}, options) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};
  
  if (options.asPath) {
    initialState.router = initialRouterState(options.asPath);
  }
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    } else {
      composeEnhancers = composeWithDevTools;
    }
  }

  const bindMiddleware = middleware => composeEnhancers(applyMiddleware(...middleware));

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const routerMiddleware = createRouterMiddleware();

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware];

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    bindMiddleware(middlewares));

  /**
   * next-redux-saga depends on `sagaTask` being attached to the store during `getInitialProps`.
   * It is used to await the rootSaga task before sending results to the client.
   * However, next-redux-wrapper creates two server-side stores per request:
   * One before `getInitialProps` and one before SSR (see issue #62 for details).
   * On the server side, we run rootSaga during `getInitialProps` only:
   */

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  return store;
}
