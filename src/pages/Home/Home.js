import React, { useEffect, useState } from 'react';
import './Home.css';
import homeBg from '../../assets/61Ypo7Ph1kL._SX3000_.jpg'
import Product from '../../components/Product/Product';
import axios from 'axios';
import Header from '../../components/Header/Header';


function Home() {
    const [content, setContent] = useState([]);


    const fetchProduct = async () => {
        const { data } = await axios.get(`https://fakestoreapi.com/products?limit=12`);

        setContent(data);
    }

    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line
    }, []);

    



    return (
        <>
        <Header/>
        <div className="home">
            <div className="home__container">
                <img className="home__image" src={homeBg} alt="" />
                <div className="row">
                    {
                        content.map((c, idx) => (
                            <div className="col-md-3 mb-4" key={idx} >
                                <div className="item">
                                    <Product title={c.title} price={c.price} image={c.image} id={c.id} rating={c.rating.rate.toFixed()}/>
                                </div>

                            </div>
                        ))
                    }

                </div>
            </div>
        </div >
        </>
    )
}

export default Home
