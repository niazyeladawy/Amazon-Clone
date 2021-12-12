import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CheckOut from './pages/Checkout/CheckOut';
import { auth } from './firebase';
import Home from './pages/Home/Home';
import Orders from './pages/Orders/Orders';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Payment from './pages/Payment/Payment';
import { useStateValue } from './StateProvider';

const promise = loadStripe('pk_test_51K1ZESINl8dFKcxclc9zUXeYJIG8Ny6qYFSk1rVfRUlbckp0MDicGU5zsyxoNSqaKNTyU1actst3XFAU8SJGJPO400kv4Lmvid');

function App() {

  const [, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          dispatch({
            type: "SET_USER",
            user: authUser
          })
        }
        else {
          dispatch({
            type: "SET_USER",
            user: null
          })
        }
      }
    )
    // eslint-disable-next-line
  }, [])
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/payment" element={<><Elements stripe={promise}>
            <Payment />
          </Elements></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
