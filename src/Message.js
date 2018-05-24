import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import {fetchProperties} from './actions/index';
import './initial.css';
import { Button } from 'semantic-ui-react'
import {deleteProperty} from './actions/index';
import { Header, Modal } from 'semantic-ui-react'
import {sendEmail} from './actions/index';

class Message extends Component {
constructor(props){
  super(props);
  this.state={
  landlord_email:'',
  tenant_email:'',
  message: '',
  landlord_id: null
  }
}

componentDidMount(props){
  this.setState({
    landlord_email: this.props.currentUser.email,
    landlord_id: this.props.currentUser.id
  })
}
   handleContact = (event, tenant_email) => {
     event.preventDefault();
     console.log("hello")
     this.props.sendEmail(this.state, tenant_email)
    //  .then(()=>{this.props.history.push(`/properties`)});
   }

render() {
  console.log(this.state)
  const propers = this.props.currentUser.tenants.map( (propers, i) => {
    // let link = "details/"+props.id
        return (
          <div class="card">

            <div class="content">
              <a class="header">
              <Link to={`/Property-Assistant-2018/detail/${propers.id}`}>{propers.name}</Link>
                </a>
              <div class="meta">
                <Modal trigger={<Button><i class="mail icon"></i>Contact </Button>}>
                  <Modal.Header>Send Email Here!<i class="mail icon"></i></Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <Header>{propers.name} </Header>
                      <div class="ui large form">
                        <div class="big field">
                          <label>Text</label>
                          <textarea column="20" defaultValue={`Hello ${propers.name},`}
                          onChange = {(event) => this.setState({message:event.target.value})}
                          ></textarea>
                        </div>
                      </div>
                      <br/>
                      <button onClick={(event)=>this.handleContact(event, propers.email)}>Send</button>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </div>
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
