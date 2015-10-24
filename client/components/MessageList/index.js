import React from 'react';
import Message from '../Message';
import './index.css';

export default ({ messages, previewMessage, showPreview }) => (
  <ul className="messages">
    {messages.map((message, index) =>
      <Message
        message={message}
        key={index}
      />
    )}
    {!showPreview ? false :
      <Message message={previewMessage} />
    }
  </ul>
);

