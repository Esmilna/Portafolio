import React, { useState } from 'react';
import "./CheckoutOrderConfirmation.css";
import { Card, CardBody, CardHeader, Col, Form, Row } from 'reactstrap';
import ProductsSummary from '../ProductsSummary';
import SubmitButton from '../../Form/SubmitButton';
import { sendOrder } from '../../../helpers/saleHelpers';

function CheckoutOrderConfirmation({formData, cart, forwardStep}) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const orderProcess = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const ProductList = cart.map(item => {
            item.ProductID = item.id
            item.PrecioUnidad = item.precio

            return item;
        })

        const request = {
            ProductList,
            PaymentMethod: formData.payment,
            Direccion: formData.address,
            Telefono: formData.phone
        }

        sendOrder(request)
            .then(() => {
                localStorage.removeItem("cart")
                forwardStep(3)

            })
            .catch(err => console.error(err))
            .finally(setIsSubmitting(false))
    }

    return (
        <div className="maincontainer">
            <div className="container">
                <div className="py-5 text-center">
                    <h2>Confirmación de orden</h2>
                </div>
                <Form onSubmit={orderProcess}>
                    <Row>
                        <Col md="8">
                            <Card>
                                <CardHeader> 
                                    <h4 className="mb-3 fw-bold">Detalles de la orden</h4>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <p><span className='fw-bold'>Cliente: </span>{formData.name} {formData.lastName}</p>
                                            <p className='mb-2'><span className="fw-bold">Dirección: </span> {formData.address}</p>
                                            <p className='mb-3'><span className="fw-bold">Teléfono movil: </span>{formData.phone}</p>
                                        </Col>
                                        <Col>
                                            <h4 className="mb-3 fw-bold">Metodo de pago</h4>
                                            <span>{formData.payment}</span>
                                        </Col>
                                    </Row>
                                    <SubmitButton className="w-100" fullWidth={true} text="Finalizar orden" loading={isSubmitting} />
                                </CardBody>
                            </Card>
                        </Col>
                        
                        <ProductsSummary cart={cart}/>
                    </Row>
                </Form>
            </div>
        </div>



    );
}

export default CheckoutOrderConfirmation;