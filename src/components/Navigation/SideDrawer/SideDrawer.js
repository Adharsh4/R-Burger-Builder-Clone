import React from 'react';
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxx';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.toShow){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop 
                toShow = {props.toShow} 
                backdropClicked = {props.backdropClickedHandler}
                /> 
                {/* //backdrop should be under the screen so adding at top */}
            <div className={attachedClasses.join(' ')} onClick={props.backdropClickedHandler}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav><NavigationItems isAuthenticated = {props.isAuth}/></nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;