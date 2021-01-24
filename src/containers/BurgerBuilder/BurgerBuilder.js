import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/Buildcontrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component { // here e write export just for testing 

    state = {
        toShowSummary: false
    } // we can also use constructor to  set the state

    componentDidMount(){
        this.props.setIngredientToInitial(); // here if you dont want to execute Asyn code using redux-thunk 
        // you can also hardcode it in burgerBuilder reducer and using only reducer and redux and without using redux-thunk you can do
    }

    summaryHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({toShowSummary: true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push("/auth"); 
        }
    }

    backdropHandler = () => {
        this.setState({toShowSummary: false})
    }

    continueClickHandler = () => {
        this.props.history.push("/checkout");
    }

    updatePurchaseState(updatedIngredients){
        const sum = Object.keys(updatedIngredients).map((ingredient) => {
            return updatedIngredients[ingredient];
        }).reduce((sumValue, element) => {
            return sumValue + element;
        }, 0);
        return sum > 0;
    }   

    render() {
        
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger_and_buildControls = <Spinner />
        if(this.props.ings){ // We do like this because fetching ingredient state value 
            //takes a fraction of seconds, so only after getting ingredients we can render these components 
            //because the below enclosed components uses the state ingredients.
            burger_and_buildControls = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                        <BuildControls 
                            isAuth = {this.props.isAuthenticated}
                            ingredientAdded = {this.props.onIngredientAdded} 
                            //Since in buildControls we are passing the ingredientName we dont pass it here to 
                            // this.props.onIngredientAdded, At any one place whereever our argument value is accessible 
                            // we can pass the argument value
                            ingredientRemoved = {this.props.onIngredientRemoved} 
                            disabled = {disabledInfo}
                            price = {this.props.price}
                            purchasable = {this.updatePurchaseState(this.props.ings)}
                            clickSummary = {this.summaryHandler}/>
                </Aux>);
            orderSummary = <OrderSummary 
                ingredients = {this.props.ings} 
                cancelClicked = {this.backdropHandler} 
                continueClicked = {this.continueClickHandler}
                price = {this.props.price}/>
        }
        
        // if(this.state.loading){
        //     orderSummary = <Spinner />
        // } // we dont need thos here because we are not running any 
                    // asyn code in this file. Asyn code is handled using redux-thunk
        return ( 
            <Aux>
                <Modal toShow = {this.state.toShowSummary} backdropClicked = {this.backdropHandler}>
                    {orderSummary}
                </Modal>
                {burger_and_buildControls}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        setIngredientToInitial: () => dispatch(actions.setIngredientToInitial()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);