import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeftLong} from '@fortawesome/free-solid-svg-icons'

function Cart({ products, removeProduct, changeQuantity }) {
    const total = products.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0).toLocaleString()

    return (
        <div className="cart">
            <Row>
                <Col md="8">
                    <div className="cart-items">
                        {products.map(product => (
                            <div className="cart-item" key={product.id}>
                                <Row>
                                    <Col md="3">
                                        <img src={product.imageURL} alt={product.nombre} className="cart-img" />
                                    </Col>
                                    <Col md="3">
                                        <div className="d-flex flex-column">
                                            <span className="fw-bold">{product.nombre}</span>
                                            <span className="text-muted">Color: {product.color}</span>
                                            <Input type="number" defaultValue={product.cantidad} min={1} max={product.stock} className="mt-5" onChange={(e) => changeQuantity(e, product.id)} />
                                        </div>
                                    </Col>
                                    <Col md="4" className="offset-2 d-flex flex-column justify-content-between">
                                        <div className="price">
                                            <span className="text-muted">${product.precio.toLocaleString()} x {product.cantidad} = </span>
                                            <span className="fw-bold">${(product.precio * product.cantidad).toLocaleString()}</span>
                                        </div>

                                        <span className="ms-auto pointer text-danger fw-bold p-0" onClick={() => removeProduct(product.id)}>
                                            x Remover
                                        </span>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col md="4">
                    <Card body className="bg-light border-0 shadow">
                        <CardBody>
                            <div className="d-flex justify-content-between pricing-line">
                                <span className="fw-bold">Subtotal:</span>
                                <span className="fw-bold">${total}</span>        
                            </div>
                            <div className="d-flex justify-content-between pricing-line">
                                <span className="fw-bold">Total:</span>
                                <span className="fw-bold">${total}</span>        
                            </div>
                            <Button tag={Link} to="/checkout" color="dark" block size="lg" className="mt-3">Proceder al Checkout</Button>
                        </CardBody>
                    </Card>

                    <div className="mt-3">
                        <Link to={"/"} className="text-decoration-none text-dark fw-bold"><FontAwesomeIcon icon={faArrowLeftLong}/> Seguir comprando</Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Cart;
