import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderStartData, token) => { // this token is for allowing only authenticated users to allow purchasing the burger
    return (dispatch) => {
        dispatch(purchaseBurgerStart()) //while starting to fetch the burger we need to set the loading to true to set thr loading screen component load
        axios.post('/orders.json?auth=' + token, orderStartData).then((response) => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderStartData)) // only in response.data.name, firebase has stored the unique id, you can console log to check
        }).catch((error) => {
            dispatch(purchaseBurgerFailed(error))
        })
    }
}




export const fetchOrdersSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    };
}

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        // console.log("adharsh"+token);
        dispatch(fetchOrdersStart()) //while starting to fetch the burger we need to set the loading to true to set thr loading screen component load
        const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"'; // The value should be inside double quotes for firebase and
        //  in firebase also we have to change the rules. If other backend there wont be prob we can hit respective api and get out result
        axios.get('/orders.json'+ queryParams) // we can pass token through argument or also we can use getState that is made available alongside 
        // with dispatch from redux-thunk and this link /orders.json is only applicable for firebase
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key // we store this unique value that was 
                        // stored in firebase so that we can use it as a key while doing a map in the orders array
                    }); 
                }// place this logic in actions and not in reducers as good practice
                // console.log(fetchedOrders);
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err))
            });
    }
}