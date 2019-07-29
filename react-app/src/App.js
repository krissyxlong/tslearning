import React, { Component } from 'react';
import logo from './logo.svg';
// import DND from './component/dndSorter';
// import changeNum2Str from './component/alg/1';
import './App.css';
import ContextComponent from './component/context';

// changeNum2Str();

class App extends Component {
  componentDidMount() {
      import('./component/redux');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
            <div id='hello'></div>
          {/*<DND />*/}
          <ContextComponent />
        </header>
      </div>
    );
  }
}

export default App;
