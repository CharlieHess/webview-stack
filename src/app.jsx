import React from 'react';
import SelectableWebView from './SelectableWebView';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
  }

  onSelectWebView(selectedIndex) {
    const { clientHeight, clientWidth } = document.getElementsByClassName('webViewHost')[0];
    this[`webView${selectedIndex}`].setVisibility(true, clientHeight, clientWidth)
      .then(() => {
        setTimeout(() => this.setState(() => ({ selectedIndex })), 50)
      })
  }

  render() {
    const webViews = [
      "https://electronhq.slack.com/messages",
      "https://helixcorp.slack.com/messages",
      "https://atomio.slack.com/messages"
    ].map((url, index) => (
      <SelectableWebView
        key={index}
        src={url}
        isSelected={this.state.selectedIndex === index}
        ref={(webView) => this[`webView${index}`] = webView}
      />
    ));

    return (
      <div className="root">
        <div className="webViewHost">
          {webViews}
        </div>

        <div className="switcher">
          <input type="button" onClick={this.onSelectWebView.bind(this, 0)} value="1"/>
          <input type="button" onClick={this.onSelectWebView.bind(this, 1)} value="2"/>
          <input type="button" onClick={this.onSelectWebView.bind(this, 2)} value="3"/>
        </div>
      </div>
    );
  }
}
