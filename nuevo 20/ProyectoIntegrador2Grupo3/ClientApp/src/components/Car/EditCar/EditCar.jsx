import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { carSchema } from '../../../helpers/formsSchema';
import { Formik } from 'formik';
import { useAlert } from '../../Context/AlertContext';
import CarForm from '../CarForm';
import { editCar, fetchCarAndModelData } from '../../../helpers/carHelpers';
import Loading from '../../Loading/Loading';
import { Navigate, useParams } from 'react-router-dom';

function EditCar() {
    const [carData, setCarData] = useState(null)
    const [modelData, setModelData] = useState([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const { showAlert } = useAlert();

    useEffect(() => {
        fetchCarAndModelData(id)
            .then(data => {
                const { car, model } = data

                if(car.success && model["$values"]){
                    setModelData(model["$values"])
                    setCarData(JSON.parse(car.data))
                }
            })
            .catch(() => showAlert("danger", "Ha ocurrido un problema! Contacte con el soporte."))
            .finally(() => setLoading(false))
    }, [id, showAlert])

    if (loading){
        return <Loading />
    }

    if(!carData){
        return <Navigate to="/PagenotFound" replace />
    }

    return (
        <div className='container-fluid'>
            <h1>Editar Vehículo</h1>
            <Row>
                <Col>
                    <Card body className='shadow'>
                        <CardTitle>
                            <h2 className='fw-bold'>Editar {carData.Nombre}</h2>
                        </CardTitle>
                        <CardBody className='p-0'>
                            <Formik
                            initialValues={{
                                name: carData.Nombre,
                                description: carData.Descripcion,
                                model: carData.ModelID,
                                color: carData.Color,
                                year: carData.Anio,
                                chasis: carData.Chasis,
                                plate: carData.Placa,
                                cylinderCapacity: carData.Cilindraje,
                                mileage: carData.KilometrosTablero,
                                numberOfDoors: carData.CantidadPuerta,
                                price: carData.Precio,
                                stock: carData.Stock,
                                transmition: carData.Transmision,
                                fuel: carData.Combustible,
                                imageUrl: carData.ImageURL,
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

                                await editCar(request, id)
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
                            { ({...args}) => <CarForm {...args} submitText={"Guardar cambios"} modelData={modelData} /> }
                            </Formik>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default EditCar;