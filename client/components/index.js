import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ReduxRouter } from 'redux-router';

import './index.css';
import App from './App';
import Door from './Door';
import NotFound from './Splashes/NotFound';

const Main = ({ store }) => (
  <Provider store={store}>
    <ReduxRouter>
      <Route path="/" component={App}>
        <Route path="/room/:roomID" component={Door}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </ReduxRouter>
  </Provider>
);
const rootElement = document.getElementById('content');

export default (store) => render( <Main store={store} />, rootElement );
