import { connect } from 'react-redux';
import React, { Component } from 'react';
import IScroll from 'iscroll';
import RoomHeader from '../RoomHeader';
import MessageList from '../MessageList';
import RoomInput from '../RoomInput';
import './index.css';

class Room extends Component {
  componentDidMount() {
    const roomMessages = this.refs.roomMessages;

    this.iscroll = new IScroll(roomMessages, {
      scrollbars: true,
      scrollY: true,
      mouseWheel: true,
      interactiveScrollbars: true,
//      scrollbars: 'custom',
    });

    this.iscroll.scrollTo( 0, this.iscroll.maxScrollY );
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.iscroll.refresh();

      if ( this.iscroll.y <= this.iscroll.maxScrollY + 400 ) {
        this.iscroll.scrollTo( 0, this.iscroll.maxScrollY );
      }
    }, 0);
  }

  render() {
    const { room, showPreview, inputText } = this.props;
    const { orderedMessages, roomMessages, roomUsers } = room;

    const ourUserID = room.userID;
    const {nick: ourNick, avatar: ourAvatar, color: ourColor } = room.roomUsers[ourUserID];

    const messages = orderedMessages.map(messageID => {
      const { text, time, userID,
              status, attachments } = roomMessages[messageID];
      const user = roomUsers[userID];
      const { nick, avatar } = user ? user : {
        nick: 'Leaved user',
        avatar: '',
        color: '',
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
        <div className="room-messages" id="roomMessages" ref="roomMessages">
          <MessageList messages={messages}
            previewMessage={previewMessage}
            showPreview={showPreview} />
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

