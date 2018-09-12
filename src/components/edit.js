  import { reduxForm ,Field } from 'redux-form';
import formFields from './formField';
import EditForm from './editForm';
import { PostRest } from "../actions";
import { connect } from "react-redux";
import React, { Component, PropTypes } from 'react';
import { Redirect} from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Edit extends Component {

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
   if(this.props.restaurant===null) return(<div>loading</div>);
   var intial={
     name:this.props.restaurant.name,
     price:this.props.restaurant.price,
     image:this.props.restaurant.image,
     description:this.props.restaurant.description,
   };
   return (
      <div claaName="row">
      <h1 style={h1style}>Edit Restaurant</h1>
      <div style={outerstyle}>
       <EditForm initialValues={intial}
         initialValuesToPassThru={intial}/>
     </div>
     </div>
   );

}
}

function mapStateToProps({ restaurant }) {
  return { restaurant };
}

export default connect(mapStateToProps, { PostRest })(Edit);
