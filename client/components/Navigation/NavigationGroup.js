import React from 'react';
import { switchToRoom, leaveRoom } from '../../smartActions';

function onClick(e, handler) {
  e.preventDefault();
  handler();
}

export default ({ label, rooms, dispatch, currentRoom, isJoined }) => (
  <div className="navigation-group">
    <h4 className="navigation-group-label"> { label } </h4>
    <ul className="navigation-group-list">
    {_.map(rooms, ({roomID, name, users}, index) =>
      <li
        key={index}
        className={`navigation-group-list-item
          ${ currentRoom === roomID ? 'navigation-group-list-item--active' : '' }`}>

        <a
          href={`/room/${roomID}`}
          onClick={e => onClick(e, () => dispatch(switchToRoom(history, roomID)))}
          title={name}>
            {`#${roomID}`}
        </a>

        { isJoined ?
          (<button
            className="reset-input"
            onClick={() => dispatch(leaveRoom(history, roomID))}>
              x
          </button>) :
          <span className="badge">{users}</span>
        }
      </li>
    )}
    </ul>
  </div>
);
