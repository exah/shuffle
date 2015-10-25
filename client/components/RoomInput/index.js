import { connect } from 'react-redux';
import React, { Component } from 'react';
import { sendMessage } from '../../smartActions';
import { roomInputChange } from '../../actions';
import showSuggestion, { destroySuggestion } from './Suggestion';

function onKeyPress(e, handler) {
  if (e.which === 13 && !e.shiftKey) {
    e.preventDefault();
    handler();
  }
}

function onClick(e, handler) {
  e.preventDefault();
  handler();
}

class RoomInput extends Component {
  componentDidMount() {
    showSuggestion(this.refs.textarea, this.props.dispatch);
  }

  componentDidUpdate() {
    const textarea = this.refs.textarea;
    textarea.style.height = '';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  componentWillUnmount() {
    destroySuggestion(this.refs.textarea);
  }

  render() {
    const { dispatch, text, buttonEnabled } = this.props;
    return (
      <form className="room-actions"
        onSubmit={e => onClick(e, () => dispatch(sendMessage()))}>
        <textarea
          type="text"
          ref="textarea"
          placeholder="Message..."
          className="room-actions-input input"
          onChange={e => dispatch(roomInputChange(e.target.value))}
          onKeyPress={e => onKeyPress(e, () => dispatch(sendMessage()))}
          rows="1"
          value={text} />
        <button
          className="room-actions-send btn"
          type="submit"
          ref="submitBtn"
          disabled={!buttonEnabled}
        > Send </button>
      </form>
    );
  }
}

export default connect(state => {
  const text = state.ui.roomInputText;

  return {
    buttonEnabled: !!text,
    text,
  };
})(RoomInput);
