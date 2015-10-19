import { connect } from 'react-redux';
import React, { Component } from 'react';
import { sendMessage } from '../../smartActions';
import { roomInputChange, togglePreview } from '../../actions';
import { EMOJI_URL, EMOJI_IMAGES } from '../../../common/emoji';
import $ from 'jquery';
import 'jquery-textcomplete';
import './index.css';

function onKeyPress(e, handler) {
  if (e.which === 13 && !e.shiftKey) {
    e.preventDefault();
    handler();
  }

  const roomMessages = document.getElementById('roomMessages');
  if (roomMessages !== null) {
    roomMessages.scrollTop = roomMessages.scrollHeight;
  }
}

function onClick(e, handler) {
  e.preventDefault();
  handler();
}

class RoomInput extends Component {
  componentDidMount() {
    const textarea = this.refs.textarea;
    $(textarea).textcomplete([{ // emoji strategy
      match: /\B:([\-+\w]*)$/,
      search: (term, callback) => {
        callback(EMOJI_IMAGES.filter(emoji => emoji.indexOf(term) === 0 ? emoji : null));
      },
      template: (value) => `<img src="${ EMOJI_URL }/${ value }.png" /> ${ value }`,
      replace: (value) => `:${ value }: `,
      index: 1,
    }]).on('textComplete:select', () => this.props.dispatch(roomInputChange(textarea.value)));
  }

  componentDidUpdate() {
    const textarea = this.refs.textarea;
    textarea.style.height = '';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  render() {
    const { dispatch, text, buttonEnabled, previewCollapsed } = this.props;
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
          value={text}
        ></textarea>
        <button
          className={`btn ${ previewCollapsed ? 'is-off' : ''}`}
          onClick={e => onClick(e, () => dispatch(togglePreview()))}
        > Preview </button>
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
  const { previewCollapsed } = state.ui;

  return {
    buttonEnabled: !!text,
    previewCollapsed,
    text,
  };
})(RoomInput);
