import moment from 'moment';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import CheckOutProduct from '../CheckoutProduct/CheckOutProduct';
import './Order.css';

function Order({ order }) {
    return (
        <div className="order position-relative my-4">
            <div className="container bg-white p-3">
                <h2>Order</h2>
                <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
                <p className="order__id"><small>{order.id}</small></p>
                {
                    order.data.basket?.map((item,idx) => (
                        <CheckOutProduct key={idx} id={item.id} title={item.title} image={item.image} rating={item.rating} price={item.price} hideButton />
                    ))
                }
                <CurrencyFormat
                    value={order.data.amount / 100} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>
                        <p className="order__total text-end">order total :
                            <strong>{value}</strong>
                        </p>
                    </>}
                    decimalScale={2}
                />
            </div>
        </div>
    )
}

export default Order
