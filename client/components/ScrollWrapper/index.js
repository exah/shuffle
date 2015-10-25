import React, { Component } from 'react';
import IScroll from 'iscroll';
import { IF_TOUCH } from '../../utils';
import './index.css';

export default class extends Component {
  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.switcher !== this.props.switcher) {
      this.destroy();
      this.init();
    } else {
      this.refresh();
    }
  }

  componentWillUnmount() {
    this.destroy();
  }

  init() {
    this.iscroll = new IScroll(this.scrollEl, {
      scrollY: true,
      mouseWheel: true,
      interactiveScrollbars: true,
      scrollbars: 'custom',
      click: true,
      tap: true,
      startX: this.scrollEl.scrollHeight + this.scrollEl.clientHeight,
      preventDefault: IF_TOUCH,
    });

    this.refresh(200);
  }

  refresh(timeout: 0, offset: 400) {
    setTimeout(() => {
      this.iscroll.refresh();

      if (this.props.stickToBottom &&
          this.iscroll.y === 0 ||
          this.iscroll.y <= this.iscroll.maxScrollY + offset ) {
        this.iscroll.scrollTo( 0, this.iscroll.maxScrollY );
      }
    }, timeout);
  }

  destroy() {
    this.iscroll.destroy();
    this.iscroll = null;
  }

  render() {
    return (
      <div className="ScrollWrapper" ref={ c => this.scrollEl = c }>
        {this.props.children}
      </div>
    );
  }
}
