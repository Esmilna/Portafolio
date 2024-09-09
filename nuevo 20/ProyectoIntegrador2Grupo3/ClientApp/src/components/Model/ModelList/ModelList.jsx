import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardTitle, Input, InputGroup, InputGroupText, Table } from 'reactstrap'
import { useAlert } from '../../Context/AlertContext'
import ModelTableRow from './ModelTableRow'
import Loading from '../../Loading/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getModels, searchModels } from '../../../helpers/carHelpers'

function ModelList() {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [isSearching, setIsSearching] = useState(false)
    const { showAlert } = useAlert()

    useEffect(() => {
        getModels()
            .then(data => {
                setData(data)
            })
            .catch(err => {
                showAlert("danger", err.message)
            })
            .finally(() => setLoading(false))
    },[showAlert])

    const search = e => {
        const { value } = e.target

        searchModels(value)
            .then(data => {
                setData(data)
            })
            .catch(err => console.error(err))
            .finally(() => setIsSearching(false))
    }

    if(loading) return <Loading/>
    if(!data) return <p>No hay informacion para mostrar</p> 

    return (
        <Card body className='shadow'>
            <CardTitle><span className='fw-bold ms-3'>Lista de Modelos</span></CardTitle>
            <CardBody>
                <Button color='success mb-2 fw-bold' size='lg' tag={Link} to="/dashboard/New-Model">
                    <FontAwesomeIcon icon={faPlus} className='me-2'/>
                    Agregar Modelo
                </Button>
                <InputGroup  className='mb-2'>
                    <InputGroupText className='bg-white border-end-0' >
                        <FontAwesomeIcon icon={faSearch}/>
                    </InputGroupText>
                    <Input type='search' onChange={e => search(e)} className='border-start-0' placeholder="Buscar Nombre o ID" />
                </InputGroup>
                {
                    isSearching ? <Loading /> :

                    <Table hover className='bg-white border'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Marca</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(model => <ModelTableRow key={model.Id} id={model.Id} name={model.Nombre} brand={model.brand.Nombre} />)
                            }
                        </tbody>
                    </Table>
                }
            </CardBody>
        </Card>
    )
    
}

export default ModelList