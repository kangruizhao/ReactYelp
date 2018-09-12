import { reduxForm ,Field } from 'redux-form';
import { fetchARest,SignUp,DeleARest,postComment } from "../actions";
import { connect } from "react-redux";
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import  CommentsList from './commentslist';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import textfield from './textfield';
class Detail extends Component {
  componentDidMount() {
   this.props.fetchARest(this.props.match.params.id);
 }
 onSubmit(rid,values,history) {
 this.props.postComment(rid,values,history);
}
  render(){
    const { handleSubmit,touched,error,history } = this.props;
    if (this.props.restaurant===null||this.props.restaurant._id!==this.props.match.params.id)return (<div>loading..</div>);
    //console.log(this.props.restaurant);
    var rid=this.props.restaurant._id;
    return(
      <div>
      <div className="card">
    <div className="card-image">
      <img src={this.props.restaurant.image}/>
      <span className="card-title">{this.props.restaurant.name}</span>
    </div>
    <div className="card-content">
      <h4 >{this.props.restaurant.name}</h4>
      <h4 className="right">${this.props.restaurant.price}/person</h4>
      <p>{this.props.restaurant.description}</p>

      <p>
            <em>Submitted By {this.props.restaurant.author.username}</em>
        </p>
    </div>

        {localStorage.getItem('token')!==null&&
          this.props.restaurant.author.id===localStorage.getItem('userId') &&
          <div className="card-action">
      <Link to={this.props.match.params.id+'/edit'} className="waves-effect waves-light btn" style={{marginRight:"20px"}}>Edit</Link>
      <a onClick={() => this.props.DeleARest(this.props.restaurant._id,history)} className="waves-effect waves-light btn #f44336 red">Delete</a>
      </div>
      }

  </div>
<br/>
<br/>
  <CommentsList raid={rid} hi={history}/>
  <br/>
  <br/>
  <form onSubmit={handleSubmit(props => this.onSubmit(rid,props,history))} >
  <Field name="comment" component={textfield} label="Comment here"/>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>

</div>
    );
  }

}
function validate(values){
  const errors = {};

  if (!values['comment']) {
    errors['comment'] = `Comment can't be empty`;
  }
  return errors;
}
function mapStateToProps({ restaurant }) {
  return { restaurant };
}
export default reduxForm({
    validate,
  form: 'CommentForm'
})(connect(mapStateToProps, { DeleARest,fetchARest,SignUp,postComment})(Detail));
