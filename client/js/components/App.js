import React, { Component } from 'react';
import { messagesT } from '../propTypes';
import Room from './Room';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Room
          messages={this.props.messages}
          onSend={text => this.props.addMessage(text)}
        />
      </div>
    );
  }
}

App.propTypes = {
  messages: messagesT,
};

