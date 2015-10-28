import { connect } from 'react-redux';
import React from 'react';
import { createRoom, searchInputChange } from '../../smartActions';
import ScrollWrapper from '../ScrollWrapper';
import NavigationGroup from './NavigationGroup';
import { handleEvents } from '../../utils';
import './index.css';
import _ from 'lodash';

const Navigation = ({
  dispatch, collapsed, routerRoomID: currentRoom, joinedRooms,
  topRooms, searchResults, searchText, history }) => {
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
              className="input--underline longword"
              placeholder="# Find / Create new" />
          </div>
          {!shouldShowCreation ? false :
            <div className="navigation-group">
              <h4 className="navigation-group-label"> Create Room </h4>
              <ul className="navigation-group-list">
                <li className="navigation-group-list-item">
                  <a
                    href={`/room/${searchText}`}
                    className="longword"
                    onClick={e => handleEvents(e, () =>
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
              history={history}
              label="Search Results" />
          }
          { _.isEmpty(userRooms) || searchResults ? false :
            <NavigationGroup
              rooms={userRooms}
              history={history}
              isJoined="true"
              currentRoom={currentRoom}
              label="Joined" />
          }

          {searchResults || topRooms !== null && !topRooms.length ? false :
            <NavigationGroup
              rooms={topRooms}
              history={history}
              label="Top Rooms" />
          }

        </div></ScrollWrapper>
      </nav>
    );
  };

export default connect(state => {
  const collapsed = state.ui.navigationCollapsed;
  const { topRooms, joinedRooms } = state;
  const searchResults = state.ui.searchResults;
  const searchText = state.ui.searchInputText;
  const routerRoomID = state.router.params.roomID;

  return {
    collapsed,
    topRooms,
    searchResults,
    searchText,
    joinedRooms,
    routerRoomID,
  };
})(Navigation);

