import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import combineReducers from './reducers/index';

import App from './App';

const store = createStore(combineReducers, applyMiddleware(reduxThunk));

const Root = ({ store }) => {
  console.log(store)
  return (

    <Router>
      <Provider store={store}>
        <Route path="/" component={App} />
      </Provider>
    </Router>
  );
};

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
