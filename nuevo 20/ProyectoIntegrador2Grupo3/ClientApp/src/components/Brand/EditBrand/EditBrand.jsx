import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { brandSchema } from '../../../helpers/formsSchema'
import { useAlert } from '../../Context/AlertContext'
import Loading from '../../Loading/Loading'
import SubmitButton from '../../Form/SubmitButton'
import FormFeedBackError from '../../Form/FormFeedBackError'
import { editBrand, getBrandByID } from '../../../helpers/carHelpers'

function EditBrand() {
    const [brandData, setBrandData] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

    const { showAlert } = useAlert();

    useEffect(() => {
        getBrandByID(id)
         .then(data => {
            if(data.success){
                setBrandData(data.brand)
            }else{
                setBrandData(null)
            }
         })
         .catch(err => console.error(err))
         .finally(() => setLoading(false))
    }, [id])

    if(loading){
        return <Loading/>
    }

    if(!brandData){
        return <Navigate to="/404" replace />
    }

    return (
        <div className='container-fluid'>
            <h1>Editar Marca</h1>
            <Row>
                <Col>
                    <Card body className='shadow'>
                        <CardTitle>
                            <h2 className='fw-bold'>Editar Marca</h2>
                        </CardTitle>
                        <CardBody className='p-0'>
                            <Formik
                             initialValues={{
                                name: brandData.nombre,
                             }}
                             validationSchema={brandSchema}
                             onSubmit={async (values) => {
                                const request = {
                                    Nombre: values.name,
                                }
                                await editBrand(request, id).then(data => {
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
                                                placeholder='Toyota'
                                                defaultValue={values.name}
                                                invalid={touched.name && Boolean(errors.name)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <FormFeedBackError error={errors.name} touched={touched.name} />
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

export default EditBrand
