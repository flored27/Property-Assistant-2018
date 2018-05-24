import React, { Component } from 'react';
import { connect } from 'react-redux';
import './initial.css';
import { withRouter } from 'react-router-dom';

class Initial extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[],
      open: true
    }
  }

  registerLink = (e)=>{
    e.preventDefault();
    window.location = 'Property-Assistant-2018/register';}
  // This is a reference to the path of register:
  // /Property-Assistant-2018/register, so that the Check us Out button onclick goes to register,
  // and it works with githubpages due to the need of Property-Assistant-2018 in front of path

render() {

return (

        <div className="initial">
          <div style={{height: "100%"}}>


            <div class="ui vertical stripe segment">
              <br/>
              <br/>
              <br/>
              <img class="ui medium rounded centered image" src="logo.png"/>
              <br/>
              <br/>
              <div class="ui center aligned stackable grid container">
                <div class = "ui center aligned inverted container" >
                  <div class="ui tertiary inverted light blue segment">
                    <h3 class="ui centered header">We Help The Little Guy</h3>
                    <p>It is hard starting out as a Landlord. Repairs, contracts, mortgages can all seem a blur; let us take care of all the details so you can focus on you and your tenants.</p>
                  </div>
                  <div class="ui tertiary inverted light blue segment">
                    <h3 class="ui header">Tenants Will Thank You</h3>
                    <p>Instead of chasing tenants to collect their rent, and tenants chasing you for repairs, why not leave that to us. Your tenant will be able to pay you directly online, as well as send repair requests, look at their contracts, and have the property information all through Property Assistant.</p>
                    </div>
                </div>
                <div class="row">
                  <div class="center aligned column">
                    <a onClick={this.registerLink} class="ui huge red button">Check Us Out</a>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <br/>

            </div>
          </div>
)
}
}

export default withRouter(connect(null, null)(Initial))
