import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router';
import { getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import './Subtotal.css';

function Subtotal() {
    const [{ basket }] = useStateValue();
    
    let navigate = useNavigate();
   

    return (
        <div className="subtotal">
            <CurrencyFormat
                value={getBasketTotal(basket)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>
                    <p>Subtotal ({basket.length} items) :
                    <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox" className="me-2"/> this order contains a gift
                    </small>
                </>}
                decimalScale={2}
            />
            <button className="rounded-pill mt-3" onClick={(e)=> navigate("/payment")}>Proceed to Buy</button>
        </div>
    )
}

export default Subtotal
