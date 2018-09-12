import React, { Component } from 'react';
import RestContainer from './components/restcontainer';
import { BrowserRouter, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Start from './components/start';
import signUp from './components/signup';
import signIn from './components/signin';
import Edit from './components/edit';
import newRestaurant from './components/newRestaurant';
import Detail from './components/detail';
class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <div>
          <Header/>
          <br/>
          <br/>
            <div className='row'>
              <div className='col-md-10 offset-1'>
            <Route exact path="/" component={Start} />
            <Route exact path="/signup" component={signUp} />
            <Route exact path="/signin" component={signIn} />
            <Route exact path="/new" component={newRestaurant} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/detail/:id/edit" component={Edit} />
            </div>
          </div>
        </div>
          </BrowserRouter>


    );
  }
}

export default App;
