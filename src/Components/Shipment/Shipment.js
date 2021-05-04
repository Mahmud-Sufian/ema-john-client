import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
  const [loggedIn, setLoggedIn] = useContext(userContext);
  const [shippingData, setShippingData] = useState(null);

    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data =>  {
    setShippingData(data);
  }


  const handlePaymentSuccess = (orderId) => {
    const saveData = getDatabaseCart();
    const orderDetails = {
      ...loggedIn, 
      products: saveData, 
      orderId,
      shipment: shippingData, 
      orderTime: new Date()};

    fetch(`https://secret-shelf-09219.herokuapp.com/addOrder`, {
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        processOrder();
        // alert('your order successfully.. yay')
      }
    })
  }

  console.log(watch("example"));  

  return ( 
    <div className="container">
      <div className="row">
      <div style={{display:shippingData ? 'none' : 'block'}} className="col-md-6">
      <form class="shipment-form" onSubmit={handleSubmit(onSubmit)}>  
      <input name="name" ref={register({ required: true })} placeholder="Your Name" /> 
      {errors.name && <span className="error">This name is required</span>}

      <input name="email" ref={register({ required: true })} placeholder="Your Email" /> 
      {errors.email && <span className="error">This email is required</span>}

      <input name="address" ref={register({ required: true })} placeholder="Your Address" /> 
      {errors.address && <span className="error">This name is required</span>}

      <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" /> 
      {errors.phone && <span className="error">This name is required</span>}
      
      <input type="submit" />
    </form>
      </div>
      <div style={{display:shippingData ? 'block' : 'none'}} className="col-md-6">
        {/* <h3>pay for me...</h3> */}
        <ProcessPayment handlePaymentSuccess={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
    </div>
  );
};

export default Shipment;