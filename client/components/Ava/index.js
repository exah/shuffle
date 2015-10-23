import React from 'react';
import './index.css';

export default ({ color, avatar }) => (
	<div
	  className="ava"
	  style={{backgroundColor: `${ color }`}}>
	  { avatar === '' ? false :
	  	<img className="ava-icon" src={ avatar } alt=""/>
		}
	</div>
);
