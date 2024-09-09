import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { carSchema } from '../../../helpers/formsSchema';
import { Formik } from 'formik';
import { useAlert } from '../../Context/AlertContext';
import CarForm from '../CarForm';
import { createCar, getModels } from '../../../helpers/carHelpers';
import Loading from '../../Loading/Loading';

function AddCar() {
    const [loading, setLoading] = useState(true)
    const { showAlert } = useAlert();
    const [modelData, setModelData] = useState([])

    useEffect(() => {
        getModels()
         .then(data => {
            setModelData(data)
         })
         .catch(() => showAlert("danger", "Ha ocurrido un problema! Contacte con el soporte."))
         .finally(() => setLoading(false))
    }, [showAlert])


    if (loading){
        return <Loading />
    }

    return (
        <div className='container-fluid'>
            <h1>Añadir Vehículo</h1>
            <Row>
                <Col>
                    <Card body className='shadow'>
                        <CardTitle>
                            <h2 className='fw-bold'>Añadir Vehículo</h2>
                        </CardTitle>
                        <CardBody className='p-0'>
                            <Formik
                            initialValues={{
                                name: '',
                                description: '',
                                model: '',
                                color: '',
                                year: 2005,
                                chasis: '',
                                plate: '',
                                cylinderCapacity: 1,
                                mileage: 50000,
                                numberOfDoors: 4,
                                price: 0.00,
                                stock: 0,
                                transmition: 'Automática',
                                fuel: 'Gasolina',
                                imageUrl: '',
                                imageData: ''
                            }}
                            validationSchema={carSchema}
                            onSubmit={async (values) => {
                                const request = {
                                    Nombre: values.name,
                                    Chasis: values.chasis,
                                    Placa: values.plate,
                                    Anio: values.year,
                                    Color: values.color,
                                    Cilindraje: values.cylinderCapacity,
                                    KilometrosTablero: values.mileage,
                                    CantidadPuerta: values.numberOfDoors,
                                    Precio: values.price,
                                    Stock: values.stock,
                                    Transmision: values.transmition,
                                    Combustible: values.fuel,
                                    Descripcion: values.description,
                                    ModelID: Number(values.model),
                                    ImageURL: values.imageUrl,
                                    ImageData: values.imageData
                                }

                                await createCar(request)
                                    .then(data => {
                                        if(data.success) {
                                            showAlert("success", data.message)
                                        }else{
                                            showAlert("danger", data.message)
                                        }
                                    })
                                    .catch(err => {
                                        showAlert("danger", err.message)
                                    })
                                    .finally(() => sessionStorage.removeItem("tempImg"))
                            }}
                            >
                            { ({...args}) => <CarForm {...args} submitText={"Añadir"} modelData={modelData} /> }
                            </Formik>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default AddCar;