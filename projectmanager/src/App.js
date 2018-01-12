import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Icon } from 'semantic-ui-react'



class App extends Component {


  render() {

    const ButtonExampleLabeledIcon = () => (
      <div>
        <Button icon labelPosition='left'>
          <Icon name='pause' />
          Pause
        </Button>
        <Button icon labelPosition='right'>
          Next
          <Icon name='right arrow' />
        </Button>
      </div>
    )

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ButtonExampleLabeledIcon />
      </div>
    );
  }
}

export default App;
