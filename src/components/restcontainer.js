import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { fetchRest } from '../actions';
import { connect } from 'react-redux';
class RestContainer extends Component {
  componentDidMount() {
   this.props.fetchRest();
 }
 mapRestaurant(){
   if (this.props.restaurants===null) return <div>loading..</div>;
   return this.props.restaurants.map(restaurant => {
      return (
        <div className="col-md-3 offset-sm-1" >
              <div className="thumbnail">
                  <img src={restaurant.image} height="200" width="200"/>
                </div>
                <div className="caption">
                      <h4>{restaurant.name}</h4>
                </div>
                  <p>
                <Link to={'/detail/'+restaurant._id} class="btn btn-primary">More Info</Link>
                  </p>
          </div>
      );
    });
 }
  render() {
    return  (

        <div className='row'>
       {this.mapRestaurant()}
     </div>


    );
  }
}

function mapStateToProps({ restaurants }) {
  return { restaurants };
}

export default connect(mapStateToProps, { fetchRest })(RestContainer);
