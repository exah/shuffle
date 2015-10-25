import React from 'react';
import Navigation from '../Navigation';
import Welcome from '../Splashes/Welcome';
import './index.css';

export default ({ children, history }) => (
  <div className="app">
    <Navigation history={history} />
    {children ? children : <Welcome/>}
  </div>
);
