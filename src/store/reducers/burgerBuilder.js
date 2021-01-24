import * as actionTypes from '../actions/actionTypes';


const INGREDIENT_PRICES = {
    salad: 20,
    bacon: 50,
    cheese: 40,
    meat: 70
}

const initialState = {
    ingredients: null,
    totalPrice: 15,
    error: false,
    building: false // this property is to check if user added ingredient and licked signup to order , the added ingredient should remaing and after singup he should be redirected to checkout page, thats y this property is usefull
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 
                    // ES6 feature of assigning value for a particular key of an object
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients, // if we assign like this the order in which 
                // ingredients will be added is the same order that is stored in firebase.Alternative can be assigning like
                // ingredients: {
                //     salad: action.ingredients.salad,
                //     bacon: action.ingredients.bacon, 
                //     and so on...
                // }
                totalPrice: initialState.totalPrice,
                error: false, //just to reassign error at start to false
                building: false
            };
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return{
                ...state,
                error: true
            }
        default:
            return state;    
    }
}

export default reducer;