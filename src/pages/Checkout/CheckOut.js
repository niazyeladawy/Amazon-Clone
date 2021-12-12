import React from 'react';
import './CheckOut.css';
import CheckOutProduct from '../../components/CheckoutProduct/CheckOutProduct';
import { useStateValue } from '../../StateProvider';
import Subtotal from '../../components/Subtotal/Subtotal';
import Header from '../../components/Header/Header';


function CheckOut() {
    const [{ basket,user }] = useStateValue();



    return (
        <>
            <Header />
            <div className="checkout p-4">
                <div className='row '>
                    <div className='col-md-10'>
                        <div className="item bg-white p-3 ">
                            <h3>hello,  {user?.email}</h3>
                            <h2 className="checkout__title">Your Cart</h2>
                            {
                                basket && basket.map((item, idx) => (
                                    <div className="d-flex basket__item py-4" key={idx}>
                                        <CheckOutProduct id={item.id} title={item.title} image={item.image} rating={item.rating} price={item.price} />
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="item bg-white py-3 px-2">
                            <Subtotal />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CheckOut
