import React, { Component } from 'react';
import logo from './logo.svg';
// import DND from './component/dndSorter';
// import changeNum2Str from './component/alg/1';
import './App.css';
import ContextComponent from './component/context';

// changeNum2Str();

class App extends Component {
  componentDidMount() {
      // import('./component/redux/index0');
      import('./component/redux/index0');
  }
  render() {
    return (
      <div className="App">
          <div id='hello'>hello world</div>
      </div>
    );
  }
}

export default App;
