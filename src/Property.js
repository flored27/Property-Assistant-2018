import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import {fetchProperties} from './actions/index';

import {deleteProperty} from './actions/index';
import './initial.css';


class Property extends Component {
constructor(props){
  super(props);
  this.state={
  email:'',
  password:''
  }
}

   handleDelete = (event, id) => {
     event.preventDefault();
     console.log("hello")
     this.props.deleteProperty(id)
    //  .then(()=>{this.props.history.push(`/properties`)});
   }

render() {
  console.log(this.props)
  const propers = this.props.properties.map( (propers, i) => {
    // let link = "details/"+props.id
        return (

            <div class="card">
              <div class="image">

              </div>

              <div class="content">
                <a class="header">
                  <Link to={`/detail/${propers.id}`}>{propers.name}</Link>
                  </a>
                <div class="meta">
                  <div class="ui button">
                    <i class="edit icon"></i>
                    <Link to={`/edit_property/${propers.id}`}>Edit</Link>
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
      <div className="PropertyList">
        <br/>
        <br/>
        <div class="ui tertiary inverted light blue segment">
          <h1 class="ui center aligned icon header">
            <i class="circular university icon"></i>
            Properties:
          </h1>
        </div>

        <div class="ui icon buttons">
          <button blue class="ui button">
            <Link to="/new_property">
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
  }
}

// const mapDispatchToProps=(dispatch)=>{
//   return { loginUser: bindActionCreators(this.props.loginUser, dispatch)  }
// };


//
// export default withRouter(connect(null, mapDispatchToProps)(Login));

const mapStateToProps=(state)=>{
  console.log(state.auth.currentUser.properties)
  return {properties:state.auth.currentUser.properties}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(fetchProperties(url)),
    deleteProperty: (id) => dispatch(deleteProperty(id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Property))
