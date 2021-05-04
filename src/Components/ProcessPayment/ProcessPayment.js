import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "../SimpleCardForm/SimpleCardForm";

const stripePromise = loadStripe(
  "pk_test_51Ie0yhLkUal5xLL58n0wLGcBd7uQN5IgMwN1Zdgv2d1gEbIKGA7qEvncIG7fYqon4rEzUXpMZkUdCNJYRmbxOaBC00IZx9UhAp"
);

const ProcessPayment = ({handlePaymentSuccess}) => {
  return (
    <Elements stripe={stripePromise}>
       <SimpleCardForm handlePaymentSuccess={handlePaymentSuccess}></SimpleCardForm>
    </Elements>
  );
};

export default ProcessPayment;
