import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import { fetchComment,DeleAComment } from '../actions';
import { connect } from 'react-redux';
class CommentsList extends Component {
  componentDidMount() {
   this.props.fetchComment(this.props.raid);
 }
 mapRestaurant(){
   if (this.props.Comments===null) return <div>loading..</div>;

   return this.props.Comments.map(comment => {
       var date=new Date(comment.time);
      return (
        <li className="collection-item avatar">
        <span class="title"><strong>Comment by {comment.author.username}</strong></span>
        <p>{comment.text}</p>
          {localStorage.getItem('token')!==null&&
          comment.author.id===localStorage.getItem('userId') &&
            <a onClick={() => this.props.DeleAComment(comment._id,this.props.hi)} className="waves-effect waves-light btn #f44336 red">Delete</a>}
          <span className="secondary-content">Post at: {date.getMonth()+1} / {date.getDate()} / {date.getYear()+1900}</span>
        </li>
      );
    });
 }
  render() {
    return  (

        <div className='collection'>
       {this.mapRestaurant()}
     </div>


    );
  }
}

function mapStateToProps({ Comments }) {
  return { Comments };
}

export default connect(mapStateToProps, { fetchComment,DeleAComment })(CommentsList);
