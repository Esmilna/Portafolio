import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import CheckoutUserForm from './CheckoutUserForm/CheckoutUserForm';
import CheckoutOrderConfirmation from './CheckoutOrderConfirmation/CheckoutOrderConfirmation';
import "./Checkout.css";
import CheckoutSuccessful from './CheckoutSuccessful/CheckoutSuccessful';


function Checkout() {
    const [formData, setFormData] = useState()
    const [step, setStep] = useState(1)

    const cart = JSON.parse(localStorage.getItem("cart"))

    const forwardStep = () => {
        setStep(prevState => prevState + 1)
    }

    if(step === 1){
        return <CheckoutUserForm forwardStep={forwardStep} updateData={setFormData} cart={cart}/>
    }

    if(step === 2) {
        return <CheckoutOrderConfirmation forwardStep={forwardStep} formData={formData} cart={cart} />
    }

    if (step === 3) {
        return <CheckoutSuccessful />
    }

    return <Navigate to="/404" />
}

export default Checkout