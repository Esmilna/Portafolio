import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { modelSchema } from '../../../helpers/formsSchema'
import { useAlert } from '../../Context/AlertContext'
import Loading from '../../Loading/Loading'
import SubmitButton from '../../Form/SubmitButton'
import FormFeedBackError from '../../Form/FormFeedBackError'
import { editModel, fetchCurrentModelAndBrandsData } from '../../../helpers/carHelpers'

function EditModel() {
    const [loading, setLoading] = useState(true)
    const [modelData, setModelData] = useState(null)
    const [brandsData, setBrandsData] = useState([])
    const navigate = useNavigate()

    const { id } = useParams()

    const { showAlert } = useAlert();

    useEffect(() => {
        fetchCurrentModelAndBrandsData(id)
         .then(data => {
            if(data.success && data.brands){
                setBrandsData(data.brands)
                setModelData(data.model)
            }else{
                showAlert("danger", data.message)
            }
         })
         .catch(err => showAlert("danger", err.message))
         .finally(() => setLoading(false))
    }, [id, showAlert])

    if(loading){
        return <Loading/>
    }

    if(!modelData){
        return <Navigate to="/404" replace />
    }

    return (
        <div className='container-fluid'>
            <h1>Editar Modelo</h1>
            <Row>
                <Col>
                    <Card body className='shadow'>
                        <CardTitle>
                            <h2 className='fw-bold'>Editar Modelo</h2>
                        </CardTitle>
                        <CardBody className='p-0'>
                            <Formik
                             initialValues={{
                                name: modelData.nombre,
                                brandID: modelData.brandId
                             }}
                             validationSchema={modelSchema}
                             onSubmit={async (values) => {
                                const request = {
                                    Nombre: values.name,
                                    BrandID: values.brandID
                                }
                                await editModel(request, id).then(data => {
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
                                                placeholder='Corolla'
                                                defaultValue={values.name}
                                                invalid={touched.name && Boolean(errors.name)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <FormFeedBackError error={errors.name} touched={touched.name} />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for='brandID'>Marca</Label>
                                                <Input id='brandID'
                                                name='brandID'
                                                type='select'
                                                placeholder='Toyota'
                                                defaultValue={values.brandID}
                                                invalid={touched.brandID && Boolean(errors.brandID)}
                                                onChange={handleChange}
                                                >
                                                    <option value="">Elije una marca...</option>
                                                    {
                                                        brandsData.map(brand => <option key={brand.id} value={brand.id}>{brand.nombre}</option>)
                                                    }
                                                </Input>
                                                <FormFeedBackError error={errors.brandID} touched={errors.brandID} />
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

export default EditModel
