import { connect } from 'react-redux';
import React, { Component } from 'react';
import RoomHeader from '../RoomHeader';
import MessageList from '../MessageList';
import RoomInput from '../RoomInput';
import ScrollWrapper from '../ScrollWrapper';
import './index.css';

class Room extends Component {
  render() {
    const { room, showPreview, inputText } = this.props;
    const { orderedMessages, roomMessages, roomUsers } = room;

    const ourUserID = room.userID;
    const {nick: ourNick, avatar: ourAvatar, color: ourColor } = room.roomUsers[ourUserID];

    const messages = orderedMessages.map(messageID => {
      const { text, time, userID,
              status, attachments } = roomMessages[messageID];
      const user = roomUsers[userID];
      const { nick, avatar, active } = user ? user : {
        nick: nick,
        avatar: avatar,
        color: '',
        active: false,
      };
      const color =  user && user.color ? roomUsers[userID].color : '';
      const isOurMessage = (ourUserID === userID);

      return {
        text,
        time,
        nick,
        isOurMessage,
        avatar,
        status,
        color,
        active,
        attachments,
      };
    });

    const previewMessage = {
      text: inputText,
      time: null,
      nick: ourNick,
      avatar: ourAvatar,
      color: ourColor,
      status: 'preview',
      attachments: [],
    };

    return (
      <div className="room">
        <RoomHeader room={room} />
        <div className="room-messages">
          <ScrollWrapper stickToBottom="true" switcher={room.roomName}>
            <MessageList messages={messages}
              previewMessage={previewMessage}
              showPreview={showPreview} />
          </ScrollWrapper>
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

