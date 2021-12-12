import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Order from '../../components/Order/Order';
import { useStateValue } from '../../StateProvider';
import Header from '../../components/Header/Header';

function Orders() {

    const [{ user }, ] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        if (user) {
            db.collection("users").doc(user?.uid).collection("orders").orderBy("created", 'desc').onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
        else {
            setOrders([]);
        }

    }, [user])

    return (
        <>
            <Header />
            <div className="orders">
                <div className="container">
                    <h1 className="my-4">Your Orders</h1>

                    <div className="orders__order">
                        {
                            orders?.map((order,idx) => (
                                <Order key={idx} order={order} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders
