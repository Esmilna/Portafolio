import React, { useState } from 'react'
import { Card, Col, Form, Row, Input, InputGroupText, Button, Label, FormGroup, FormFeedback, Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import './EditPassword.css'
import { Link, useNavigate } from 'react-router-dom'
import FieldGroup from '../Form/FieldGroup'
import { userSchema } from '../../helpers/formsSchema'
import { useFormik } from 'formik'
import { useAlert } from '../Context/AlertContext'

function EditPassword() {
    const [loading, setLoading] = useState(false)
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            termsAndConditions: false
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            const request = {
                Nombre: values.name,
                Apellido: values.lastName,
                NombreUsuario: values.username,
                Correo: values.email,
                Password: values.password,
                Telefono: values.phone
            }

            setLoading(true)
            fetch('api/user/register', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        showAlert("success", data.message)
                        navigate("/login")
                    } else {
                        showAlert("danger", data.message)
                    }
                })
                .catch(err => {
                    showAlert("danger", err.message)
                })
                .finally(() => setLoading(false))
        }
    })
    return (
        <div className='register'>
            <div className="register-form">
                <Row>
                    <Col>
                        <Card body className='shadow'>
                            <h1 className='text-center'>Cambiar contraseña</h1>
                            <span className='text-muted text-center'>Rellene los campos</span>
                            <Form className='mt-2 mb-2' onSubmit={formik.handleSubmit}>
                                <Row>                                   
                                   
                                </Row>
                                
                                <FieldGroup>
                                    <Input
                                        placeholder='Contraseña actual' type='password'
                                        bsSize="lg"
                                        autoComplete='on'
                                        id='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        invalid={formik.touched.password && Boolean(formik.errors.password)}
                                    />

                                    <InputGroupText>
                                        <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>

                                    {
                                        formik.touched.password && formik.errors.password &&
                                        <FormFeedback>
                                            {formik.errors.password}
                                        </FormFeedback>
                                    }
                                </FieldGroup>
                                <Row>
                                    <Col>
                                        <FieldGroup>
                                            <Input
                                                placeholder='Contraseña' type='password'
                                                bsSize="lg"
                                                autoComplete='on'
                                                id='password'
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                invalid={formik.touched.password && Boolean(formik.errors.password)}
                                            />

                                            <InputGroupText>
                                                <FontAwesomeIcon icon={faLock} />
                                            </InputGroupText>

                                            {
                                                formik.touched.password && formik.errors.password &&
                                                <FormFeedback>
                                                    {formik.errors.password}
                                                </FormFeedback>
                                            }
                                        </FieldGroup>
                                    </Col>
                                    <Col>
                                        <FieldGroup>
                                            <Input
                                                placeholder='Confirmar Contraseña'
                                                type='password'
                                                bsSize="lg"
                                                autoComplete='on'
                                                id='confirmPassword'
                                                value={formik.values.confirmPassword}
                                                onChange={formik.handleChange}
                                                invalid={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                            />
                                            <InputGroupText>
                                                <FontAwesomeIcon icon={faLock} />
                                            </InputGroupText>
                                            {
                                                formik.touched.confirmPassword && formik.errors.confirmPassword &&
                                                <FormFeedback>
                                                    {formik.errors.confirmPassword}
                                                </FormFeedback>
                                            }
                                        </FieldGroup>
                                    </Col>
                                </Row>
                               
                                <Row className='justify-content-center pt-2 pb-2'>
                                    <Col md={6}>
                                        <FormGroup check className='m-auto'>
                                            <Input
                                                id='termsAndConditions'
                                                name='termsAndConditions'
                                                type='checkbox'
                                                checked={formik.values.termsAndConditions}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                invalid={formik.touched.termsAndConditions && Boolean(formik.errors.termsAndConditions)}
                                            />
                                            <Label htmlFor='termsAndConditions' check>Aceptar términos y condiciones</Label>
                                            {
                                                formik.errors.termsAndConditions &&
                                                <FormFeedback>
                                                    {formik.errors.termsAndConditions}
                                                </FormFeedback>
                                            }
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {!loading ?
                                    <Button type='submit' size='lg' color='primary' block className='submit-button m-auto'>Enviar</Button> :
                                    <Button type='submit' size='lg' color='primary' block className='submit-button m-auto' disabled>
                                        <Spinner size="sm">
                                            Loading...
                                        </Spinner>
                                        <span>
                                            {' '}Registrarse
                                        </span>
                                    </Button>
                                }

                            </Form>
                            <span className='text-muted text-center mt-4'>Ya tienes una cuenta? <Link to={'/login'}>Iniciar Sesión</Link></span>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default EditPassword