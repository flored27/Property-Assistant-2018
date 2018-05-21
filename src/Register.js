import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import {findUser, checkUser} from './actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './initial.css';
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      phone: '',
      password:''
    }
  }
    handleClick = (event) => {
      console.log(this.state)
      event.preventDefault();
        const fullName = this.state.first_name + " " + this.state.last_name
        console.log(fullName)
        fetch('https://property-assistant-2018.herokuapp.com/landlords/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            landlord: {name: fullName,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password}
          })
        })
        .then(data => data.json())
        .then(data=>this.props.setUser(this.state.email, this.state.password))
        .then(()=>this.props.history.push("/Property-Assistant-2018/profile"));
  }


  render() {
    return (
      <div className="Register">
      <br/>
      <br/>
      <div class="ui tertiary inverted light blue segment">
        <h1 class="ui center aligned icon header">
          <i class="circular add user icon"></i>
          Register:
        </h1>
      </div>
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Phone Number"
             floatingLabelText="Phone Number"
             onChange = {(event,newValue) => this.setState({phone:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password Here"
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

const mapStateToProps=(state)=>{
  console.log(state)
  return {current_user:state.currentUser}
}

export default connect(mapStateToProps, {setUser: setUser})(Register)
