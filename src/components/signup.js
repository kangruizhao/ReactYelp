import { reduxForm ,Field } from 'redux-form';
import formFields from './formField';
import { AignUp } from "../actions";
import { connect } from "react-redux";
import React, { Component, PropTypes } from 'react';
import { Redirect} from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class signUp extends Component {

render() {
   const { handleSubmit,touched,error,AignUp } = this.props;
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
      <h1 style={h1style}>Sign Up</h1>
      <div style={outerstyle}>
     <form onSubmit={handleSubmit(AignUp)} >
       {error && <strong>{error}</strong>}
     <Field name="username" type="text" component={formFields} label="UserName"/>
     <Field name="password" type="password" component={formFields} label="PassWord"/>
     <Field name="cpassword" type="password" component={formFields} label="Comfirm PassWord"/>
       <button type="submit" className="btn btn-primary">Sign Up</button>
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
  if (values['password']!==values['cpassword']) {
    errors['cpassword'] = `comfirm password should same as password`;
  }
  return errors;
}
export default reduxForm({
    validate,
  form: 'signUpForm'
  })(connect(null, { AignUp })(signUp));
