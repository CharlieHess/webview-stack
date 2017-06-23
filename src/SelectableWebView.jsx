import classNames from 'classnames';
import { omit } from 'lodash';
import React from 'react';

export default class WebViewWrapper extends React.Component {
  componentDidMount() {
    const eventsToLog = [
      'did-start-loading',
      'load-commit',
      'did-get-redirect-request',
      'dom-ready',
      'did-finish-load',
      'did-stop-loading',
      'will-navigate'
    ];

    eventsToLog.forEach((name) => {
      this.webView.addEventListener(name, () => {
        console.log(this.props.src, name);
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isSelected) {
      this.webView.executeJavaScript('document.body.style.visibility = \'hidden\'');
    } else {
      this.webView.executeJavaScript('document.body.style.visibility = \'visible\'');
    }
  }

  render() {
    const className = classNames({
      isSelected: this.props.isSelected
    });

    return (
      <webview
        ref={(webView) => this.webView = webView}
        className={className}
        {...omit(this.props, 'isSelected')}
      />
    );
  }
}