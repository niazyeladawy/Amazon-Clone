import React from 'react'
import { useStateValue } from '../../StateProvider';

const CheckOutProduct = ({ title, price, image, rating, id,hideButton }) => {

    const [, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            item: {
                id: id,
            },
        });
    }
    return (
        <>

            <img src={image} alt={title} className="checkout__image mx-4" />
            <div className="mt-3">
                <h4>{title}</h4>
                <p>{
                    ("⭐").repeat(rating)
                }</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                {
                    !hideButton && <button className="remove__basket" onClick={removeFromBasket}>Remove from cart</button>
                }
                
            </div>

        </>
    )
}

export default CheckOutProduct
