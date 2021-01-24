import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store = {store}> 
  {/* The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function */}
    <HashRouter> 
     {/* BrowserRouter has to be placed for routing to work. Here in BrowserRouter you can give baseName also, in this case basename is just '/'. Since github doesnt support BrowserRouter we use HashRouter */}
      <App />
    </HashRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// ReactDOM.render(
//   <React.StrictMode>
//     {app}
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
