import React, { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        show: false
    }

    showBackdropForSideDrawerHandler = () => {
        this.setState({show:false})
    }

    showSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {show: !prevState.show}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar isAuth = {this.props.isAuthenticated} clicked = {this.showSideDrawerHandler}/>
                <SideDrawer 
                    isAuth = {this.props.isAuthenticated}
                    toShow = {this.state.show} 
                    backdropClickedHandler = {this.showBackdropForSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);