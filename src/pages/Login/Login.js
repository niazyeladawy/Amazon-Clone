import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Amazon_logo.svg';
import { auth } from '../../firebase';
import './Login.css';


function Login() {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    navigate('/');
                }

            })
            .catch(error => console.error(error));

    }

    return (
        <div className="login">
            <Link to="/">
                <img src={logo} alt="logo" className="login__logo" />
            </Link>
            <div className="login__container">
                <h1>Sign-In</h1>
                <h5>Email</h5>
                <input type="email" className="w-100 mb-2 form-control" value={email} onChange={e => setEmail(e.target.value)} />
                <h5>Password</h5>
                <input type="password" className="w-100 mb-2 form-control" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="w-100 btn login__button mt-3" type="submit" onClick={signIn}>Signin</button>
                <p>By signing in, you agree to Amazon fake clone Conditions of Use and Privacy Notice.</p>
                <Link to='/register' className="btn w-100 mt-3 login__registerbutton " >Create Your Amazon Account</Link>
            </div>
        </div>
    )
}

export default Login
