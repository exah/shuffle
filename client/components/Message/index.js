import React, { Component } from 'react';
import Article from '../Article';
import './index.css';
import OpenGraph from '../OpenGraph';
import Ava from '../Ava';

export default class Message extends Component {
  render() {
    const { attachments, time, nick, avatar, text, status, color, isOurMessage, active } = this.props.message;
    const date = new Date(time);
    const hours = ('00' + String(date.getHours())).slice(-2);
    const minutes = ('00' + String(date.getMinutes())).slice(-2);
    const humanTime = `${hours}:${minutes}`;
    const finalTime = status === 'confirmed' ? humanTime : `${ status }`;
    const messageStyle = isOurMessage ? { color: color } : {};
    const messageClasses = [
      'message',
      `message--${ status }`,
      isOurMessage ? 'message--myself' : '',
      active ? 'message--active' : 'message--leaved',
    ].join(' ');

    return (
      <li className={messageClasses}>
        <ul className="message-meta">
          <li className="message-meta-item">
            {nick}
            {!active && status !== 'preview' ? ' (leaved)' : ''}
          </li>
          <li className="message-meta-item message-meta-status">
            {finalTime}
          </li>
        </ul>
        <div className="message-content">
          <div className="message-content-ava">
            <Ava avatar={avatar} color={color} />
          </div>
          <div className="message-content-text" style={messageStyle}>
            <Article text={text} />
            { attachments === undefined || attachments.length === 0 ? false :
              <div className="attachments">
              { attachments.map((atta, index) =>
                <OpenGraph key={index} meta={atta.meta.data} />) }
              </div>
            }
          </div>
        </div>
      </li>
    );
  }
}

