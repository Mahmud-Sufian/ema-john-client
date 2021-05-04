import React from 'react'; 
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart; 
    console.log(cart)

    let total = 0;
    cart.forEach(crt => {
       total = total + crt.price * crt.quantity || 1; 
    });

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }

    const tax = total / 10;

    const formateNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }



    return (
        <div>
            <h3>Items Ordered {cart.length}</h3>
            <p>Product Price : {formateNumber(total)}</p>
            <p>Shipping Cost : {formateNumber(shipping)}</p>
            <p>Tax : {formateNumber(tax)}</p>
            <p>Total Price : {formateNumber(total + shipping + tax)}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;