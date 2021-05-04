import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Product from '../Header/Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});


    useEffect(() => {
        fetch(`https://secret-shelf-09219.herokuapp.com/getSingleProduct/${productKey}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])

    
   

    return (
        <div>
            <h1>{productKey} sooon</h1>
            <Product showAddToButton={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;