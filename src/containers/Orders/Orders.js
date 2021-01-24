import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render () {
        let orders = <Spinner />
        if(!this.props.orderFetchLoading){
            // console.log("sandeep");
            orders = this.props.orders.map(order => (
                            <Order 
                                key={order.id + " " + order.price} // Just for getting unique key ( Id is also
                                //  unique but while clicking orders this render method gets executed quickly
                                //  before setting this.props.loading hence we need a diff unique key, 
                                // thats y i have applied like this)
                                ingredients={order.ingredients}
                                price={order.price} />
             ))// here you can also use as 
             // price = {+order.price} since price is stored as sring in firebase as + signs converts to number
        }
        return orders;
    }
}

const mapStateToProps = (state) => {
    return{
        orders: state.order.orders,
        orderFetchLoading: state.order.orderFetchLoading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

// export default withErrorHandler(Orders, axios);
export default connect(mapStateToProps, mapDispatchToProps)(Orders);