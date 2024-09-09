
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'

function Order({ order, showDetails = true }) {
    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }

    const date = new Date(order.FechaVenta);
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    const parsedDate = new Intl.DateTimeFormat("es", options).format(new Date(Date.UTC(year, month, day)))

    return (
        <Card
            style={{
                marginBottom: '30px'
            }}
            key={order.ID}
        >
            <CardBody className='bg-light'>
                <Row>
                    <Col md="3">
                        <div>
                            <p>NUMERO DE ORDEN:</p>
                            <p><strong>{order.ID}</strong></p>
                        </div>
                    </Col>
                    <Col md="3">
                        <div>
                            <p>Fecha del pedido:</p>
                            {/* <p><strong>{new Intl.DateTimeFormat("es").format(Date(order.FechaVenta))}</strong></p> */}
                            <p><strong>{parsedDate}</strong></p>
                        </div>
                    </Col>
                    <Col md="3">
                        <div>
                            <p>ESTADO</p>
                            <p><strong>{order.Estatus}</strong></p>
                        </div>
                    </Col>
                    <Col md="3">
                        <div>
                            <p>MONTO TOTAL</p>
                            <p><strong>${order.Total.toLocaleString()}</strong></p>
                        </div>
                    </Col>
                </Row>

                {showDetails &&
                    <Row className='justify-content-end align-items-center'>
                        <Col md="3">
                            <Button tag={Link} to={`/orders/details/${order.ID}`} outline color="dark" className="Borde d-block ms-auto" >
                                Más Detalles
                            </Button>
                            {' '}
                        </Col>
                    </Row>
                }
            </CardBody>
        </Card>
    )
}

export default Order