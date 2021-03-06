import React from 'react';
 


const Inventory = () => {

    
    const handleAddProduct = () => {
        const product = {};
        fetch(`https://secret-shelf-09219.herokuapp.com/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    return (
        <div>
          <form action="">
              <p><span>Name :  </span> <input type="text" /></p>
              <p><span>Price : </span> <input type="text" /></p>
              <p><span>Quantity : </span> <input type="text" /></p>
              <p><span>Product image : </span> <input type="file" /></p>
             <button onClick={handleAddProduct}>Add Product</button>
          </form>
        </div>
    );
};

export default Inventory;