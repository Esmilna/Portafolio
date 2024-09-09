import React, { useEffect, useRef, useState } from 'react'
import './ProductDetails.css';
import { Row, Col, Button, Container, FormGroup, Label, Input, Card } from 'reactstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { addProductToCart, getCarByID } from '../../helpers/carHelpers';
import Loading from '../Loading/Loading';
import { useAlert } from '../Context/AlertContext'

function ProductDetails() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const { id } = useParams()
    const { showAlert } = useAlert()
    const navigate = useNavigate()
    const quantityRef = useRef(null)

    useEffect(() => {
        getCarByID(id)
            .then(data => {
                if(data.success){
                    setData(JSON.parse(data.data))
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [id])

    const addToCart = () => {
        const request = {
            ProductID: data.Id,
            Cantidad: Number(quantityRef.current.value),
            PrecioUnidad: data.Precio
        }
        addProductToCart(request)
            .then(data => {
                if(data.success){
                    showAlert("success", data.message)

                    const cart = localStorage.getItem("cart")
                    let cartList = []

                    if(cart){
                        cartList = JSON.parse(cart)
                    }
                    const product = data.result;
                    product.cantidad = data.cantidad
                    cartList.push(product)
                    localStorage.setItem("cart", JSON.stringify(cartList))

                    setTimeout(() => {
                        navigate(0)
                    }, 1500)

                }
            })
            .catch(err => console.error(err))
    }

    if(loading) return <Loading />
    if(!data) return <Navigate to="/PagenotFound" replace />

    return (
        <div>
            <h1>Detalles del producto</h1>

            <Container className='p-2'>  
                <Card body className='shadow'>
                <Row className='p-3'>
                    <Col className="">
                        <img className="imagenPrincipal" src={data.ImageURL} alt={data.Nombre}/>
                    </Col>
                    <Col className="bg-light border">
                        <h4 className="nombreProductoMargin"><strong>{data.Nombre}</strong></h4>
                        
                        <Row>
                            <Col className="bg-light" md="3">
                                <p className="precioVenta"><strong>${data.Precio}</strong></p>
                            </Col>
                        </Row>

                        <Row>
                            <p className="ms-4 margenSuperior">Color: <strong>{data.Color}</strong></p>
                        </Row>

                        <Row>
                            <Col className="bg-light">
                                <p className='ms-4'>{data.Descripcion}</p>
                            </Col>
                        </Row>

                        <Row className='justify-content-between mt-5'>
                            <Col md="2">
                                <FormGroup>
                                    <Label className='fw-bold' for="quantity">Unidades:</Label>
                                    <Input
                                     id="quantity"
                                     name="quantity"
                                     type="number"
                                     defaultValue={1}
                                     max={data.Stock}
                                     innerRef={quantityRef}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="bg-light mt-auto mb-3" md="8">
                                <Button color="dark" block className='mt-auto' onClick={addToCart}>
                                    Agregar al carrito
                                </Button>
                            </Col>
                        </Row>                        
                    </Col>
                </Row>
                </Card>
                
            </Container>
        </div>
        )
}

export default ProductDetails