import React, { useState } from 'react';
import {
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button,
} from 'reactstrap';


function AddProduct(args) {
    return <Form>
        <Row>
            <Col md={5}>
                <FormGroup>
                    <Label for="Nombre">
                        Nombre
                    </Label>
                    <Input
                        id="exampleEmail"
                        name="email"
                      
                        type="email"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Modelo
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"
                       
                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Marca
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Chasis
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Placa
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Año
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Color
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Cilindraje
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Kilometro en Tablero
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Numero de puertas
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Precio
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Stock
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Fecha de registro
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            <Col md={5}>
                <FormGroup>
                    <Label for="examplePassword">
                        Fecha de modificación
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"

                        type="password"
                    />
                </FormGroup>
            </Col>
            
           
        </Row>
       
            
        <FormGroup check>
            <Input
                id="exampleCheck"
                name="check"
                type="checkbox"
            />
            <Label
                check
                for="exampleCheck"
            >
                Confirmar
            </Label>
        </FormGroup>
        <Button>
            Agregar Vehiculo
        </Button>
    </Form>
    
}

export default AddProduct;