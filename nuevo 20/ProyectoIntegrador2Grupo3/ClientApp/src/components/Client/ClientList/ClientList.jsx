import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardTitle, Input, InputGroup, InputGroupText, Table } from 'reactstrap'
import { useAlert } from '../../Context/AlertContext'
import ClientTableRow from './ClientTableRow'
import Loading from '../../Loading/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getClients } from '../../../helpers/clientHelpers'

function ClientList() {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [isSearching, setIsSearching] = useState(false)
    const { showAlert } = useAlert()

    useEffect(() => {
        getClients()
            .then(data => {
                setData(data)
            })
            .catch(err => {
                console.log(err)
                showAlert("danger", err.message)
            })
            .finally(() => setLoading(false))
    },[showAlert])

    const search = e => {
        const { value } = e.target

        getClients(value)
            .then(data => {
                setData(data)
            })
            .catch(err => console.error(err))
            .finally(() => setIsSearching(false))
    }


    if(loading){
        return <Loading/>
    }else{
        if(!data) return <p>No hay informacion para mostrar</p> 
        else {
            return (
                <Card body className='shadow'>
                    <CardTitle><span className='fw-bold ms-3'>Lista de Clientes</span></CardTitle>
                    <CardBody>
                        <Button color='success mb-2 fw-bold' size='lg' tag={Link} to="/dashboard/New-Client">
                            <FontAwesomeIcon icon={faPlus} className='me-2'/>
                            Agregar Cliente
                        </Button>
                        <InputGroup  className='mb-2'>
                            <InputGroupText className='bg-white border-end-0' >
                                <FontAwesomeIcon icon={faSearch}/>
                            </InputGroupText>
                            <Input type='search' onChange={e => search(e)} className='border-start-0' placeholder="Buscar Nombre, Correo, ID..." />
                        </InputGroup>
                        {
                            isSearching ? <Loading /> :

                            <Table hover className='bg-white border'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre Completo</th>
                                        <th>Teléfono</th>
                                        <th>Correo</th>
                                        <th>Direccion</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(client => <ClientTableRow key={client.id} id={client.id} name={client.nombre} lastName={client.apellido} email={client.correo} phone={client.telefono} address={client.direccion} />)
                                    }
                                </tbody>
                            </Table>
                        }
                    </CardBody>
                </Card>
            )
        }
    }
}

export default ClientList