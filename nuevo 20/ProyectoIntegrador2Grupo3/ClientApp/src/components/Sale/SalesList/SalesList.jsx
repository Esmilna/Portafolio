import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getAllOrders } from '../../../helpers/saleHelpers';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';

function SalesList() {
    const [loading, setLoading] = useState(true)
    const [sales, setSales] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllOrders()
            .then(data => setSales(data["$values"]))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    if(loading) return <Loading />

    return (
        <div>
            <Table hover className='pointer'>
                <thead>
                    <tr>
                        <th>Numero de orden</th>
                        <th>Cliente</th>
                        <th>Fecha de solicitud</th>
                        <th>Estado</th>
                        <th>Monto Total</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.ID} onClick={() => navigate(`/dashboard/sale/details/${sale.ID}`)}>
                            <th scope='row'>{sale.ID}</th>
                            <td>{sale.Client.Nombre} {sale.Client.Apellido}</td>
                            <td>{sale.FechaVenta}</td>
                            <td>{sale.Estatus}</td>
                            <td>{sale.Total.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        )
}

export default SalesList