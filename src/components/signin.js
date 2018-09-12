import { reduxForm ,Field } from 'redux-form';
import formFields from './formField';
import { SignIn } from "../actions";
import { connect } from "react-redux";
import { Redirect} from 'react-router-dom';
import React, { Component, PropTypes } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { getFormSubmitErrors } from 'redux-form';
class signIn extends Component {
  onSubmit(values) {
 this.props.SignIn(values);
}
render() {
   const { handleSubmit,touched,error,submitting,SignIn,submitErrors} = this.props;
   var h1style={
     textAlign: 'center'
   }
   var outerstyle={
     width:'50%',
     margin:'25px auto'
   }
   if (localStorage.getItem('token') !== null){
     return (<Redirect to="/"/>);
   }
   return (
      <div claaName="row">
      <h1 style={h1style}>Login</h1>
      <div style={outerstyle}>
     <form onSubmit={handleSubmit(SignIn)} >
      {error && <span style={{color: "red" }}>{error}</span>}
     <Field name="username" type="text" component={formFields} label="UserName"/>
     <Field name="password" type="password" component={formFields} label="PassWord"/>
       <button type="submit" className="btn btn-primary">Log in</button>
     </form>
     </div>
     </div>
   );

}
}
function validate(values) {
  const errors = {};

  if (!values['username']) {
    errors['username'] = `Enter a UserName`;
  }
  if (!values['password']) {
    errors['password'] = `Enter a Password`;
  }
  return errors;
}
export default reduxForm({
    validate,
  form: 'signInForm'
})(connect(null,{ SignIn })(signIn));
