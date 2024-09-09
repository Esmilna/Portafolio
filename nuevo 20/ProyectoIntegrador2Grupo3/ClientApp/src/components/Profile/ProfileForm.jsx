import React from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import FormFeedBackError from '../Form/FormFeedBackError'
import SubmitButton from '../Form/SubmitButton'
import { useAlert } from '../Context/AlertContext'
import { uploadProfileImage } from '../../helpers/userHelpers'
import { Link } from 'react-router-dom'

function ProfileForm({ handleSubmit, handleChange, touched, errors, isSubmitting, values, data, setFieldValue }) {
    const { showAlert } = useAlert()

    const uploadImage = async (e) => {
        await uploadProfileImage(e.target.files[0])
            .then(data => {
                sessionStorage.setItem("tempImg", data.result)
                setFieldValue("imageData", data.result)

            })
            .catch(err => {
                if (err.name === "QuotaExceededError") {
                    showAlert("danger", "Archivo muy pesado! suba una imagen menor a 2mb")
                } else {
                    showAlert("danger", err.message)
                }
            })
    }

    return (
        <Card body>
            <CardBody>
                <Form onSubmit={handleSubmit} className='mt-2'>
                    <Row className='justify-content-between align-items-center'>
                        <Col md={4}>
                            <Row className='align-items-center'>
                                <Col>
                                    <Row className='align-items-center'>
                                        <Col>
                                            <div className='profile-avatar rounded-circle border-dark border d-inline-block p-4'>
                                            
                                                {values.imageData && <img width={100} height={100} src={`data:image/png;base64,${values.imageData}`} alt='profile'/>}
                                                {!values.imageData && values.imageUrl && <img width={100} height={100} src={values.imageUrl} alt='profile'/>}
                                                {!values.imageData && !values.imageUrl &&  <img width={100} height={100} src="https://res.cloudinary.com/dlgegwry6/image/upload/v1678554138/hssos8zjqaepzd3oyllp.png" alt='profile'/>}
                                                <Input id='image' name='image' type='file' defaultValue={values.imageData} accept='image/png, image/jpeg' onChange={(e) => uploadImage(e)} />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="d-inline-block">
                                                <div className="d-flex flex-column">
                                                    <span className="fw-bold">{data.nombre} {data.apellido}</span>
                                                    <span>{String(data.role).toUpperCase()}</span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <Button tag={Link} to="/profile/edit-password" color='primary' className='d-block ms-auto'>Cambiar contraseña</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={6} sm={12}>
                            <FormGroup>
                                <Label className='fw-bold' for='name'>Nombre</Label>
                                <Input id='name'
                                    name='name'
                                    placeholder='Joe'
                                    defaultValue={values.name}
                                    invalid={touched.name && Boolean(errors.name)}
                                    onChange={handleChange}
                                />
                                <FormFeedBackError error={errors.name} touched={errors.name} />
                            </FormGroup>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <FormGroup>
                                <Label className='fw-bold' for='lastName'>Apellido</Label>
                                <Input id='lastName'
                                    name='lastName'
                                    placeholder='Dan'
                                    defaultValue={values.lastName}
                                    invalid={touched.lastName && Boolean(errors.lastName)}
                                    onChange={handleChange}
                                />
                                <FormFeedBackError error={errors.lastName} touched={errors.lastName} />
                            </FormGroup>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <FormGroup>
                                <Label className='fw-bold' for='email'>Email</Label>
                                <Input id='email'
                                    name='email'
                                    type='email'
                                    placeholder='mail@example.com'
                                    defaultValue={values.email}
                                    invalid={touched.email && Boolean(errors.email)}
                                    onChange={handleChange}
                                />
                                <FormFeedBackError error={errors.email} touched={errors.email} />
                            </FormGroup>
                        </Col>
                        <Col lg={8} md={12} sm={12}>
                            <FormGroup>
                                <Label className='fw-bold' for='address'>Dirección</Label>
                                <Input id='address'
                                    name='address'
                                    placeholder='Calle Costa Rica #35, Ensanche ozama'
                                    defaultValue={values.address}
                                    type='textarea'
                                    invalid={touched.address && Boolean(errors.address)}
                                    onChange={handleChange}
                                ></Input>
                                <FormFeedBackError error={errors.address} touched={errors.address} />
                            </FormGroup>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <FormGroup>
                                <Label className='fw-bold' for='phone'>Telefono</Label>
                                <Input id='phone'
                                    name='phone'
                                    placeholder='555-555-5555'
                                    defaultValue={values.phone}
                                    invalid={touched.phone && Boolean(errors.phone)}
                                    onChange={handleChange}
                                />
                                <FormFeedBackError error={errors.phone} touched={errors.phone} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <SubmitButton text={"Guardar cambios"} loading={isSubmitting} />
                </Form> 
            </CardBody>
        </Card>
    )
}

export default ProfileForm