import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { SubComponent } from "../_sub-component";

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Hello React!</h2>
        <SubComponent name="Counter" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));