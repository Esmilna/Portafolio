import React, { useState } from 'react'
import { Card, Col, Form, Row, Input, InputGroupText, Button, Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import FieldGroup from '../../Form/FieldGroup'
import { newPasswordSchema } from '../../../helpers/formsSchema'
import { useFormik } from 'formik'
import { useAlert } from '../../Context/AlertContext'
import { updatePassword } from '../../../helpers/userHelpers'
import FormFeedBackError from '../../Form/FormFeedBackError'

function EditPassword() {
    const [loading, setLoading] = useState(false)
    const { showAlert } = useAlert();

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: newPasswordSchema,
        onSubmit: (values) => {
            const request = {
                OldPassword: values.oldPassword,
                NewPassword: values.password
            }
            console.log(request)

            setLoading(true)
            updatePassword(request)
                .then(data => {
                    if (data.success) {
                        showAlert("success", data.message)
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
                            <Form className='mt-2 mb-2' onSubmit={formik.handleSubmit}>
                                
                                <FieldGroup>
                                    <Input
                                        placeholder='Contraseña actual' 
                                        type='password'
                                        bsSize="lg"
                                        autoComplete='on'
                                        id='oldPassword'
                                        value={formik.values.oldPassword}
                                        onChange={formik.handleChange}
                                        invalid={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                                    />

                                    <InputGroupText>
                                        <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>

                                    <FormFeedBackError touched={formik.touched.oldPassword} error={formik.errors.oldPassword} />
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

                                            <FormFeedBackError touched={formik.touched.password} error={formik.errors.password} />
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

                                            <FormFeedBackError touched={formik.touched.confirmPassword} error={formik.errors.confirmPassword} />
                                        </FieldGroup>
                                    </Col>
                                </Row>

                                {!loading ?
                                    <Button type='submit' size='lg' color='primary' block className='submit-button m-auto'>Actualizar</Button> :
                                    <Button type='submit' size='lg' color='primary' block className='submit-button m-auto' disabled>
                                        <Spinner size="sm">
                                            Loading...
                                        </Spinner>
                                        <span>
                                            {' '}Cambiar
                                        </span>
                                    </Button>
                                }

                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default EditPassword