import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { modelSchema } from '../../../helpers/formsSchema'
import { useFormik } from 'formik'
import { useAlert } from '../../Context/AlertContext'
import FormFeedBackError from '../../Form/FormFeedBackError'
import SubmitButton from '../../Form/SubmitButton'
import { createModel, getBrands } from '../../../helpers/carHelpers'
import Loading from '../../Loading/Loading'
import { useNavigate } from 'react-router-dom'

function AddModel() {
    const [loading, setLoading] = useState(true)
    const [brandData, setBrandData] = useState([])
    const { showAlert } = useAlert();
    const navigate = useNavigate()

    useEffect(() => {
        getBrands()
            .then(data => setBrandData(data))
            .catch(() => showAlert("danger", "Ha ocurrido un problema! Contacte con el soporte."))
            .finally(() => setLoading(false))
    },[showAlert])

    const formik = useFormik({
        initialValues: { name: '', brandID: ''},
        validationSchema: modelSchema,
        onSubmit: (values) => {

            const request = {
                Nombre: values.name,
                BrandID: values.brandID
            }

            const token = localStorage.getItem("token")

            if(token){
                createModel(request)
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
                    .finally(() => formik.setSubmitting(false))
            }else{
                showAlert("danger", "Su sesion ha expirado, por favor inicie sesión!")
            }
        }
    })

    if (loading){
        return <Loading />
    }

    return (
        <div className='container-fluid'>
            <h1>Agregar Modelo</h1>
            <Row>
                <Col>
                    <Card body className='shadow'>
                        <CardTitle><h2 className='fw-bold'>Crear Modelo</h2></CardTitle>
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
                                    <Col>
                                        <FormGroup>
                                            <Label for='brandID'>Marca</Label>
                                            <Input id='brandID'
                                             name='brandID'
                                             type='select'
                                             placeholder='Toyota'
                                             defaultValue={formik.values.brandID}
                                             invalid={formik.touched.brandID && Boolean(formik.errors.brandID)}
                                             onChange={formik.handleChange}
                                            >
                                                <option value="">Elije una marca...</option>
                                                {
                                                    brandData.map(brand => <option key={brand.id} value={brand.id}>{brand.nombre}</option>)
                                                }
                                            </Input>
                                            <FormFeedBackError error={formik.errors.brandID} touched={formik.errors.brandID} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                
                                <Row className='justify-content-between mt-3'>
                                    <Col>
                                        <Button size='lg' onClick={() => navigate(-1)} color='danger'>Cancelar</Button>
                                    </Col>
                                    <Col>
                                        <SubmitButton text={"Agregar"} loading={formik.isSubmitting}/>
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

export default AddModel