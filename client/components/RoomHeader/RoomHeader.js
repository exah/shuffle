import { toggleNavigation } from '../../actions';
import React, { Component } from 'react';
import './RoomHeader.scss';

class RoomHeader extends Component {
  render() {
    const { dispatch, navigationCollapsed, currentRoomID, nick } = this.props;

    return (
      <header className="room-header">
        <ul className="room-header-bar"
            onClick={() => dispatch(toggleNavigation())} />
          <li className="room-header-bar-item">
            <i className={navigationCollapsed ? 'iconNav' : 'iconNav is-hidden'}>
              <b className="iconNav-line"></b>
              <b className="iconNav-line"></b>
              <b className="iconNav-line"></b>
            </i>
          </li>
          <li className="room-header-bar-item">
            <h3 className="room-name">
              <a href={`#!/room/#${currentRoomID}`}">
                {`#${currentRoomID}`}
              </a>
            </h3>
          </li>
        </ul>
        <ul className="room-header-bar">
          <li>
            <h4 className="user-name">
              {nick}
            </h4>
          </li>
            <li>
              <div
                className="user-ava ava"
                style={{
                  backgroundImage: `url( ${ this.props.login.avatar } )`
                }}>
              </div>
            </li>
          </ul>
      </header>
    );
  }
}

export default connect(state => {
  const { navigationCollapsed, currentRoomID } = state.ui;
  const nick = state.joinedRooms[state.currentRoomID].nick;
  return {
    navigationCollapsed,
    currentRoomID,
    nick,
  };
})(RoomHeader);

