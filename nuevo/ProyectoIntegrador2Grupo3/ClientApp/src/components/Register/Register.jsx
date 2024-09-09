import React from 'react'
import { Card, Col, Form, Row, Input, InputGroupText, Button, Label, FormGroup, FormFeedback } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import './register.css'
import { Link } from 'react-router-dom'
import FieldGroup from '../Form/FieldGroup' 
import * as Yup from 'yup'
import { useFormik } from 'formik'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object({
    name: Yup.string("Ingresa un nombre").min(3, "El campo nombre debería de tener al menos 3 carácteres").required("Este campo es requerido"),
    lastName: Yup.string("Ingresa un apellido").min(3, "El campo Apellido debería de tener al menos 3 carácteres").required("Este campo es requerido"),
    username: Yup.string().min(5, "El campo Usuario debe de tener al menos 5 carácteres").required("Este campo es requerido"),
    email: Yup.string("Ingrese un correo").email("Ingrese un formato de email válido").required("Este campo es requerido"),
    password: Yup.string("Ingrese la contraseña").min(8, "La contraseña debe ser al menos 8 carácteres").required("Este campo es requerido"),
    confirmPassword: Yup.string("Confirme la contraseña").min(8, "La contraseña debe ser al menos 8 carácteres").required("Confirme la contraseña")
     .oneOf([Yup.ref('password'), null], "La contraseña debe de coincidir"),
    phone: Yup.string().optional().matches(phoneRegExp, "Formato de número de teléfono no válido"),
    termsAndConditions: Yup.boolean().oneOf([true], "Acepte los terminos y condiciones")
})

function Register() {
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
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const request = {
                Nombre: values.name,
                Apellido: values.lastName,
                NombreUsuario: values.username,
                Correo: values.email,
                Password: values.password,
                Telefono: values.phone
            }

            fetch('api/user/register', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
        }
    })
  return (
    <div className='register'>
        <div className="register-form">
            <Row>
                <Col>
                    <Card body className='shadow'>
                        <h1 className='text-center'>Registrarse</h1>
                        <span className='text-muted text-center'>Rellene los campos</span>
                        <Form className='mt-2 mb-2' onSubmit={formik.handleSubmit}>
                            <Row>
                                <Col>
                                    <FieldGroup>
                                        <Input
                                         placeholder='Nombre'
                                         bsSize="lg"
                                         id='name'
                                         value={formik.values.name}
                                         onChange={formik.handleChange}
                                         invalid={formik.touched.name && Boolean(formik.errors.name)}
                                        />
                                        <InputGroupText>
                                            <FontAwesomeIcon icon={faUser}/>
                                        </InputGroupText>
                                        {
                                            formik.touched.name && formik.errors.name &&
                                            <FormFeedback>
                                                {formik.errors.name}
                                            </FormFeedback>
                                        }
                                    </FieldGroup>
                                </Col>
                                <Col>
                                    <FieldGroup>
                                        <Input
                                         placeholder='Apellido'
                                         bsSize="lg"
                                         id='lastName'
                                         value={formik.values.lastName}
                                         onChange={formik.handleChange}
                                         invalid={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        />
                                        <InputGroupText>
                                            <FontAwesomeIcon icon={faUser}/>
                                        </InputGroupText>
                                        {
                                            formik.touched.lastName && formik.errors.lastName &&
                                            <FormFeedback>
                                                {formik.errors.lastName}
                                            </FormFeedback>
                                        }
                                    </FieldGroup>
                                </Col>
                            </Row>
                            <FieldGroup>
                                <Input
                                 placeholder='Nombre de Usuario'
                                 bsSize="lg"
                                 id='username'
                                 value={formik.values.username}
                                 onChange={formik.handleChange}
                                 invalid={formik.touched.username && Boolean(formik.errors.username)}
                                />
                                <InputGroupText>
                                    <FontAwesomeIcon icon={faUser}/>
                                </InputGroupText>
                                {
                                    formik.touched.username && formik.errors.username &&
                                    <FormFeedback>
                                        {formik.errors.username}
                                    </FormFeedback>
                                }
                            </FieldGroup>
                            <FieldGroup>
                                <Input
                                 placeholder='Email'
                                 type='email'
                                 bsSize="lg"
                                 id='email'
                                 value={formik.values.email}
                                 onChange={formik.handleChange}
                                 invalid={formik.touched.email && Boolean(formik.errors.email)}
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
                                            <FontAwesomeIcon icon={faLock}/>
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
                                            <FontAwesomeIcon icon={faLock}/>
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
                            <FieldGroup>
                                <Input
                                 placeholder='Teléfono (opcional)'
                                 bsSize="lg"
                                 id='phone'
                                 value={formik.values.phone}
                                 onChange={formik.handleChange}
                                 invalid={formik.touched.phone && Boolean(formik.errors.phone)}
                                />
                                <InputGroupText>
                                    <FontAwesomeIcon icon={faEnvelope}/>
                                </InputGroupText>
                                {
                                    formik.touched.phone && formik.errors.phone &&
                                    <FormFeedback>
                                        {formik.errors.phone}
                                    </FormFeedback>
                                }
                            </FieldGroup>
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
                            <Button type='submit' size='lg' color='primary' block className='submit-button m-auto'>Registrarse</Button>
                        </Form>
                        <span className='text-muted text-center mt-4'>Ya tienes una cuenta? <Link to={'/login'}>Iniciar Sesión</Link></span>
                    </Card>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default Register