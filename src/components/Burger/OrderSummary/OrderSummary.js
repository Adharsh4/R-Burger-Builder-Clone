import React from 'react';
import Aux from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientListItems = Object.keys(props.ingredients).map((ingredient) => {
        return (
            <li key = {ingredient}>
                <span style = {{textTransform: "capitalize"}}>
                    {ingredient}:
                </span>
                {props.ingredients[ingredient]}
            </li>
        );
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Your Delicious Burger has the following ingredients:</p>
            <ul>
                {ingredientListItems}
            </ul>
            <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
            <p>Confirm Your Order</p>
            <Button btnType = "Danger" clicked = {props.cancelClicked}>CANCEL</Button>
            <Button btnType = "Success" clicked = {props.continueClicked}>CONTINUE</Button>
        
        </Aux>
    );
}

export default orderSummary;