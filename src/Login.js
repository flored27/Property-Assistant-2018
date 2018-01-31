import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';
import {loginUser} from './actions/index';
import {fetchUser} from './actions/index';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
  email:'',
  password:'',
  open: false
  }
}

  handleFetchUser = () =>{
    this.props.fetchUser();
  }

  handleClick = (event) =>{
    event.preventDefault();
   this.props.loginUser(this.state.email, this.state.password).then(()=>this.props.history.push("/profile"));}

  registerLink = (e)=>{
     e.preventDefault();
     window.location = 'register';}

  handleOpen = () => {
     this.setState({open: true});
     };

  handleClose = () => {
     this.setState({open: false});
     };

render() {
  const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div>
        <MuiThemeProvider>
        <div>
       <RaisedButton label="Modal Dialog" onClick={this.handleOpen} />
       <Dialog
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
          <div>

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
         </div>
         </MuiThemeProvider>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <div>
         </div>
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

export default withRouter(connect(mapStateToProps, {loginUser: loginUser, fetchUser: fetchUser})(Login))
