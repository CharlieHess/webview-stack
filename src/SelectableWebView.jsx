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

  setVisibility(visible, height, width) {
    return new Promise((resolve) => {
      let code = `document.body.style.visibility = '${visible ? 'visible' : 'hidden'}';`
          code += `c = document.getElementsByClassName('client_channels_list_container')[0];`
          code += `c ? c.style.visibility = 'visible' : null;`

      if (height && width) {
        code += `document.body.style.height = '${height}px';`
        code += `document.body.style.width = '${width}px';`
      }

      this.webView.executeJavaScript(code, resolve);
    })
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isSelected) {
      this.setVisibility(false)
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