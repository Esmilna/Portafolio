import React, { useState } from 'react'
import { AccordionBody, AccordionHeader, AccordionItem, Col, Form, Input, Label, Row, Accordion} from 'reactstrap'
import SubmitButton from '../../Form/SubmitButton'

function EditOrderForm({ editOrder, id, isSubmitting }) {
    const [open, setOpen] = useState("")
    const [status, setStatus] = useState()

    const toggle = (id) => {
        if (open === id) {
          setOpen("");
        } else {
          setOpen(id);
        }
    };

    return (
        <Accordion open={open} toggle={toggle}>
            <AccordionItem>
                <AccordionHeader targetId='1'>
                    <span className='fw-bold'>Editar</span>
                </AccordionHeader>
                <AccordionBody accordionId="1">
                    <Form onSubmit={(e) => editOrder(e, id, status)}>
                        <Row className='justify-content-between align-items-center'>
                            <Col>
                                <Label for="status">Elije el estado que quieras asignar</Label>
                                <Input type='select' name='status' id='status' defaultValue={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value=""></option>
                                    <option value="En Proceso">En Proceso</option>
                                    <option value="En transmisión">En transmisión</option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="Finalizada">Finalizada</option>
                                    <option value="Cancelada">Cancelada</option>
                                </Input>
                            </Col>
                            <Col>
                                <SubmitButton text="Enviar" loading={isSubmitting} />
                            </Col>
                        </Row>
                    </Form>
                </AccordionBody>
            </AccordionItem>
        </Accordion>
    )
}

export default EditOrderForm