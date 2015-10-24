import React, { Component } from 'react';
import IScroll from 'iscroll';
import './index.css';

export default class extends Component {
  componentDidMount() {
    this.iscroll = new IScroll(this.scrollEl, {
      scrollY: true,
      mouseWheel: true,
      interactiveScrollbars: true,
      scrollbars: 'custom',
    });

    setTimeout(() => {
      this.iscroll.refresh();

      if (this.props.stickToBottom) {
        this.iscroll.scrollTo( 0, this.iscroll.maxScrollY );
      }
    }, 500);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.iscroll.refresh();

      if (this.props.stickToBottom && this.iscroll.y <= this.iscroll.maxScrollY + 400 ) {
        this.iscroll.scrollTo( 0, this.iscroll.maxScrollY );
      }
    }, 0);
  }

  componentWillUnmount() {
    this.iscroll.destroy();
  }

  render() {
    return (
      <div className="ScrollWrapper" ref={ c => this.scrollEl = c }>
        {this.props.children}
      </div>
    );
  }
}
