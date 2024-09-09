import React, { useEffect, useState } from 'react';
import { Button, Table, Input, Card, CardBody, CardTitle, InputGroup, InputGroupText } from 'reactstrap';
import { Link } from "react-router-dom";
import { useAlert } from '../../Context/AlertContext';
import { getCars, searchCars } from '../../../helpers/carHelpers';
import Loading from '../../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import CarTableRow from './CarTableRow'

export default function CarList() {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const { showAlert } = useAlert()

    useEffect(() => {
        getCars()
            .then(data => {
                setData(data)
            })
            .catch(err => {
                showAlert("danger", err.message)
            })
            .finally(() => setLoading(false))
    },[showAlert])

    const search = (e) => {
        e.preventDefault()
        const { value } = e.target
        setLoading(true)

        searchCars(value)
            .then(data => {
                setData(data)
            })
            .catch(err => {
                showAlert("danger", err.message)
            })
            .finally(() => setLoading(false))
    }
        
    return (
        <Card body className='shadow'>
            <CardTitle><span className='fw-bold ms-3'>Lista de Vehículos</span></CardTitle>
            <CardBody>
                <Button color='primary mb-2 fw-bold' size='lg' tag={Link} to="/dashboard/Add-Car">
                    <FontAwesomeIcon icon={faPlus} className='me-2'/>
                    Agregar Vehículo
                </Button>
                <InputGroup  className='mb-2'>
                    <InputGroupText className='bg-white border-end-0' >
                        <FontAwesomeIcon icon={faSearch}/>
                    </InputGroupText>
                    <Input type='search' onChange={e => search(e)} className='border-start-0' placeholder="Buscar Nombre o ID" />
                </InputGroup>
                {
                    loading ? <Loading /> :
                    <>
                        {
                            !data ? <p>No hay informacion para mostrar</p> :
                            <Table hover className='bg-white border'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Modelo</th>
                                        <th>Color</th>
                                        <th>Año</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Marca</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        data.map(car => <CarTableRow key={car.id} imageUrl={car.imageURL} id={car.id} name={car.nombre} model={car.model.nombre} color={car.color} year={car.anio} price={car.precio} stock={car.stock}  brand={car.brand.nombre} />)
                                    }
                                    
                                </tbody>
                            </Table>
                        }
                    </>
                }
            </CardBody>
        </Card>
    )
}