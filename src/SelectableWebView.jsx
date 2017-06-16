import classNames from 'classnames';
import { omit } from 'lodash';
import React from 'react';

export default class WebViewWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSelected !== prevProps.isSelected) this.forceUpdate();
  }

  componentDidMount() {
    this.webView.addEventListener('did-start-loading', () => {
      this.setState(() => ({ isLoading: true }));
    });

    this.webView.addEventListener('did-stop-loading', () => {
      this.setState(() => ({ isLoading: false }));
    });
  }

  render() {
    const isLoading = this.state.isLoading;
    const style = {
      visibility: this.props.isSelected || isLoading ? 'visible' : 'hidden'
    };

    const className = classNames({
      isSelected: this.props.isSelected
    });

    return (
      <webview
        ref={(webView) => this.webView = webView}
        style={style}
        className={className}
        {...omit(this.props, 'isSelected')}
      />
    );
  }
}