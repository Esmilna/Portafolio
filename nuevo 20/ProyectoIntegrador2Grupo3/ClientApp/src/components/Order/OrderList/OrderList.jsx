import React, { useEffect, useState } from 'react';
import './OrderList.css';
import { getOrders } from '../../../helpers/saleHelpers';
import Order from '../Order';
import Loading from '../../Loading/Loading';

function OrderList() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getOrders()
         .then(data => {
            console.log(data)
            if(data["$values"]){
                setOrders(data["$values"])
            }
        })
        .catch(err => console.error(err))
        .finally(setLoading(false))
    }, [])

    if(loading) return <Loading />

    return (
        <div className='orders'>
            <h1>Order List</h1>

            {
                orders.map(order => <Order key={order.ID} order={order} /> )
            }
            {
                !orders.length && <p>No hay pedidos para mostrar</p>
            }
        </div>
    )
}

export default OrderList