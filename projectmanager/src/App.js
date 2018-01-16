import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import Profile from './Profile';
import * as actions from './actions';
import logo from './logo.svg';
import './App.css';
import { Button, Icon } from 'semantic-ui-react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Loginscreen from './Loginscreen'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }

  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <h2>Welcome to the App, you can not do anything unless you login</h2>
        <ul>
          <li>
            {this.props.loggedIn ? (
              <a
                onClick={e => {
                  e.preventDefault();
                  this.props.logoutUser();
                }}
              >
                Sign Out
              </a>
            ) : (
              <Link to="/login">Go to Login</Link>
            )}
          </li>
          <li>
            <Link to="/profile">Go to Profile</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>

        <div>

        </div>

      </div>
    );
  }
}
const style = {
  margin: 15,
};


const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
});
export default connect(mapStateToProps, actions)(App);
