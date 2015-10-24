import { connect } from 'react-redux';
import React, { Component } from 'react';
import { switchToRoom, leaveRoom,
         createRoom, searchInputChange } from '../../smartActions';
import ScrollWrapper from '../ScrollWrapper';
import './index.css';
import _ from 'lodash';

function onClick(e, handler) {
  e.preventDefault();
  handler();
}

class Navigation extends Component {
  render() {
    const { dispatch, collapsed, routerRoomID, shouldShowCreation,
            joinedRooms, topRooms, searchResults, searchText, history } = this.props;
    return (
      <nav className={
        collapsed ?
        'navigation is-collapsed' :
        'navigation'
      }>
        <ScrollWrapper trigger={ this.props }><div className="navigation_wrapper">
          <div className="navigation-group">
            <input
              onChange={e => dispatch(searchInputChange(e.target.value))}
              value={searchText}
              type="text"
              className="input--underline"
              placeholder="# Find / Create new" />
          </div>
          {!shouldShowCreation ? false :
            <div className="navigation-group">
              <h4 className="navigation-group-label"> Create Room </h4>
              <ul className="navigation-group-list">
                <li className="navigation-group-list-item">
                  <a href={`/room/${searchText}`}
                    onClick={e => onClick(e, () =>
                      dispatch(createRoom(history, searchText)))}>
                      {`#${searchText}`}
                  </a>
                </li>
              </ul>
            </div>
          }
          {!searchResults || !searchResults.length ? false :
            <div className="navigation-group">
              <h4 className="navigation-group-label"> Search Results </h4>
              <ul className="navigation-group-list">
                {_.map(searchResults, ({roomID, name, rating, users}, index) =>
                  <li key={index} className="navigation-group-list-item">
                    <a href={`/room/${roomID}`}
                      onClick={e => onClick(e, () =>
                        dispatch(switchToRoom(history, roomID)))}
                      title={name}>
                        {`#${roomID}`}
                    </a>
                    <span className="badge">{users}</span>
                  </li>
                )}
              </ul>
            </div>
          }
          { _.isEmpty(joinedRooms) || searchResults ? false :
           <div className="navigation-group">
              <h4 className="navigation-group-label"> Joined </h4>
              <ul className="navigation-group-list">
                {_.map(joinedRooms, ({roomName: name}, roomID) =>
                    <li
                      key={roomID}
                      className={roomID === routerRoomID ? 'navigation-group-list-item navigation-group-list-item--active' : 'navigation-group-list-item'}>
                    <a href={`/room/${roomID}`}
                      onClick={e => onClick(e, () =>
                        dispatch(switchToRoom(history, roomID)))}
                      title={name}>
                        {`#${roomID}`}
                    </a>
                    <button
                      className="reset-input"
                      onClick={() => dispatch(leaveRoom(history, roomID))}>
                        x
                    </button>
                  </li>
                )}
              </ul>
            </div>
          }
          {searchResults ? false :
            <div className="navigation-group">
              <h4 className="navigation-group-label"> Top Channels </h4>
              <ul className="navigation-group-list">
                {_.map(topRooms, ({name, users, roomID}, index) =>
                  <li key={index} className="navigation-group-list-item">
                    <a href={`/room/${roomID}`}
                      onClick={e => onClick(e, () =>
                        dispatch(switchToRoom(history, roomID)))}
                      title={name}>
                        {`#${roomID}`}
                    </a>
                    <span className="badge">{users}</span>
                  </li>
                )}
              </ul>
            </div>
          }
        </div></ScrollWrapper>
      </nav>
    );
  }
}

export default connect(state => {
  const collapsed = state.ui.navigationCollapsed;
  const { topRooms, joinedRooms } = state;
  const searchResults = state.ui.searchResults;
  const searchText = state.ui.searchInputText;
  const routerRoomID = state.router.params.roomID;
  const shouldShowCreation =
    searchText.length > 0 &&
    searchResults &&
    !(
      searchResults[0] &&
      searchText === searchResults[0].roomID
    );

  return {
    collapsed,
    topRooms,
    joinedRooms,
    searchResults,
    searchText,
    routerRoomID,
    shouldShowCreation,
  };
})(Navigation);

