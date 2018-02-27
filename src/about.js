import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import Profile from './Profile';
import Property from './Property';
import * as actions from './actions';
import logo from './logo.svg';
import './initial.css';
import { Button, Icon, Header, Image, Modal } from 'semantic-ui-react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Loginscreen from './Loginscreen'
import Navbar from './containers/navbar'
import PropertyDetail from './PropertyDetail';
import NewProperty from './NewProperty';
import Register from './Register';
import Message from './Message';
import EditProperty from './EditProperty';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';

class About extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[],
      open: true
    }
  }

  registerLink = (e)=>{
     e.preventDefault();
     window.location = 'register';}
render() {

return (


          <div class="pusher">


            <div class="ui vertical stripe segment">
              <br/>
              <br/>
              <br/>
              <h1>About Page</h1>
              <img src="logo.png" class="ui medium bordered right aligned image"/>
              <br/>
              <br/>
              <div class="ui center aligned stackable grid container">
                <div class = "ui center aligned inverted container" >
                  <div class="ui tertiary inverted light blue segment">
                    <h3 class="ui centered header">We Help The Little Guy</h3>
                    <p>It is hard starting out as a Landlord. Repairs, contracts, mortgages can all seem a blur; let us take care of all the details so you can focus on you and your tenants.</p>
                  </div>
                  <div class="ui tertiary inverted light blue segment">
                    <h3 class="ui header">Tenants Will Thank You</h3>
                    <p>Instead of chasing tenants to collect their rent, and tenants chasing you for repairs, why not leave that to us. Your tenant will be able to pay you directly online, as well as send repair requests, look at their contracts, and have the property information all through Property Assistant.</p>
                    </div>
                </div>
                <div class="row">
                  <div class="center aligned column">
                    <a onClick={this.registerLink} class="ui huge red button">Check Us Out</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
)
}
}

export default withRouter(connect(null, null)(About))
