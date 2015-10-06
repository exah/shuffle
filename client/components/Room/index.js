import { connect } from 'react-redux';
import React, { Component } from 'react';
import RoomHeader from '../RoomHeader';
import MessageList from '../MessageList';
import Message from '../Message';
import RoomInput from '../RoomInput';
import './index.scss';

class Room extends Component {
  render() {
    const { room, showPreview, inputText } = this.props;
    const { orderedMessages, roomMessages, roomUsers } = room;
    const messages = orderedMessages.map(messageID => {
      const { text, time, userID, status } = roomMessages[messageID];
      const { nick, avatar } = roomUsers[userID];
      return {
        text,
        time,
        nick,
        avatar,
        status,
      };
    });

    const ourUserID = room.userID;
    const {nick: ourNick, avatar: ourAvatar} = room.roomUsers[ourUserID];

    const previewMessage = {
      text: inputText,
      time: null,
      nick: ourNick,
      avatar: ourAvatar,
      status: 'preview',
    };

    return (
      <div className="room">
        <RoomHeader room={room} />
        <div className="room-messages">
          {!showPreview ? '' :
            <div>
              <hr/>
              <Message message={previewMessage} />
            </div>
          }
          <MessageList messages={messages} />
        </div>
        <RoomInput />
      </div>
    );
  }
}

export default connect(state => {
  const inputText = state.ui.roomInputText;
  const { previewCollapsed } = state.ui;
  return {
    showPreview: !!inputText && !previewCollapsed,
    inputText,
  };
})(Room);

