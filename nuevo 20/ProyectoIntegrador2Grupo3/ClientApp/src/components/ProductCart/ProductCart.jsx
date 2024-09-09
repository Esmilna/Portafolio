import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import Loading from '../Loading/Loading'
import './cart.css'

function ProductCart() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const cart = localStorage.getItem("cart")
        if(cart){
            const productList = JSON.parse(cart)
            setProducts(productList)
        }

        setLoading(false)
    }, [])

    const removeProduct = id => {
        const cart = products.filter(item => item.id !== id)

        localStorage.setItem("cart", JSON.stringify(cart))
        setProducts(cart)
    }

    const changeQuantity = (e, id) => {
        const { value } = e.target

        const cart = JSON.parse(localStorage.getItem("cart"))

        for(let i = 0; i <= cart.length; i++){
            const item = {...cart[i]}

            if(item.id === id){
                item.cantidad = Number(value)
                cart[i] = item
                break;
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart))
        setProducts(cart)
    }

    if(loading) return <Loading />

    return (
        <div className='p-1'>
            <h2 className='text-center fw-bold'>Carrito de compras</h2>
            {
                products.length === 0 ?
                <p>No hay productos en el carrito.</p> :
                <Cart products={products} removeProduct={removeProduct} changeQuantity={changeQuantity}/>
            }
        </div>
    );
}

export default ProductCart;
