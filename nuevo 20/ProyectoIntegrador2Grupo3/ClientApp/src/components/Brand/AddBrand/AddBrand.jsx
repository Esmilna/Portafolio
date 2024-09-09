import React, { useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { brandSchema } from '../../../helpers/formsSchema'
import { useFormik } from 'formik'
import { useAlert } from '../../Context/AlertContext'
import FormFeedBackError from '../../Form/FormFeedBackError'
import SubmitButton from '../../Form/SubmitButton'
import { createBrand } from '../../../helpers/carHelpers'
import { useNavigate } from 'react-router-dom'

function AddBrand() {
    const [loading, setLoading] = useState(false)
    const { showAlert } = useAlert();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: { name: '' },
        validationSchema: brandSchema,
        onSubmit: (values) => {
            setLoading(true)

            const request = {
                Nombre: values.name,
            }

            const token = localStorage.getItem("token")

            if(token){
                createBrand(request)
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
            <h1>Agregar Marca</h1>
            <Row>
                <Col>
                    <Card body className='shadow'>
                        <CardTitle><h2 className='fw-bold'>Crear Marca</h2></CardTitle>
                        <CardBody className='p-0'>
                            <Form onSubmit={formik.handleSubmit}>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for='name'>Nombre</Label>
                                            <Input id='name'
                                             name='name'
                                             placeholder='Toyota'
                                             defaultValue={formik.values.name}
                                             invalid={formik.touched.name && Boolean(formik.errors.name)}
                                             onChange={formik.handleChange}
                                            />
                                            <FormFeedBackError error={formik.errors.name} touched={formik.errors.name} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className='justify-content-between mt-3'>
                                    <Col>
                                        <Button size='lg' onClick={() => navigate(-1)} color='danger'>Cancelar</Button>
                                    </Col>
                                    <Col>
                                        <SubmitButton text={"Agregar"} loading={loading}/>
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

export default AddBrand