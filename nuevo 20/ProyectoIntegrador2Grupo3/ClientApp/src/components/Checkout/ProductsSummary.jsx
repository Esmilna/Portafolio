import React from 'react'

function ProductsSummary({ cart }) {
    return (
        <div className="col-md-4 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold">Resumen del pedido</span>
            </h4>
            <ul className="list-group mb-3">
                {
                    cart.map(item => (
                        <li className="list-group-item d-flex justify-content-between lh-condensed" key={item.id}>
                            <div>
                                <h6 className="my-0">{item.nombre}</h6>
                                <small className="text-muted">Unidades: {item.cantidad}</small>
                            </div>
                            <span className="text-muted">${(item.cantidad * item.precio).toLocaleString()}</span>
                        </li>
                    ))
                }
               
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total:</span>
                    <strong>${cart.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0).toLocaleString()}</strong>
                </li>
            </ul>
        </div>
    )
}

export default ProductsSummary