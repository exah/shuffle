import React from 'react';
import { switchToRoom } from '../../smartActions';
import { connect } from 'react-redux';

const JoinRandomRoom = ({ rooms, dispatch }) => (
	rooms !== null && !rooms.length ? false :
	  <article className="article faded">
	    <p><i className="icon iconShuffle"></i></p>
	    <p>
	      <button
	      	type="button"
	        onClick={() => dispatch(switchToRoom(null))}
	        className="btn btn--outline">
	          Join random room
	      </button>
	    </p>
	  </article>
);

export default connect(state => ({ rooms: state.topRooms }) )(JoinRandomRoom);
