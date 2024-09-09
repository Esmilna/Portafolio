import React, { useEffect, useState } from 'react';
import './OrderDetails.css';
import { Card, CardBody, Row, Col, CardFooter } from 'reactstrap';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getCurrentOrder } from '../../../helpers/saleHelpers';
import Loading from '../../Loading/Loading';
import Order from '../Order';
import OrderItem from './OrderItem';
import EditOrderForm from './EditOrderForm';

function OrderDetails({ editOrder, isSubmitting }) {
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState()
    const { id } = useParams()

    useEffect(() => {
        getCurrentOrder(id)
            .then(data => {
                setOrder(data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <Loading />

    if (!order) return <Navigate to={"/404"} />

    return (
        <div>
            <h1>Detalles de la orden</h1>

            <Card style={{ marginBottom: '30px' }}>
                <CardBody>
                    <Order order={order} showDetails={false} />
                    <Row>
                        <Col className="">
                            <Row>
                                <Col className="margenSuperior" md="12">
                                    <div>
                                        <h4>Articulos {`(${order.detalles["$values"].length})`}</h4>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                    {
                        order.detalles["$values"].map(item => <OrderItem item={item} key={item["$id"]} />)
                    }
                    {
                        editOrder && <EditOrderForm editOrder={editOrder} id={id} isSubmitting={isSubmitting} />
                    }
                </CardBody>
                <CardFooter>
                    <Link className='text-dark text-decoration-none fw-bold' to={"/orders"}>{"<"} Volver al listado de ordenes</Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default OrderDetails