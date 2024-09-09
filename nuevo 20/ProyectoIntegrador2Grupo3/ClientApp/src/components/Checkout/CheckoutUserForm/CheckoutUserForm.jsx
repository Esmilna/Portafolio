import React, { useEffect, useState } from 'react';
import "./CheckoutUserForm.css";
import { Formik } from 'formik';
import { getCurrentUser } from '../../../helpers/userHelpers';
import { useAlert } from '../../Context/AlertContext';
import Loading from '../../Loading/Loading';
import { checkoutUserInformationSchema } from '../../../helpers/formsSchema';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import FormFeedBackError from '../../Form/FormFeedBackError';
import { Navigate } from 'react-router-dom';
import ProductsSummary from '../ProductsSummary';
import SubmitButton from '../../Form/SubmitButton';

function CheckoutUserForm({forwardStep, updateData, cart}) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const { showAlert } = useAlert()

    useEffect(() => {
        getCurrentUser()
            .then(data => {
                console.log(data)
                setUser(data)
            })
            .catch(err => showAlert("danger", err.message))
            .finally(() => {
                setLoading(false)
            })
    },[showAlert])

    if(loading){
        return <Loading />
    }

    if(!cart){
        return <Navigate to="/404" />
    }

    return (

        <div className="maincontainer">
            <div className="container">
                <div className="py-5 text-center">
                    <h2>Formulario de pago</h2>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <h4 className="mb-3">Información de envio</h4>
                        <Formik
                         initialValues={{
                            name: user.nombre,
                            lastName: user.apellido,
                            address: user.direccion,
                            phone: user.telefono,
                            payment: "efectivo"
                         }}
                         validationSchema={checkoutUserInformationSchema}
                         onSubmit={values => {
                            updateData(values)
                            forwardStep(2)
                         }}
                        >
                        {({handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting}) => (
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6} className='mb-3'>
                                        <FormGroup>
                                            <Label for='name'>Nombre</Label>
                                            <Input 
                                                id='name'
                                                name='name'
                                                defaultValue={values.name}
                                                invalid={touched.name && Boolean(errors.name)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <FormFeedBackError error={errors.name} touched={touched.name} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} className='mb-3'>
                                        <FormGroup>
                                            <Label for='lastname'>Apellido</Label>
                                            <Input 
                                                id='lastname'
                                                name='lastname'
                                                defaultValue={values.lastName}
                                                invalid={touched.lastName && Boolean(errors.lastName)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <FormFeedBackError error={errors.lastName} touched={touched.lastName} />
                                        </FormGroup>
                                    </Col>
                                    <FormGroup>
                                        <Label for='address'>Dirección</Label>
                                        <Input 
                                            id='address'
                                            name='address'
                                            defaultValue={values.address}
                                            invalid={touched.address && Boolean(errors.address)}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type="textarea"
                                        />
                                        <FormFeedBackError error={errors.address} touched={touched.address} />
                                    </FormGroup>
                                    <Col className='mb-3'>
                                        <FormGroup>
                                            <Label for='phone'>Teléfono</Label>
                                            <Input 
                                                id='phone'
                                                name='phone'
                                                defaultValue={values.phone}
                                                invalid={touched.phone && Boolean(errors.phone)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <FormFeedBackError error={errors.phone} touched={touched.phone} />
                                        </FormGroup>
                                    </Col>
                                    <hr className="mb-4" />
                                    <h4 className="mb-3">Métodos de pago</h4>
                                    <FormGroup>
                                        <Label for='payment'>Metodo de pago</Label>
                                        <Input
                                            id='payment'
                                            name='payment'
                                            defaultValue={values.payment}
                                            onChange={handleChange}
                                            invalid={touched.payment && Boolean(errors.payment)}
                                            type="select"
                                        >
                                            <option value="efectivo">Efectivo</option>
                                        </Input>

                                        <FormFeedBackError error={errors.payment} touched={touched.payment} />
                                    </FormGroup>

                                    <hr className="mb-4" />

                                    <SubmitButton text={"Continuar"} loading={isSubmitting} />
                                </Row>
                            </Form>
                        )}
                        </Formik>
                    </div>
                    <ProductsSummary cart={cart}/>
                </div>
            </div>
        </div>
    );
}

export default CheckoutUserForm;