import { connect } from 'react-redux';
import React from 'react';
import { joinRoom } from '../../smartActions';
import { handleEvents } from '../../utils';
import Room from '../Room';

const Door = ({ roomLoading, roomLoaded, room, roomID, dispatch }) => {
  if (roomLoaded) {
    return <Room room={room} />;
  } else if (roomLoading) {
    return ( <div className="splash">
      <article className="article">
        <h1>Loading...</h1>
        <h2>Joining #{roomID}</h2>

        <div className="loader" style={{ 'marginTop': '2em' }}>
          <div className="loader-item"></div>
          <div className="loader-item"></div>
          <div className="loader-item"></div>
        </div>
      </article>
    </div> );
  }
  return ( <div className="splash">
      <article className="article">
        <h1>You have left this room.</h1>
        <p className="faded">
          <span className="btn btn--outline"
              onClick={e => handleEvents(e, () =>
                dispatch(joinRoom({ roomID })))}
              title={name}>
              Rejoin #{roomID}
          </span>
        </p>
      </article>
    </div> );
};

export default connect(state => {
  const { roomID } = state.router.params;
  const room = state.joinedRooms[roomID];
  const roomLoading = state.joiningRooms[roomID];
  const roomLoaded = !!room;
  return {
    roomLoading,
    roomLoaded,
    room,
    roomID,
  };
})(Door);

