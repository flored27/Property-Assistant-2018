import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';
import * as actions from './actions';
class Login extends Component {
constructor(props){
  super(props);
  this.state={
  email:'',
  password:''
  }
}

  handleClick = (event) =>{
   var self = this;
   var apiBaseUrl = "http://localhost:3000/login/";
   console.log(this.state)
   fetch(apiBaseUrl, {
     method: 'POST',
     headers: {
       "Content-Type": "application/json",
       Accept: "application/json"
     },
     body: JSON.stringify(this.state)
   })
   .then(data=>data.json())
   .then(data=>console.log(data))
  //  .then(response=>function(response){
  //  return console.log(response);
  //  if(response.data.code === 200){
  //  console.log("Login successfull");
  //  var uploadScreen=[];
  //  uploadScreen.push(<uploadScreen appContext={self.props.appContext}/>)
  //  self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
  //  }
  //  else if(response.data.code === 204){
  //  console.log("Username password do not match");
  //  alert("username password do not match")
  //  }
  //  else{
  //  console.log("Username does not exists");
  //  alert("Username does not exist");
  //  }
  //  })
  //  .catch(function (error) {
  //  console.log(error);
  //  });
   }


render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
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
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;
