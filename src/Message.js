import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from 'react-router-dom';
import {fetchProperties} from './actions/index';
import './initial.css';
import {deleteProperty} from './actions/index';
import {sendEmail} from './actions/index';
import { Header} from 'semantic-ui-react'

class Message extends Component {
constructor(props){
  super(props);
  this.state={
  tenant_name: '',
  landlord_email:'',
  tenant_email:'',
  message: '',
  landlord_id: null,
  open: false
  }
}


// <Modal trigger={<FlatButton><i class="mail icon"></i>Contact </FlatButton>}>
//   <Modal.Header>Send Email Here!<i class="mail icon"></i></Modal.Header>
//   <Modal.Content>
//     <Modal.Description>
//       <Header>{propers.name} </Header>
//       <div class="ui large form">
//         <div class="big field">
//           <label>Text</label>
//           <textarea column="20" defaultValue={`Hello ${propers.name},`}
//           onChange = {(event) => this.setState({message:event.target.value})}
//           ></textarea>
//         </div>
//       </div>
//       <br/>
//       <button onClick={(event)=>this.handleContact(event, propers.email)}>Send</button>
//     </Modal.Description>
//   </Modal.Content>
// </Modal>
componentDidMount(props){
  this.setState({
    landlord_email: this.props.currentUser.email,
    landlord_id: this.props.currentUser.id
  })
}
   handleContact = (event, tenant_email) => {
     event.preventDefault();
     console.log("hello ", tenant_email)
     this.handleClose()
     this.props.sendEmail(this.state, tenant_email)
    //  .then(()=>{this.props.history.push(`/properties`)});
   }

   handleClickOpen = (event, name, email) => {
    this.setState({open: true});
    this.setState({tenant_name: name});
    this.setState({tenant_email: email});
    console.log(this.state);
  };

  handleClose = () => {
    this.setState({open: false});
  };

render() {
  console.log(this.state)


  const propers = this.props.currentUser.tenants.map( (propers, i) => {
    // let link = "details/"+props.id
    console.log(propers)
    const name = propers.name;
    console.log(name)
        return (


            <div class="card">
              <div class="content">
                <a class="header">
                  <Link to={`/detail/${propers.property_id}`}>{propers.name}</Link>
                </a>

                  <Button onClick={(event)=>this.handleClickOpen(event, propers.name, propers.email)} color="primary">Contact</Button>
                    <Dialog
                      modal={true}
                      open={this.state.open}
                      onClose={this.handleClose}
                      title={propers.name}
                    >
                    <DialogTitle id="form-dialog-title">Compose Message to:</DialogTitle>
                    <DialogContent>

                    <h1>{this.state.tenant_name}</h1>
                    <div class="ui large form">
                      <div class="big field">
                        <label>{this.state.tenant_email}</label>
                          <textarea cols="50" rows="25" defaultValue={`Hello ${this.state.tenant_name},`}
                          onChange = {(event) => this.setState({message:event.target.value})}
                          />
                      </div>
                    </div>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>,
                    <Button onClick={(event)=>this.handleContact(event, this.state.tenant_email)} color="primary">
                      Submit
                    </Button>
                    </DialogActions>
                    </Dialog>

                <div class="description" textAlign='center'>
                  Email: {propers.email}
                  <br/>
                  Phone Number: {propers.phone}
                </div>
              </div>
            </div>

        )
      })



    return (
      <div className="Message">
        <br/>
        <br/>

        <div class="ui tertiary inverted light blue segment">
          <h1 class="ui center aligned icon header">
            <i class="circular address book outline icon"></i>
            Contact:
          </h1>
        </div>

          <br/>
          <br/>
        <div class="ui centered three stackable link cards">
          {propers}
        </div>
      </div>

    );
  }
}


// const mapDispatchToProps=(dispatch)=>{
//   return { loginUser: bindActionCreators(this.props.loginUser, dispatch)  }
// };
//
// export default withRouter(connect(null, mapDispatchToProps)(Login));

const mapStateToProps=(state)=>{
  console.log(state.auth.currentUser)
  return {currentUser:state.auth.currentUser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(fetchProperties(url)),
    deleteProperty: (id) => dispatch(deleteProperty(id)),
    sendEmail: (s, e) => dispatch(sendEmail(s, e))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message))
