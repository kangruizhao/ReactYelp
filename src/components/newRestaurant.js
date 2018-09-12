import { reduxForm ,Field } from 'redux-form';
import formFields from './formField';
import Pricefield from './pricefield';
import { PostRest } from "../actions";
import { connect } from "react-redux";
import React, { Component, PropTypes } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Redirect} from 'react-router-dom';
class newRestaurant extends Component {
  onSubmit(values) {
 this.props.PostRest(values);
}
render() {
   const { handleSubmit,touched,error,history  } = this.props;
   var h1style={
     textAlign: 'center'
   }
   var outerstyle={
     width:'50%',
     margin:'25px auto'
   }
   if (localStorage.getItem('token') === null){
     return (<Redirect to="/login"/>);
   }
   return (
      <div claaName="row">
      <h1 style={h1style}>Create a New Restaurant</h1>
      <div style={outerstyle}>
     <form onSubmit={handleSubmit(props => this.props.PostRest(props,history))} >
     <Field name="name" type="text" component={formFields} label="Name"/>
     <Field name="price" type="number" component={Pricefield} label="Price"/>
     <Field name="image" type="text" component={formFields} label="image url"/>
     <Field name="description" type="text" component={formFields} label="description"/>
     <button type="submit" className="btn btn-primary">Submit</button>
     </form>
     </div>
     </div>
   );

}
}
function validate(values) {
  const errors = {};

  if (!values['name']) {
    errors['name'] = `Enter a Name`;
  }
  if (!values['price']) {
    errors['price'] = `Enter a Price`;
  }
  if (!values['image']) {
    errors['image'] = `Enter a image url`;
  }
  return errors;
}
export default reduxForm({
    validate,
  form: 'newRestaurant'
})(connect(null, { PostRest })(newRestaurant));
