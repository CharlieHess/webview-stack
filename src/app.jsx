import React from 'react';
import { ipcRenderer } from 'electron';

const KeyCodes = {
  Esc: 27,
  Zero: 48,
  One: 49,
  Nine: 57,
  V: 86,
  NumOne: 97,
  NumNine: 105,
  Equals: 187,
  Dash: 189
};

function keyCodeInRange({ keyCode }, min, max) {
  return keyCode >= min && keyCode <= max;
}

export default class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    document.body.addEventListener('keydown', (e) => {
      if (e.metaKey) {
        const isNumberKey = keyCodeInRange(e, KeyCodes.One, KeyCodes.Nine);
        const isNumPadKey = keyCodeInRange(e, KeyCodes.NumOne, KeyCodes.NumNine);

        if (isNumberKey || isNumPadKey) {
          e.preventDefault();
          const index = e.keyCode - (isNumberKey ? KeyCodes.One : KeyCodes.NumOne);
          this.selectTeam(index);
        }
      }
    });
  }

  selectTeam(selectedIndex) {
    ipcRenderer.send('team-switch', selectedIndex);
  }

  render() {
    return (
      <div className="root">
        <div className="switcher">
          <input type="button" onClick={this.selectTeam.bind(this, 0)} value="1"/>
          <input type="button" onClick={this.selectTeam.bind(this, 1)} value="2"/>
          <input type="button" onClick={this.selectTeam.bind(this, 2)} value="3"/>
        </div>
      </div>
    );
  }
}
