import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {createStore} from 'redux';
import reducer from './Store/Reducers/reducer';
import { Provider } from 'react-redux';

axios.defaults.baseURL = 'https://api.github.com';

const store = createStore(reducer);

const app = (
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app,  document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
