import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './Reducers/allReducers'
import './index.css';

const store = createStore(allReducers);

ReactDOM.render(
<Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);
