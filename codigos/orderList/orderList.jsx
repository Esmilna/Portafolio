import React from 'react';
import './OrderList.css';
import
{
    Card,
    CardBody,
    Button,
    Row,
    Col
} from 'reactstrap';

function OrderList() {
    return (
        <div>
            <h1>Order List</h1>

            <Card
                style={{
                    width: '70rem',
                    marginBottom: '30px'
                }}
            >
              
                <CardBody>
                    <Row>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>ORDER NO:</p>
                                <p><strong>673290789</strong></p>
                            </div>
                        </Col>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>SHIPPED DATE:</p>
                                <p><strong>01 Oct, 2019</strong></p>
                            </div>
                        </Col>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>STATUS</p>
                                <p><strong>Awating Delivery</strong></p>
                            </div>
                        </Col>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>ORDER AMOUNT</p>
                                <p><strong>$259.00</strong></p>
                            </div>
                        </Col>                       
                    </Row>

                    <Row>
                        <Col className="bg-light">
                            <Row>
                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light margenIzquierdoButton marginSuperiorBotones" md="3">
                                    <Button outline color="dark" className="Borde" >
                                        Order Details
                                    </Button>
                                    {' '}
                                </Col>

                                <Col className="bg-light marginSuperiorBotones" md="3">
                                    <Button outline color="dark" className="Borde" >
                                        Track Orders
                                    </Button>
                                    {' '}
                                </Col>
                                
                            </Row>
                            
                        </Col>

                        
                    </Row>

                </CardBody>
            </Card>

            <Card
                style={{
                    width: '70rem',
                    marginBottom: '30px'

                }}

            >

                <CardBody>
                    <Row>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>ORDER NO:</p>
                                <p><strong>673290789</strong></p>
                            </div>
                        </Col>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>SHIPPED DATE:</p>
                                <p><strong>01 Oct, 2019</strong></p>
                            </div>
                        </Col>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>STATUS</p>
                                <p><strong>Awating Delivery</strong></p>
                            </div>
                        </Col>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>ORDER AMOUNT</p>
                                <p><strong>$259.00</strong></p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="bg-light">
                            <Row>
                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light margenIzquierdoButton marginSuperiorBotones" md="3">
                                    <Button outline color="dark" className="Borde" >
                                        Order Details
                                    </Button>
                                    {' '}
                                </Col>

                                <Col className="bg-light marginSuperiorBotones" md="3">
                                    <Button outline color="dark" className="Borde" >
                                        Track Orders
                                    </Button>
                                    {' '}
                                </Col>

                            </Row>

                        </Col>


                    </Row>

                </CardBody>
            </Card>

            <Card
                style={{
                    width: '70rem',
                    marginBottom: '30px'
                }}
            >

                <CardBody>
                    <Row>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>ORDER NO:</p>
                                <p><strong>673290789</strong></p>
                            </div>
                        </Col>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>SHIPPED DATE:</p>
                                <p><strong>01 Oct, 2019</strong></p>
                            </div>
                        </Col>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>STATUS</p>
                                <p><strong>Awating Delivery</strong></p>
                            </div>
                        </Col>
                        <Col className="bg-light" md="3">
                            <div>
                                <p>ORDER AMOUNT</p>
                                <p><strong>$259.00</strong></p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="bg-light">
                            <Row>
                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light" md="1">
                                    <div>
                                        <img className="tamanoImagen  margenSuperior" src="https://www.elcarrocolombiano.com/wp-content/uploads/2021/02/20210208-TOP-75-CARROS-MAS-VENDIDOS-DE-COLOMBIA-EN-ENERO-2021-01.jpg" />
                                    </div>
                                </Col>

                                <Col className="bg-light margenIzquierdoButton marginSuperiorBotones" md="3">
                                    <Button outline color="dark" className="Borde" >
                                        Order Details
                                    </Button>
                                    {' '}
                                </Col>

                                <Col className="bg-light marginSuperiorBotones" md="3">
                                    <Button outline color="dark" className="Borde" >
                                        Track Orders
                                    </Button>
                                    {' '}
                                </Col>

                            </Row>

                        </Col>


                    </Row>

                </CardBody>
            </Card>

            </div>
        
        )
}

export default OrderList