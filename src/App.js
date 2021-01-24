import React, { Component } from 'react';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';

const asyncCheckout = asyncComponent(() => { // These are just for lazy loading, We dont need checkout,
                                                        //  orders and auth compoentn till it gets clicked or loaded
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path = "/auth" component = {asyncAuth}/>
        <Route path = "/" exact component = {BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path = "/checkout" component = {asyncCheckout}/>
            <Route path = "/orders" component = {asyncOrders} />
            <Route path = "/logout" component = {Logout}/>
            <Route path = "/auth" component = {asyncAuth}/> 
            {/* the above line is included even though auth component has nothing to do with the authenticated user, coz if we dont include
            // this line and after autheticated it should reach the checkout page . 
            // we redirected to checkout page in auth component ,if we dont include here it wonr render 
            // auth component and redirect wont work */}
            <Route path = "/" exact component = {BurgerBuilder}/>
            <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
} // These we have included for placing gaurds for our routes. In react it is simpleif we dont render the component we are implementing gaurd, thats it.

export default withRouter(connect(mapStateToProps)(App)); 
// withRouter is a higher order component that will pass current location path, and history props to the wrapped component whenever it renders
