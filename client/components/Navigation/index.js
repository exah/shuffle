import { connect } from 'react-redux';
import React, { Component } from 'react';
import { createRoom, searchInputChange } from '../../smartActions';
import ScrollWrapper from '../ScrollWrapper';
import NavigationGroup from './NavigationGroup';
import './index.css';
import _ from 'lodash';

function onClick(e, handler) {
  e.preventDefault();
  handler();
}

class Navigation extends Component {
  render() {
    const { dispatch, collapsed, routerRoomID: currentRoom, shouldShowCreation,
            userRooms, topRooms, searchResults, searchText, history } = this.props;

    const navigationClasses = [
      'navigation',
      collapsed ? 'navigation--collapsed' : null,
      currentRoom ? 'navigation--inRoom' : null,
    ].join(' ');

    return (
      <nav className={navigationClasses}>
        <ScrollWrapper><div className="navigation_wrapper">
          { topRooms === null || !!topRooms.length ? false :
            <div className="navigation-message">
              <p>Hey, you! Create first room</p>
            </div>
          }

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
            <NavigationGroup
              rooms={searchResults}
              dispatch={dispatch}
              label="Search Results" />
          }
          { _.isEmpty(userRooms) || searchResults ? false :
            <NavigationGroup
              rooms={userRooms}
              dispatch={dispatch}
              isJoined="true"
              currentRoom={currentRoom}
              label="Joined" />
          }

          {searchResults || topRooms !== null && !topRooms.length ? false :
            <NavigationGroup
              rooms={topRooms}
              dispatch={dispatch}
              label="Top Rooms" />
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

  const userRooms = _.map(joinedRooms, ({ roomName: name, roomUsers }, roomID) => {
    return {
      name: name,
      roomID: roomID,
      users: _.size(roomUsers),
    };
  });

  return {
    collapsed,
    topRooms,
    searchResults,
    searchText,
    userRooms,
    routerRoomID,
    shouldShowCreation,
  };
})(Navigation);

