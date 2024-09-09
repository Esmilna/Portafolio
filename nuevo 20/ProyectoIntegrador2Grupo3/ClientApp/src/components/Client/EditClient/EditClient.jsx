import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { editClient, getClientById } from '../../../helpers/clientHelpers'
import { clientSchema } from '../../../helpers/formsSchema'
import { useAlert } from '../../Context/AlertContext'
import Loading from '../../Loading/Loading'
import SubmitButton from '../../Form/SubmitButton'
import FormFeedBackError from '../../Form/FormFeedBackError'

function EditClient() {
    const [clientData, setClientData] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    const { showAlert } = useAlert();

    useEffect(() => {
        getClientById(id)
         .then(data => {
            if(data.success){
                setClientData(data.client)
            }else{
                setClientData(null)
            }
         })
         .catch(err => console.error(err))
         .finally(() => setLoading(false))
    }, [id])

    if(loading){
        return <Loading/>
    }

    if(!clientData){
        return <Navigate to="/404" replace />
    }

    return (
        <div className='container-fluid'>
            <h1>Editar Cliente</h1>
            <Row>
                <Col>
                    <Card body className='shadow'>
                        <CardTitle>
                            <h2 className='fw-bold'>Editar Cliente</h2>
                        </CardTitle>
                        <CardBody className='p-0'>
                            <Formik
                             initialValues={{
                                name: clientData.nombre,
                                lastName: clientData.apellido,
                                email: clientData.correo,
                                address: clientData.direccion,
                                phone: clientData.telefono
                             }}
                             validationSchema={clientSchema}
                             onSubmit={async (values) => {
                                const request = {
                                    Nombre: values.name,
                                    Apellido: values.lastName,
                                    Correo: values.email,
                                    Direccion: values.address,
                                    Telefono: values.phone
                                }
                                await editClient(id, request).then(data => {
                                    if(data.success){
                                        showAlert("success", data.message)
                                    }else{
                                        showAlert("danger", data.message)
                                    }
                                })
                                .finally(() => {})
                             }}
                            >
                            {({handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting}) => (
                                <Form onSubmit={(e) => {e.preventDefault(); handleSubmit(e)}}>
                                    <Row>
                                        <Col lg={4} md={6} sm={12}>
                                            <FormGroup>
                                                <Label for='name'>Nombre</Label>
                                                <Input id='name'
                                                name='name'
                                                placeholder='Joe'
                                                defaultValue={values.name}
                                                invalid={touched.name && Boolean(errors.name)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <FormFeedBackError error={errors.name} touched={touched.name} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={6} sm={12}>
                                            <FormGroup>
                                                <Label for='lastName'>Apellido</Label>
                                                <Input id='lastName'
                                                name='lastName'
                                                placeholder='Dan'
                                                defaultValue={values.lastName}
                                                invalid={touched.lastName && Boolean(errors.lastName)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <FormFeedBackError error={errors.lastName} touched={touched.lastName} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={6} sm={12}>
                                            <FormGroup>
                                                <Label for='email'>Email</Label>
                                                <Input id='email'
                                                name='email'
                                                type='email'
                                                placeholder='mail@example.com'
                                                defaultValue={values.email}
                                                invalid={touched.email && Boolean(errors.email)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <FormFeedBackError error={errors.email} touched={touched.email} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={6} sm={12}>
                                            <FormGroup>
                                                <Label for='address'>Dirección</Label>
                                                <Input id='address'
                                                name='address'
                                                placeholder='Calle Costa Rica #35, Ensanche ozama'
                                                defaultValue={values.address}
                                                invalid={touched.address && Boolean(errors.address)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <FormFeedBackError error={errors.address} touched={touched.address} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4} md={6} sm={12}>
                                            <FormGroup>
                                                <Label for='phone'>Telefono</Label>
                                                <Input id='phone'
                                                name='phone'
                                                placeholder='555-555-5555'
                                                defaultValue={values.phone}
                                                invalid={touched.phone && Boolean(errors.phone)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <FormFeedBackError error={errors.phone} touched={touched.phone} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row className='justify-content-between mt-3'>
                                        <Col>
                                            <Button size='lg' onClick={() => navigate(-1)} color='danger'>Cancelar</Button>
                                        </Col>
                                        <Col>
                                            <SubmitButton text="Guardar cambios" loading={isSubmitting} />
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                            </Formik>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default EditClient
