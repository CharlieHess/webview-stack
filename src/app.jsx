import React from 'react';
import WebView from 'react-electron-web-view';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
  }

  onSelectWebView(selectedIndex) {
    this.setState(() => ({ selectedIndex }));
  }

  renderWebView(url, index) {
    const isSelected = this.state.selectedIndex === index;
    const className = {
      zIndex: isSelected ? 99 : index,
      visibility: isSelected ? 'visible' : 'hidden'
    };
    return <WebView src={url} style={className}/>
  }

  render() {
    const webViews = [
      "https://www.google.com",
      "https://www.github.com",
      "https://www.atom.io"
    ].map((url, index) => this.renderWebView(url, index));

    return (
      <div className="root">
        <div className="webViewHost">
          {webViews}
        </div>

        <div className="switcher">
          <input type="button" onClick={this.onSelectWebView.bind(this, 0)} value="Switch to 1"/>
          <input type="button" onClick={this.onSelectWebView.bind(this, 1)} value="Switch to 2"/>
          <input type="button" onClick={this.onSelectWebView.bind(this, 2)} value="Switch to 3"/>
        </div>
      </div>
    );
  }
}
