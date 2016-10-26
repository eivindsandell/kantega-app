import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './Reducers/allReducers'
import './index.css';
import Thunk from 'redux-thunk'

const store = createStore(allReducers, applyMiddleware(Thunk));

ReactDOM.render(
<Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);
