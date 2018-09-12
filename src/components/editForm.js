import { reduxForm ,Field } from 'redux-form';
import formFields from './formField';
import Pricefield from './pricefield';
import { PatchRest } from "../actions";
import { connect } from "react-redux";
import { Redirect} from 'react-router-dom';
import React, { Component, PropTypes } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class EditForm extends Component {
  state = {
   redirectToNewPage: false
 }
  onSubmit(id,values) {
    this.setState({ redirectToNewPage: true });
      this.props.PatchRest(id,values).catch(error=>{});
}
render() {
   const { handleSubmit,touched,error,history  } = this.props;
    if(this.props.restaurant===null) return (<div>loading..</div>);
    var id=this.props.restaurant._id;
    console.log(this.state.redirectToNewPage);
    if(this.state.redirectToNewPage===true){
       return(<Redirect to='/'/>);
    }
   return (

     <form onSubmit={handleSubmit(props => this.onSubmit(id,props))} >
     <Field name="name" type="text" component={formFields} label="Name" />
     <Field name="price" type="number" component={Pricefield} label="Price"/>
     <Field name="image" type="text" component={formFields} label="image url" />
     <Field name="description" type="text" component={formFields} label="description"/>
     <button type="submit" className="btn btn-primary">Submit</button>
     </form>
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
function mapStateToProps({ restaurant }) {
  return { restaurant };
}
export default reduxForm({
    form: 'editrestaurant',
  validate,
  enableReinitialize: true
})(connect(mapStateToProps, { PatchRest })(EditForm));
