import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CheckoutSuccessful.css'

function CheckoutSuccessful() {
    const navigate = useNavigate()

    return (
        <div className="payment-success-screen">
            <div className='my-2'>
                <div className="wrapper"> 
                    <svg className="animated-check" viewBox="0 0 24 24">
                    <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" /> </svg>
                </div>
            </div>
            <h1>Pago realizado con exito!</h1>
            <p>Tu transaccion se ha completado correctamente.</p>
            <button className="btn" onClick={() => navigate("/orders")}>Ir a Pedidos</button>
        </div>
    )
}

export default CheckoutSuccessful