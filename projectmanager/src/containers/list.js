import React from 'react';
import { connect } from 'react-redux';

const List = props => {
  return (
    <div>
      <li>
      <h1>Congrats You are Logged In</h1>
      </li>
    </div>
  );
};

export default withAuth(Profile);
