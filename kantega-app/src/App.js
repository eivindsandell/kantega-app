import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Status from './Status/status'
import Search from './Content/search'




class App extends Component {
  render() {
    return (
      <div className="App">
		<Search />
		<p>________________________________________________________________________________</p>
        <Status />
      </div>
    );
  }
}

export default App;
