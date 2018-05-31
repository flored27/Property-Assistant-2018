import React, { Component } from 'react';
import { Link, Switch, Route, Router } from 'react-router-dom';
import history from './history'
import { connect } from 'react-redux';
import Login from './Login';
import Profile from './Profile';
import Property from './Property';
import * as actions from './actions';


import Loginscreen from './Loginscreen'
import PropertyDetail from './PropertyDetail';
import NewProperty from './NewProperty';
import Register from './Register';
import Message from './Message';
import EditProperty from './EditProperty';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Initial from './Initial';
import About from './about';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[],
      open: false
    }
  }

  handleFetchUser = () =>{
    this.props.fetchUser();
  }

  handleClick = (event) =>{
    event.preventDefault();
    console.log(this.state)
   this.props.loginUser(this.state.email, this.state.password).then(()=>history.push("/profile"));
   this.setState({
     loginPage: []
   })
 }

  registerLink = (e)=>{
     e.preventDefault();
     window.location = '/register';}
     // This is a reference to the path of register:
     // //register, so that the Login/Register onclick goes to register,
     // and it works with githubpages due to the need of  in front of path

  handleOpen = () => {
     this.setState({open: true});
     };

  handleClose = () => {
     this.setState({open: false});
     };

  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }

  render() {

    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        ];

    return (
      <Router history={history}>
      <div className="App">
        <div id="navbar" class="ui fixed sticky blue inverted menu">
          <div class="item">
          <img class="ui mini circular image" src="logo2.png"/>
                <Link to="/Property-Assistant-2018">Home</Link>



          </div>
          <div class="item">
            {this.props.loggedIn ? (
                <Link to="/Property-Assistant-2018/contact">Contact</Link>
            ) : (
              ""
            )}
          </div>
          <div class="item">
            {this.props.loggedIn ? (
                <Link to="/Property-Assistant-2018/properties">Properties</Link>
            ) : (
              ""
            )}
          </div>
          <div class="right menu">
          <div class="ui item">
            {this.props.loggedIn ? (
                <Link to="/profile">Profile</Link>
            ) : (
              ""
            )}
          </div>
            <div class="ui item">
            {this.props.loggedIn ? (
              <div
                onClick={e => {
                  e.preventDefault();
                  this.props.logoutUser();
                }}
              >
                <Button>
                <Link to="/Property-Assistant-2018">Sign Out</Link>
                </Button>
              </div>
            ) : (
              <div>
                <MuiThemeProvider>
                <div>
               <RaisedButton label="Login" onClick={this.handleOpen} />
               <Dialog
                 contentStyle={{maxWidth: 305}}
                 title="Login"
                 actions={actions}
                 modal={true}
                 open={this.state.open}
               >
               <TextField
                 hintText="Enter your Email"
                 floatingLabelText="Email"

                 onChange = {(event,newValue) => this.setState({email:newValue})}
                 />
               <br/>
                 <TextField
                   type="password"
                   hintText="Enter your Password"
                   floatingLabelText="Password"
                   onChange = {(event,newValue) => this.setState({password:newValue})}
                   />
                 <br/>
                 <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                 <RaisedButton label="Register" style={style} primary={true} onClick={this.registerLink}/>
               </Dialog>
             </div>
             </MuiThemeProvider>
          </div>
            )}
            </div>
          </div>
        </div>



        <Switch>
          <Route path="/Property-Assistant-2018/profile" component={Profile} />
            <Route path="/loginscreen" component={Loginscreen} />
            <Route path="/login" component={Login} />
            <Route path="/Property-Assistant-2018/properties" component={Property} />
            <Route path="/Property-Assistant-2018/detail/:id" render={(props)=><PropertyDetail{...props}/>} />
            <Route path="/Property-Assistant-2018/new_property" component={NewProperty} />
            <Route path="/Property-Assistant-2018/register" component={Register} />
            <Route path="/Property-Assistant-2018/contact" component={Message} />
            <Route path="/Property-Assistant-2018/edit_property/:id" render={(props)=><EditProperty{...props}/>}/>
            <Route path="/Property-Assistant-2018" component={Initial} />

          </Switch>

      </div>
      </Router>
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
