import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props)
     const {name, img, price, seller, stock, key} = props.product;
    return (
        <div className="single-product">
            <img src={img} alt=""/>
            <div className="product-body">
            <h3><Link to={"/product/"+key}>{name}</Link></h3>
            <br/>
            <p><small>by: {seller}</small></p>
            <br/>
            <p>${price}</p>
            <p>Only {stock} Left in Stock - Order Soon.</p>
            {props.showAddToButton && <button className="myBtn" onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</button>}
            </div>
        </div>
    );
};

export default Product;