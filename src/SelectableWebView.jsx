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

  componentDidMount() {
    this.webView.addEventListener('did-start-loading', () => {
      console.log(this.props.src, 'is loading');
      this.setState(() => ({ isLoading: true }));
    });

    this.webView.addEventListener('did-stop-loading', () => {
      console.log(this.props.src, 'stopped loading');
      this.setState(() => ({ isLoading: false }));
    });
  }

  executeJavaScript(code) {
    if (!this.webView || !this.webView.executeJavaScript) return;

    this.setState(() => ({ isLoading: true }));
    this.webView.executeJavaScript(code, () => {
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