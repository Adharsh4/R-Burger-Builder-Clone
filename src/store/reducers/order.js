import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    orderFetchLoading: true
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderID}) // This can be done like we did for burgerBuilder.js, like without using updateObject utility function
            //  file in reducer also but just for reference i have it in both way. One way in burgerBuilder.js and 
            // other way(with help of uitility function) in order.js
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder)
    });
}

const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, {loading: false});
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {loading: true})
}



const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        orderFetchLoading: false
    });
}

const fetchOrdersFailed = (state, action) => {
    return updateObject(state, {orderFetchLoading: false});
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, {orderFetchLoading: true})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED:
            return purchaseBurgerFailed(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailed(state, action);
        default:
            return state;
    }
}

export default reducer;



// case actionTypes.PURCHASE_BURGER_SUCCESS:
//             const newOrder = updateObject(action.orderData, {id: action.orderID}) // This can be done for burgerBuilder.js
//             //  file in reducer also but just for reference i have it in both way. One way in burgerBuilder.js and 
//             // other way(with help of uitility function) in order.js
//             return updateObject(state, {
//                 loading: false,
//                 orders: state.orders.concat(newOrder)
//             });
//         case actionTypes.PURCHASE_BURGER_FAILED:
//             return{
//                 ...state,
//                 loading: false
//             };
//         case actionTypes.PURCHASE_BURGER_START:
//             return updateObject(state, {loading: true})
//         case actionTypes.FETCH_ORDERS_START:
//             return{
//                 ...state,
//                 loading: true
//             };
//         case actionTypes.FETCH_ORDERS_SUCCESS:
//             return{
//                 ...state,
//                 orders: action.orders,
//                 loading: false
//             };
//         case actionTypes.FETCH_ORDERS_FAILED:
//             return{
//                 ...state,
//                 loading: false
//             };