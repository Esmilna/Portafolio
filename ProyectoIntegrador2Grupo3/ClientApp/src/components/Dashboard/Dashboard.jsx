
import React, { useEffect } from 'react'
import { Badge, Table } from 'reactstrap'
import Summary from './Summary'


function Dashboard() {

    useEffect(() => {
        //TODO this code is not supposed to be used in the future. Just for testing objectives.
        
        // fetch("api/user")
        //  .then(data => data.json())
        //  .then(res => console.log(res))
        //  .catch(err => console.error(err))

        // fetch("api/user/1")
        //     .then(data => data.json())
        //     .then(res => console.log(res))
        //     .catch(err => console.error(err))

    },[])

    return (
        <div>
            <h1>Dashboard</h1>
            <p className="text-muted ms-1">Dashboard</p>
            <div className="bg-light p-2">
                <Summary />
                <Table responsive bordered hover className='bg-white'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Metodo Pago</th>
                            <th>Estado</th>
                            <th>Precio total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'>1</th>
                            <td className='text-muted'>2/11/2023</td>
                            <td className='text-muted'>Joe Dan</td>
                            <td className='text-muted'>Efectivo</td>
                            <td className='text-muted'>
                                <Badge color='success'>Completado</Badge>
                            </td>
                            <td className='text-muted'>$1500.00</td>
                        </tr>
                        <tr>
                            <th scope='row'>2</th>
                            <td className='text-muted'>2/11/2023</td>
                            <td className='text-muted'>Joe Dan</td>
                            <td className='text-muted'>Efectivo</td>
                            <td className='text-muted'>
                                <Badge color='success'>Completado</Badge>
                            </td>
                            <td className='text-muted'>$1500.00</td>
                        </tr>
                        <tr>
                            <th scope='row'>3</th>
                            <td className='text-muted'>2/11/2023</td>
                            <td className='text-muted'>Joe Dan</td>
                            <td className='text-muted'>Efectivo</td>
                            <td className='text-muted'>
                                <Badge color='success'>Completado</Badge>
                            </td>
                            <td className='text-muted'>$1500.00</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Dashboard