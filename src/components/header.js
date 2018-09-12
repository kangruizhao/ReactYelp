import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import { fetchRest } from '../actions';
import { connect } from 'react-redux';
class Header extends Component {
  render() {

    return  (
      <nav >
       <div className="#9e9e9e grey nav-wrapper">
         <Link to="/" className="brand-logo">Kangrui Yummy</Link>
                {localStorage.getItem('token')!==null&&
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a>Hi: {localStorage.getItem('un')}</a></li>
                  <li onClick={() => {localStorage.clear();window.location.reload();}}><a>LogOut</a></li>
               </ul>}
               {localStorage.getItem('token')===null&&
                 <ul id="nav-mobile" className="right hide-on-med-and-down">
             <li><Link
              to='signup'>SignUp</Link></li>
             <li><Link
              to='signin'>SignIn</Link></li>
            </ul>
          }
       </div>
     </nav>
    );
  }
}

function mapStateToProps({ Auth }) {
  return { Auth };
}

export default connect(mapStateToProps,null)(Header);
