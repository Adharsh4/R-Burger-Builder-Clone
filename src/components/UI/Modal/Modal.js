import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxx';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.toShow !== this.props.toShow || nextProps.children !== this.props.children;
    }

    render(){
        return(
            <Aux>
                <Backdrop toShow = {this.props.toShow} backdropClicked = {this.props.backdropClicked}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.toShow ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.toShow ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}
export default Modal;