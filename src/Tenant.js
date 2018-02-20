import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from 'react-router-dom';
import {loginUser} from './actions/index';
import {fetchProperties} from './actions/index';
import {store} from './index'
import PropertyDetail from './PropertyDetail';
import NewProperty from './NewProperty';
import { Button, Icon } from 'semantic-ui-react'
import {deleteProperty} from './actions/index';


class Tenant extends Component {
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
  const propers = this.props.currentUser.tenants.map( (propers, i) => {
    // let link = "details/"+props.id
        return (
          <div>
            <div class="column">
              <div class="ui segment">
                <img></img>
                <h2>
                  <Link to={`/Property-Assistant-2018/detail/${propers.id}`}>{propers.name}</Link>
                  <br/>
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
                </h2>
                <h3>
                  {propers.email}
                </h3>
                <h4>
                  {propers.phone}
                </h4>
              </div>
            </div>
          </div>
        )
      })

    return (
      <div>
        <h2>
          Tenants
          <div class="ui icon buttons">
            <button class="ui button">
              <Link to="/new_property">
                <i class="plus icon"></i>
              </Link>
            </button>
          </div>
           <img class="ui centered medium image" src="building_icon.jpg"></img>
        </h2>
        <div class="ui three column grid">
          {propers}
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
  console.log(state.auth.currentUser.properties)
  return {currentUser:state.auth.currentUser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(fetchProperties(url)),
    deleteProperty: (id) => dispatch(deleteProperty(id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tenant))
