import { connect } from 'react-redux';
import React, { Component } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { sendMessage } from '../../smartActions';
import { roomInputChange, togglePreview } from '../../actions';
import { EMOJI_REGEX, EMOJI_URL, EMOJI_IMAGES } from '../../../common/emoji';
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

const fakeData = [
  {
    id: 'exah',
    display: 'exah',
  },
  {
    id: '+1',
    display: '+1',
  },
  {
    id: 'john',
    display: 'john',
  },
];

class RoomInput extends Component {
  // componentDidUpdate() {
  //   const textarea = this.refs.textarea;
  //   textarea.style.height = '';
  //   textarea.style.height = `${ textarea.scrollHeight }px`;
  // }

  render() {
    const { dispatch, text, buttonEnabled, previewCollapsed } = this.props;
    return (
      <form className="room-actions"
        onSubmit={e => onClick(e, () => dispatch(sendMessage()))}>
        <MentionsInput
          className="room-actions-input"
          placeholder="Message..."
          style={{'flex': '1'}}
          onChange={e => dispatch(roomInputChange(e.target.value))}
          onKeyPress={e => onKeyPress(e, () => dispatch(sendMessage()))}
          rows="1"
          markup={'**@__id__**'}
          displayTransform={ (id, display, type) => (`@${ id }`) }
          value={text}>
          <Mention
            trigger="@"
            type="user"
            data={fakeData}
            renderSuggestion={ (id) => (`@${ id }`) } />

          <Mention
            trigger=":"
            type="emoji"
            data={fakeData}
            renderSuggestion={ (id) => (`![](${ EMOJI_URL }/${ id })`) } />
        </MentionsInput>
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
