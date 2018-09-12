import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Jumbo extends Component {
  render() {
    return  (


      <div className="jumbotron">
        <h1 className="display-4">
          Welcome to  Kangrui Yummy
        </h1>
  <p className="lead">View our hand-picked Asian restaurant in United State</p>

  <Link className="btn btn-primary btn-lg" to={localStorage.getItem('token')===null?'/signin':'/new'} >
    Add new restaurant
  </Link>
 </div>
    );
  }
}

export default Jumbo;
