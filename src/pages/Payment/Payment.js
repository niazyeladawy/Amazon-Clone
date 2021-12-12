import React, { useEffect, useState } from 'react'
import CheckOutProduct from '../../components/CheckoutProduct/CheckOutProduct';
import { useStateValue } from '../../StateProvider';
import './Payment.css';
import { Link } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../reducer';
import axios from '../../axios';
import { useNavigate } from "react-router-dom";
import { db } from '../../firebase';
import Header from '../../components/Header/Header';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState(null);

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);
    let navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method:"post",
                url:`/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(
            ({paymentIntent})=>{
                // payment confirmation

                db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
                    basket:basket,
                    amount:paymentIntent.amount,
                    created:paymentIntent.created
                })

                setSucceeded(true);
                setError(null);
                setProcessing(false);

                dispatch({
                    type:"EMPTY_BASKET"
                })

                navigate("/orders" , { replace: true })
            }
        )
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }


    return (
        <>
            <Header />
            <div className="payment">
                <div className="container">
                    <h1 className="text-center my-3">Checkout(<Link className="text-decoration-none" to="/checkout">{basket?.length} items</Link>)</h1>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Delivery Address</h3>
                        </div>
                        <div className="payment__address">
                            <p>{user?.email}</p>
                            <p>21 st <br />
                                mansoura , egypt</p>

                        </div>
                    </div>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Review items and delivery</h3>
                        </div>
                        <div className="payment__items">
                            {
                                basket && basket.map((item, idx) => (
                                    <div className="d-flex basket__item py-4" key={idx}>
                                        <CheckOutProduct id={item.id} title={item.title} image={item.image} rating={item.rating} price={item.price} />
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Payment method</h3>
                        </div>
                        <div className="payment__details">
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange} />
                                <div className="payment__pricecontainer">
                                    <CurrencyFormat
                                        value={getBasketTotal(basket)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>
                                            <p className="mt-3">Subtotal ({basket.length} items) :
                                                <strong>{value}</strong>
                                            </p>
                                        </>}
                                        decimalScale={2}
                                    />
                                </div>
                                <button className="rounded-pill payment__button" disabled={processing || disabled || succeeded}><span>{processing ? <p>processing</p> : "Buy now"}</span></button>

                                {error && <div>
                                    {error}
                                </div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Payment
