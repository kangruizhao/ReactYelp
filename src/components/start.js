import React, { Component } from 'react';
import RestContainer from './RestContainer';
import Jumbo from './jumbo';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Start extends Component {
  render() {
    return  (
      <div>
      <Jumbo/>
      <RestContainer/>
      </div>
    );
  }
}

export default Start;
