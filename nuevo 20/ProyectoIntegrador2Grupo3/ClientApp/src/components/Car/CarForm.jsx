import React from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import SubmitButton from '../Form/SubmitButton';
import FormFeedBackError from '../Form/FormFeedBackError';
import { uploadCarImage } from '../../helpers/carHelpers';
import { useAlert } from '../Context/AlertContext';
import {useNavigate} from 'react-router-dom'

function CarForm({handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting, submitText, modelData, setFieldValue}) {
    const { showAlert } = useAlert()
    const navigate = useNavigate()

    const uploadImage = async(e) => {
        await uploadCarImage(e.target.files[0])
         .then(data => {
            sessionStorage.setItem("tempImg", data.result)
            setFieldValue("imageData", data.result)

         })
         .catch(err => {
            if(err.name === "QuotaExceededError"){
                showAlert("danger", "Archivo muy pesado! suba una imagen menor a 2mb")
            }else{
                showAlert("danger", err.message)
            }
         })
    }

    return (
        <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>
            <Row>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='name'>Nombre</Label>
                        <Input id='name'
                            name='name'
                            placeholder='Toyota corolla 2019'
                            defaultValue={values.name}
                            invalid={touched.name && Boolean(errors.name)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormFeedBackError error={errors.name} touched={touched.name} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='model'>Modelo</Label>
                        <Input id='model'
                            name='model'
                            type='select'
                            defaultValue={values.model}
                            invalid={touched.model && Boolean(errors.model)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value=""></option>
                            {
                                modelData.map(model => (
                                    <option key={model.Id} value={model.Id}>{model.brand.Nombre} - {model.Nombre}</option>
                                ))
                            }
                        </Input>
                        <FormFeedBackError error={errors.model} touched={touched.model} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='color'>Color</Label>
                        <Input id='color'
                            name='color'
                            type='select'
                            defaultValue={values.color}
                            invalid={touched.color && Boolean(errors.color)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value=""></option>
                            <option value="Rojo">Rojo</option>
                            <option value="Azul">Azul</option>
                            <option value="Verde">Verde</option>
                        </Input>
                        <FormFeedBackError error={errors.color} touched={touched.color} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='year'>Año</Label>
                        <Input id='year'
                            name='year'
                            type='number'
                            defaultValue={values.year}
                            invalid={touched.year && Boolean(errors.year)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            min={2005}
                            max={2050}
                        />
                        <FormFeedBackError error={errors.year} touched={touched.year} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='chasis'>Chasis</Label>
                        <Input id='chasis'
                            name='chasis'
                            defaultValue={values.chasis}
                            invalid={touched.chasis && Boolean(errors.chasis)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormFeedBackError error={errors.chasis} touched={touched.chasis} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='plate'>Placa</Label>
                        <Input id='plate'
                            name='plate'
                            defaultValue={values.plate}
                            invalid={touched.plate && Boolean(errors.plate)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormFeedBackError error={errors.plate} touched={touched.plate} />
                    </FormGroup>
                </Col>
                <Col md={12}>
                    <FormGroup>
                        <Label for='description'>Descripción</Label>
                        <Input id='description'
                            name='description'
                            type="textarea"
                            defaultValue={values.description}
                            invalid={touched.description && Boolean(errors.description)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormFeedBackError error={errors.description} touched={touched.description} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='cylinderCapacity'>Cilindraje</Label>
                        <Input id='cylinderCapacity'
                            name='cylinderCapacity'
                            type='number'
                            defaultValue={values.cylinderCapacity}
                            invalid={touched.cylinderCapacity && Boolean(errors.cylinderCapacity)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            step={0.25}
                        />
                        <FormFeedBackError error={errors.cylinderCapacity} touched={touched.cylinderCapacity} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='mileage'>Kilometros en tablero</Label>
                        <Input id='mileage'
                            name='mileage'
                            type='number'
                            defaultValue={values.mileage}
                            invalid={touched.mileage && Boolean(errors.mileage)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            step={10000}
                        />
                        <FormFeedBackError error={errors.mileage} touched={touched.mileage} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='numberOfDoors'>Número de puertas</Label>
                        <Input id='numberOfDoors'
                            name='numberOfDoors'
                            type='number'
                            defaultValue={values.numberOfDoors}
                            invalid={touched.numberOfDoors && Boolean(errors.numberOfDoors)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            min={2}
                        />
                        <FormFeedBackError error={errors.numberOfDoors} touched={touched.numberOfDoors} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='price'>Precio</Label>
                        <Input id='price'
                            name='price'
                            type='number'
                            defaultValue={values.price}
                            invalid={touched.price && Boolean(errors.price)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            step={50000}
                        />
                        <FormFeedBackError error={errors.price} touched={touched.price} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='stock'>Stock</Label>
                        <Input id='stock'
                            name='stock'
                            type='number'
                            defaultValue={values.stock}
                            invalid={touched.stock && Boolean(errors.stock)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormFeedBackError error={errors.stock} touched={touched.stock} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='transmition'>Transmisión</Label>
                        <Input id='transmition'
                            name='transmition'
                            type='select'
                            defaultValue={values.transmition}
                            invalid={touched.transmition && Boolean(errors.transmition)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value=""></option>
                            <option value="Automática">Automática</option>
                            <option value="Manual">Manual</option>
                        </Input>
                        <FormFeedBackError error={errors.transmition} touched={touched.transmition} />
                    </FormGroup>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <FormGroup>
                        <Label for='fuel'>Tipo de combustible</Label>
                        <Input id='fuel'
                            name='fuel'
                            type='select'
                            defaultValue={values.fuel}
                            invalid={touched.fuel && Boolean(errors.fuel)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="Gasolina">Gasolina</option>
                            <option value="Gas">Gas</option>
                        </Input>
                        <FormFeedBackError error={errors.fuel} touched={touched.fuel} />
                    </FormGroup>
                </Col>
                <Col lg={8}>
                    <Row>
                        <Col md={9}>
                        <FormGroup>
                            <Label for='image'>Imagen</Label>
                            <Input id='image'
                                name='image'
                                type='file'
                                defaultValue={values.imageData}
                                accept='image/png, image/jpeg'
                                onChange={(e) => uploadImage(e)}
                            />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <div className='border border-dark' style={{width: "100px", height: "100px"}}>
                                {values.imageData && <img width={100} height={100} src={`data:image/png;base64,${values.imageData}`} alt="upload-file"/>}
                                {!values.imageData && values.imageUrl && <img width={100} height={100} src={values.imageUrl} alt="upload-file"/>}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className='justify-content-between mt-3'>
                <Col>
                    <Button size='lg' onClick={() => navigate(-1)} color='danger'>Cancelar</Button>
                </Col>
                <Col>
                    <SubmitButton text={submitText} loading={isSubmitting} />
                </Col>
            </Row>
        </Form>
    )
}

export default CarForm