import React from 'react';
import './ReviewItems.css'

const ReviewItems = (props) => {
    const {name, quantity, key, price} = props.crt
    return (
        <div className="single-review">
            <h4>{name}</h4>
            <p><small>Price : $ {price}</small></p>
            <p>Quantity : {quantity}</p>
            <button className="myBtn" onClick={() => props.handleRemoveItem(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItems;