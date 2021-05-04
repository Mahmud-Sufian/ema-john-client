import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Header/Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import image from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const history = useHistory();
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch(`https://secret-shelf-09219.herokuapp.com/productByKeys`, {
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data)) 
         
    },[])

    const handleProceedCheckOut = () => {
         history.push('/shipment');
    }

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={image} alt=""/>
    }

    const handleRemoveItem = (product) => {
        const newCart = cart.filter(pd => pd.key !== product);
        setCart(newCart);
        removeFromDatabaseCart(product);
        // console.log("click", product)
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(crt => <ReviewItems handleRemoveItem={handleRemoveItem} key={crt.key} crt={crt}></ReviewItems>)
                }
                 {thankYou}
            </div>
            
            <div className="cart-container">
                <Cart cart={cart}><button onClick={handleProceedCheckOut} className="myBtn">Proceed CheckOut</button></Cart>
            </div>
            
        </div>
    );
};

export default Review;