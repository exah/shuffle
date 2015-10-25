import React from 'react';
import JoinRandomRoom from './JoinRandomRoom';
import './index.css';

export default () => (
  <div className="splash">
    <article className="article">
      <h1 className="giga">Welcome</h1>
      <h2>Make yourself at home</h2>
      <p>Join a room and find your new identity.</p>
    </article>
    <JoinRandomRoom />
  </div>
);
