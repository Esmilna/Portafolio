import React, { useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { clientSchema } from '../../../helpers/formsSchema'
import { useFormik } from 'formik'
import { useAlert } from '../../Context/AlertContext'
import FormFeedBackError from '../../Form/FormFeedBackError'
import SubmitButton from '../../Form/SubmitButton'
import { useNavigate } from 'react-router-dom'

function AddClient() {
    const [loading, setLoading] = useState(false)
    const { showAlert } = useAlert();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            address: '',
            phone: ''
        },
        validationSchema: clientSchema,
        onSubmit: (values) => {
            setLoading(true)

            const request = {
                Nombre: values.name,
                Apellido: values.lastName,
                Correo: values.email,
                Direccion: values.address,
                Telefono: values.phone
            }

            const token = localStorage.getItem("token")

            if(token){
                fetch("api/client", {
                    method: "POST",
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                    body: JSON.stringify(request)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.success){
                        showAlert("success", data.message)
                    }else{
                        showAlert("danger", data.message)
                    }
                })
                .catch(err => {
                    showAlert("danger", err.message)
                })
                .finally(() => setLoading(false))
            }else{
                showAlert("danger", "Su sesion ha expirado, por favor inicie sesión!")
            }
        }
    })

    return (
        <div className='container-fluid'>
            <h1>Agregar Cliente</h1>
            <Row>
                <Col>
                    <Card body className='shadow'>
                        <CardTitle><h2 className='fw-bold'>Crear Cliente</h2></CardTitle>
                        <CardBody className='p-0'>
                            <Form onSubmit={formik.handleSubmit}>
                                <Row>
                                    <Col lg={4} md={6} sm={12}>
                                        <FormGroup>
                                            <Label for='name'>Nombre</Label>
                                            <Input id='name'
                                             name='name'
                                             placeholder='Joe'
                                             defaultValue={formik.values.name}
                                             invalid={formik.touched.name && Boolean(formik.errors.name)}
                                             onChange={formik.handleChange}
                                            />
                                            <FormFeedBackError error={formik.errors.name} touched={formik.errors.name} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={4} md={6} sm={12}>
                                        <FormGroup>
                                            <Label for='lastName'>Apellido</Label>
                                            <Input id='lastName'
                                             name='lastName'
                                             placeholder='Dan'
                                             defaultValue={formik.values.lastName}
                                             invalid={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                             onChange={formik.handleChange}
                                            />
                                            <FormFeedBackError error={formik.errors.lastName} touched={formik.errors.lastName} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={4} md={6} sm={12}>
                                        <FormGroup>
                                            <Label for='email'>Email</Label>
                                            <Input id='email'
                                             name='email'
                                             type='email'
                                             placeholder='mail@example.com'
                                             defaultValue={formik.values.email}
                                             invalid={formik.touched.email && Boolean(formik.errors.email)}
                                             onChange={formik.handleChange}
                                            />
                                            <FormFeedBackError error={formik.errors.email} touched={formik.errors.email} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={4} md={6} sm={12}>
                                        <FormGroup>
                                            <Label for='address'>Dirección</Label>
                                            <Input id='address'
                                             name='address'
                                             placeholder='Calle Costa Rica #35, Ensanche ozama'
                                             defaultValue={formik.values.address}
                                             invalid={formik.touched.address && Boolean(formik.errors.address)}
                                             onChange={formik.handleChange}
                                            />
                                            <FormFeedBackError error={formik.errors.address} touched={formik.errors.address} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={4} md={6} sm={12}>
                                        <FormGroup>
                                            <Label for='phone'>Telefono</Label>
                                            <Input id='phone'
                                             name='phone'
                                             placeholder='555-555-5555'
                                             defaultValue={formik.values.phone}
                                             invalid={formik.touched.phone && Boolean(formik.errors.phone)}
                                             onChange={formik.handleChange}
                                            />
                                            <FormFeedBackError error={formik.errors.phone} touched={formik.errors.phone} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className='justify-content-between mt-3'>
                                    <Col>
                                        <Button size='lg' onClick={() => navigate(-1)} color='danger'>Cancelar</Button>
                                    </Col>
                                    <Col>
                                        <SubmitButton text={"Añadir"} loading={loading}/>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default AddClient