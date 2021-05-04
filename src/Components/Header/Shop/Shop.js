import React, { useEffect, useState } from 'react';
import './Shop.css';
 
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
     
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState(' ');

    useEffect(() => {
        fetch(`https://secret-shelf-09219.herokuapp.com/getProduct?search=`+search)
        .then(res => res.json())
        .then(data => setProducts(data))
    },[search])

    useEffect(() => {
        const saveData = getDatabaseCart();
        const productKeys = Object.keys(saveData);

        fetch(`https://secret-shelf-09219.herokuapp.com/productByKeys`, {
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data)) 
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);

        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const other = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...other, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)

        // const newCart = [...cart, product];
        // setCart(newCart); 
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        // addToDatabaseCart(product.key, count)
    }

    const handleSearch = (event) => {
        setSearch(event.target.value);
        document.getElementById('searchID').value = ' ';
    }

    return (
        <div className="twin-container">
            <div className="product-container">
            <input type="text" onBlur={handleSearch} id="searchID" placeholder="search item"/>
                {
                    products.length === 0 && <p>loading...</p>
                }
                { 
                    products.map(pd => <Product key={pd.key} showAddToButton={true} product={pd} handleAddProduct={handleAddProduct}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="myBtn">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;