

import React from 'react'
import { Col, Row } from 'reactstrap'

function OrderItem({ item }) {
    return (
        <Row>
            <Col md="3">
                <img className='w-100 border-0' width={120} height={120} src={item.image} alt={item.nombre} />
            </Col>
            <Col md="3">
                <p><strong>{item.nombre}</strong></p>
                <p>Color:<span className='fw-bold'> Rojo</span></p>
            </Col>
            <Col md="6">
                <p>
                    <span className='text-muted'>{item.precio} x {item.cantidad} = </span>
                    <span className='fw-bold'>${(item.precio * item.cantidad).toLocaleString()}</span>
                </p>
            </Col>
            <hr className='my-3' />
        </Row>
    )
}

export default OrderItem