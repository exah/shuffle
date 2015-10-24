import { connect } from 'react-redux';
import { toggleNavigation } from '../../actions';
import React, { Component } from 'react';
import Ava from '../Ava';
import './index.css';

class RoomHeader extends Component {
  render() {
    const { dispatch, navigationCollapsed, room } = this.props;
    const { roomName } = room;
    const { nick, avatar, color } = room.roomUsers[room.userID] || {}; // TODO fix it

    return (
      <header className="room-header">
        <ul className="room-header-bar"
            onClick={() => dispatch(toggleNavigation())}>
          <li className="room-header-bar-item">
            <i className={`icon iconNav ${ navigationCollapsed ? 'is-hidden' : ''}`}>
              <b className="iconNav-line"></b>
              <b className="iconNav-line"></b>
              <b className="iconNav-line"></b>
            </i>
          </li>
          <li className="room-header-bar-item">
            <h4 className="room-name">#{roomName}</h4>
          </li>
        </ul>
        <ul className="room-header-bar">
          <li className="room-header-bar-item">
            <h4 className="cut-text">{nick}</h4>
          </li>
          <li className="room-header-bar-item">
            <Ava avatar={avatar} color={color} />
          </li>
        </ul>
      </header>
    );
  }
}

export default connect(state => {
  const { navigationCollapsed } = state.ui;
  return {
    navigationCollapsed,
  };
})(RoomHeader);

