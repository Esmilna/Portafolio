import React, { useState } from 'react'
import { Card, Col, Form, Row, Input, InputGroupText, Button, FormFeedback, Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import FieldGroup from '../Form/FieldGroup' 
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {useAlert} from '../Context/AlertContext'
import './login.css'
import { useAuthentication } from '../Context/AuthenticationContext'

const validationSchema = Yup.object({
    email: Yup.string("Ingrese un correo").email("Ingrese un formato de email válido").required("Este campo es requerido"),
    password: Yup.string("Ingrese la contraseña").min(8, "La contraseña debe ser al menos 8 carácteres").required("Este campo es requerido"),
})

function Login() {
    const [loading, setLoading] = useState(false)
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const { checkAuth } = useAuthentication()
    

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            const request = {
                email: values.email,
                password: values.password,
            }

            fetch('api/user/login', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if(data.success){
                    const { token } = data

                    if(token){
                        localStorage.setItem("token", token)
                        checkAuth()
                        navigate("/")
                    }else{
                        throw Error("Token no existe!")
                    } 
                } else {
                    showAlert("danger", data.message)
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
        }
    })
  return (
    <div className='login'>
        <div className="login-form">
            <Row>
                <Col>
                    <Card body className='shadow'>
                        <h1 className='text-center fw-bold'>Iniciar Sesión</h1>
                        <Form className='mt-2 mb-2' onSubmit={formik.handleSubmit}>
                            <FieldGroup>
                                <Input
                                 placeholder='Email'
                                 type='email'
                                 bsSize="lg"
                                 id='email'
                                 value={formik.values.email}
                                 onChange={formik.handleChange}
                                 invalid={formik.touched.email && Boolean(formik.errors.email)}
                                 autoComplete='on'
                                />
                                <InputGroupText>
                                    <FontAwesomeIcon icon={faEnvelope}/>
                                </InputGroupText>
                                {
                                    formik.touched.email && formik.errors.email &&
                                    <FormFeedback>
                                        {formik.errors.email}
                                    </FormFeedback>
                                }
                            </FieldGroup>
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
                                    <FontAwesomeIcon icon={faLock}/>
                                </InputGroupText>

                                {
                                    formik.touched.password && formik.errors.password &&
                                    <FormFeedback>
                                        {formik.errors.password}
                                    </FormFeedback>
                                }
                            </FieldGroup>
                            {!loading ?
                                <Button type='submit' size='lg' color='primary' block className='submit-button m-auto'>Entrar</Button> :
                                <Button type='submit' size='lg' color='primary' block className='submit-button m-auto' disabled>
                                    <Spinner size="sm">
                                        Loading...
                                    </Spinner>
                                    <span>
                                        {' '}Entrar
                                    </span>
                                </Button>
                            }
                        </Form>
                        <span className='text-muted text-center mt-4'>no tienes una cuenta? <Link to={'/register'}>Registrate!</Link></span>
                    </Card>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default Login