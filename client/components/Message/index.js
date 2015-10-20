import React, { Component } from 'react';
import MessageBody from '../MessageBody';
import './index.css';
import OpenGraph from '../OpenGraph';
import Ava from '../Ava';

export default class Message extends Component {
  render() {
    const { attachments, time, nick, avatar, text, status, color, isOurMessage } = this.props.message;
    const date = new Date(time);
    const hours = ('00' + String(date.getHours())).slice(-2);
    const minutes = ('00' + String(date.getMinutes())).slice(-2);
    const humanTime = `${hours}:${minutes}`;
    const finalTime = status === 'confirmed' ? humanTime : `${ status }`;
    const ourMessageClass = (isOurMessage) ? 'message--myself' : '';
    const messageClass = `message message--${ status } ${ ourMessageClass }`;

    const messageStyle = (isOurMessage) ? { color: color } : {};

    return (
      // TODO highlight 'myself'
      <li className={messageClass}>
        <div className="message-meta">
          <p className="user-name">{nick}</p>
          <time className="message-time">{finalTime}</time>
        </div>
        <div className="message-content">
          <div className="message-content-ava">
            <Ava avatar={avatar} color={color} />
          </div>
          <div className="message-content-text bubble" style={messageStyle}>
            <MessageBody text={text} />
              <div className="attachments">
            { attachments.map((atta, index) =>
              <OpenGraph key={index} meta={atta.meta.data} />) }
              </div>
          </div>
        </div>
      </li>
    );
  }
}

