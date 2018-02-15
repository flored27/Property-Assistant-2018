import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { withRouter } from 'react-router-dom';

import './initial.css';
import {editProperty} from './actions/index';
import {deleteTenant} from './actions/index';
import {deleteApartment} from './actions/index';
import { connect } from 'react-redux';
class EditProperty extends Component {
  constructor(props){
    super(props);
    this.state={
      property: {
        taxes:'',
        mortgage:'',
        state: '',
        city: '',
        street_address: '',
        zip: '',
        name: '',
        id: null
      },
      apartments: [{
        number: null,
        property_id: null,
        id: null
      }],
      tenants: [{
        name: "",
        age: null,
        phone: "",
        email: "",
        id: null,
        apartment_id: null,
        apartment_number: null
      }],
      errorTextA: "",
      errorTextTN: "",
      errorTextTAN: "",
      errorTextTE: "",
      errorTextPN: "",
      errorTextPSA: "",
      errorTextPS: "",
      errorTextPC: "",
      errorTextPZ: "",
    }
  }


componentDidMount(props){
  fetch(`http://localhost:3000/properties/${this.props.match.params.id}`)
  .then(data => data.json())
  .then(data=> {
    this.setState({
    property: data.Property,
    apartments:data.Apartment,
    tenants:data.Tenant
              })
            })
}

addApartmentForm=(event)=>{
 event.preventDefault();
 let newApartments = this.state.apartments.slice();
newApartments.push({ number: null, property_id: this.state.property.id, id: null});
this.setState(prevState => ({
 ...prevState,
 apartments: newApartments
}));

};

addTenantForm=(event)=>{
 event.preventDefault();
 let newTenants = this.state.tenants.slice();
newTenants.push({ name: "", age: null, phone: "", email: "", apartment_id: null, id: null, apartment_number: null })
this.setState(prevState => ({
  ...prevState,
    tenants: newTenants
}));
};

handleDeleteApartment = (event, aID, index) => {
  event.preventDefault();
  this.props.deleteApartment(aID)
  let newApartments = this.state.apartments.slice()
  let newApp = newApartments.splice(index, 1);
  this.setState(prevState => {
    return {
    ...prevState,
    apartments: newApartments
    }
  })
}

handleDeleteTenant = (event, id, index) => {
  event.preventDefault();
  this.props.deleteTenant(id)
  let newTenants = this.state.tenants.slice()
  let newT = newTenants.splice(index, 1);
  this.setState(prevState => {
    return {
    ...prevState,
    tenants: newTenants
    }
  })
}


handleClick = (event) =>{
  event.preventDefault();
  console.log(this.state)
  console.log(this.props)
  this.props.editProperty(this.state).then((id)=>{this.props.history.push(`/detail/${id}`)});
}

render() {
  console.log(this.state)
  const apartments = this.state.apartments.map( (ap, index) => {
    let newApartments = this.state.apartments.slice()
    let apartmentToUpdate = newApartments[index]
        return (
          <div>
          <TextField
            errorText = {this.state.errorTextA}
            value={ap.number}
            floatingLabelText="Apartment Number"
            onChange = {(event,newValue) => {

              {event.target.value?(
                console.log("Hello"),
                  this.setState({
                    errorTextA: ""
                  })
              ) : (
                console.log("goodbye"),
                this.setState({
                  errorTextA: "This field is required"
                })
              )}

              this.setState(prevState => {

              apartmentToUpdate.number = newValue
              newApartments[index] = apartmentToUpdate
              return {
              ...prevState,
              apartments: newApartments
              }
            })}}
            />
            <br/>
            <div class="ui button">
              <button onClick={(event) => this.handleDeleteApartment(event, ap.id, index)}>
                <i class="delete icon"></i>Delete
              </button>
            </div>
            <div class="ui teal button">
              <button onClick={(event) => this.addApartmentForm(event)}>
                <i class="add icon"></i>Add
              </button>
            </div>
            </div>
        )
      })
  const tenants = this.state.tenants.map( (t, index)=> {
    let newTenants = this.state.tenants.slice()
    let tenantToUpdate = newTenants[index]
    return (
      <div>
      <TextField
        errorText = {this.state.errorTextTN}
        value={t.name}
        floatingLabelText="Tenant Name"
        onChange = {(event,newValue) => {

          {event.target.value?(
            console.log("Hello"),
              this.setState({
                errorTextTN: ""
              })
          ) : (
            console.log("goodbye"),
            this.setState({
              errorTextTN: "This field is required"
            })
          )}

          this.setState(prevState => {

          tenantToUpdate.name = newValue
          newTenants[index] = tenantToUpdate
          return {
          ...prevState,
          tenants: newTenants
          }
        })}}
        />
      <br/>
      <TextField
        value={t.age}
        floatingLabelText="Tenant Age"
        onChange = {(event,newValue) => this.setState(prevState => {

          tenantToUpdate.age = newValue
          newTenants[index] = tenantToUpdate
          return {
          ...prevState,
          tenants: newTenants
          }
        })}
        />
      <br/>
      <TextField
        errorText = {this.state.errorTextTAN}
        value={t.apartment_number}
        floatingLabelText="Tenant Apartment Number"
        onChange = {(event,newValue) => {

          {event.target.value?(
            console.log("Hello"),
              this.setState({
                errorTextTAN: ""
              })
          ) : (
            console.log("goodbye"),
            this.setState({
              errorTextTAN: "This field is required"
            })
          )}

          this.setState(prevState => {

          tenantToUpdate.apartment_number = newValue
          newTenants[index] = tenantToUpdate
          return {
          ...prevState,
          tenants: newTenants
          }
        })}}
        />
      <br/>
      <TextField
        value={t.phone}
        floatingLabelText="Tenant Phone Number"
        onChange = {(event,newValue) => this.setState(prevState => {

          tenantToUpdate.phone = newValue
          newTenants[index] = tenantToUpdate
          return {
          ...prevState,
          tenants: newTenants
          }
        })}
        />
      <br/>
      <TextField
        errorText = {this.state.errorTextTE}
        value={t.email}
        floatingLabelText="Tenant Email"
        onChange = {(event,newValue) => {

          let abc = (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
          if (event.target.value.match(abc)) {
              this.setState({ errorTextTE: '' })
            } else {
              this.setState({ errorTextTE: 'Invalid email format' })
            }

          this.setState(prevState => {

          tenantToUpdate.email = newValue
          newTenants[index] = tenantToUpdate
          return {
          ...prevState,
          tenants: newTenants
          }
        })}}
        />
        <br/>
        <div class="ui button">
          <button onClick={(event) => this.handleDeleteTenant(event, t.id, index)}>
            <i class="delete icon"></i>Delete
          </button>
        </div>
        <div class="ui teal button">
          <button onClick={(event) => this.addTenantForm(event)}>
            <i class="add icon"></i>Add
          </button>
        </div>
        </div>
      )
    })
  return (
    <div className="EditP">
      <MuiThemeProvider>
        <div>
        <br/>
        <br/>
        <br/>
        <br/>
         <TextField
          errorText = {this.state.errorTextPN}
           value={this.state.property.name}
           floatingLabelText="Property Name"
           onChange = {(event,newValue) => {

             {event.target.value?(
               console.log("Hello"),
                 this.setState({
                   errorTextPN: ""
                 })
             ) : (
               console.log("goodbye"),
               this.setState({
                 errorTextPN: "This field is required"
               })
             )}

             this.setState({
             property: {
               ...this.state.property,
               name:newValue}
             })}}
           />
         <br/>
         <TextField
          errorText = {this.state.errorTextPSA}
           value={this.state.property.street_address}
           floatingLabelText="Street Address"
           onChange = {(event,newValue) => {

             {event.target.value?(
               console.log("Hello"),
                 this.setState({
                   errorTextPSA: ""
                 })
             ) : (
               console.log("goodbye"),
               this.setState({
                 errorTextPSA: "This field is required"
               })
             )}

             this.setState({
             property: {
               ...this.state.property,
               street_address:newValue}
             })}}
           />
         <br/>
         <TextField
          errorText = {this.state.errorTextPC}
           value={this.state.property.city}
           floatingLabelText="City"
           onChange = {(event,newValue) => {

             {event.target.value?(
               console.log("Hello"),
                 this.setState({
                   errorTextPC: ""
                 })
             ) : (
               console.log("goodbye"),
               this.setState({
                 errorTextPC: "This field is required"
               })
             )}

             this.setState({
             property: {
               ...this.state.property,
               city:newValue}
             })}}
           />
         <br/>
         <TextField
          errorText = {this.state.errorTextPS}
           value={this.state.property.state}
           floatingLabelText="State"
           onChange = {(event,newValue) => {

             {event.target.value?(
               console.log("Hello"),
                 this.setState({
                   errorTextPS: ""
                 })
             ) : (
               console.log("goodbye"),
               this.setState({
                 errorTextPS: "This field is required"
               })
             )}


             this.setState({
             property: {
               ...this.state.property,
               state:newValue}
             })}}
           />
           <br/>
         <TextField
          errorText = {this.state.errorTextPZ}
           value={this.state.property.zip}
           floatingLabelText="Zip Code"
           onChange = {(event,newValue) => {

             {event.target.value?(
               console.log("Hello"),
                 this.setState({
                   errorTextPZ: ""
                 })
             ) : (
               console.log("goodbye"),
               this.setState({
                 errorTextPZ: "This field is required"
               })
             )}

             this.setState({
             property: {
               ...this.state.property,
               zip:newValue}
             })}}
          />
          <br/>
        <TextField

          value={this.state.property.taxes}
          floatingLabelText="Taxes"
          onChange = {(event,newValue) => this.setState({
            property: {
              ...this.state.property,
            taxes:newValue}
          })}
         />
         <br/>
        <TextField

         value={this.state.property.mortgage}
         floatingLabelText="Mortgage"
         onChange = {(event,newValue) => this.setState({
           property: {
             ...this.state.property,
           mortgage:newValue}
         })}
        />
        <br/>
        {apartments}
        <br/>
        {tenants}
        <br/>
         <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         <div class="ui teal button">
           <button onClick={(event) => {
             this.addTenantForm(event)
             this.addApartmentForm(event)}}>
             <i class="add icon"></i>Add Apartment & Tenant
           </button>
         </div>

        </div>
       </MuiThemeProvider>
    </div>
  );
}
}
const style = {
margin: 15
};

const mapStateToProps=(state)=>{
console.log(state)
return {current_user:state.auth.currentUser}
}
//
// export default withRouter(connect(mapStateToProps, {newProperty: newProperty})(NewProperty))
//


export default withRouter(connect(mapStateToProps, {editProperty: editProperty, deleteTenant: deleteTenant, deleteApartment: deleteApartment})(EditProperty))
