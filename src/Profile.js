
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import {fetchProperties} from './actions/index';

import {deleteProperty} from './actions/index';
import './initial.css';

class Profile extends Component {


handleDelete = (event, id) => {
  event.preventDefault();
  console.log("hello")
  this.props.deleteProperty(id)
 //  .then(()=>{this.props.history.push(`/properties`)});
}

  render() {

      const propers = this.props.currentUser.properties.map( (propers, i) => {
        // let link = "details/"+this.props.id
            return (

                          <div class="card">
                            <div class="image">

                            </div>

                            <div class="content">
                              <a class="header">
                                <Link to={`/Property-Assistant-2018/detail/${propers.id}`}>{propers.name}</Link>
                                </a>
                              <div class="meta">
                                <div class="ui button">
                                  <i class="edit icon"></i>
                                  <Link to={`/Property-Assistant-2018/edit_property/${propers.id}`}>Edit</Link>
                                </div>
                                <br/>
                                <div class="ui button">
                                  <button onClick={(event) => this.handleDelete(event, propers.id)}>
                                  <i class="delete icon"></i>Delete
                                  </button>
                                </div>
                              </div>
                              <div class="description" textAlign='center'>
                                  {propers.street_address}
                                  <br/>
                                    {propers.city}
                                    <br/>
                                    {propers.state}
                                    <br/>
                                    {propers.zip}
                              </div>
                            </div>

                          </div>

            )
          })
  return (
    <div className="Profile">
    <br/>
    <br/>
      <div class="ui tertiary inverted light blue segment">
        <h1 class="ui center aligned icon header">
          <i class="circular user outline icon"></i>
          Hello {this.props.currentUser.name}!
          <br/>
          Contact Information:
          <br/>
          Phone: {this.props.currentUser.phone}
          <br/>
          Email: {this.props.currentUser.email}
        </h1>
      </div>


      <div class="ui icon buttons">
        <button blue class="ui button">
          <Link to="/Property-Assistant-2018/new_property">
          New Property: <i class="plus icon"></i>
          </Link>
        </button>
      </div>
        <br/>
        <br/>
      <div class="ui centered three stackable link cards">
        {propers}
      </div>
    </div>
  );
};
};
const mapStateToProps=(state)=>{
  console.log(state.auth.currentUser)
  return {currentUser:state.auth.currentUser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(fetchProperties(url)),
    deleteProperty: (id) => dispatch(deleteProperty(id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
