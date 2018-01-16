import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';
import {bindActionCreators } from 'redux';
import * as actions from './actions/index';
import {loginUser} from './actions/index';
import {fetchUser} from './actions/index';
import {store} from './index'
class Login extends Component {
constructor(props){
  super(props);
  this.state={
  email:'',
  password:''
  }
}

  handleFetchUser = () =>{
    this.props.fetchUser();
  }

  handleClick = (event) =>{
    event.preventDefault();
    console.log(this.state)
   this.props.loginUser(this.state.email, this.state.password);
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
  console.log(this.context.store)
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
             <RaisedButton label="Fetch User" onClick={() => this.handleFetchUser()}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};

// const mapDispatchToProps=(dispatch)=>{
//   return { loginUser: bindActionCreators(this.props.loginUser, dispatch)  }
// };
//
// export default withRouter(connect(null, mapDispatchToProps)(Login));

const mapStateToProps=(state)=>{
  console.log(state)
  return {current_user:state.currentUser}
}

export default connect(mapStateToProps, {loginUser: loginUser, fetchUser: fetchUser})(Login)
