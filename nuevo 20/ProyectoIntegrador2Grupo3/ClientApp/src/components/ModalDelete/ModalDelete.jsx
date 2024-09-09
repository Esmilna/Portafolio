import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

function ModalDelete({ modal, toggle, tableName, fullName, handleDelete }) {
    const [loading, setLoading] = useState(false)

    const handle = () => {
        setLoading(true)
        handleDelete()
        setLoading(false)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>Eliminar {tableName}</ModalHeader>
            <ModalBody>
                Estas seguro de eliminar a <span className='fw-bold'>{fullName}?</span>
            </ModalBody>
            <ModalFooter>
                {loading ?
                    <Button color='danger' disabled>
                        <Spinner size="sm">Loading...</Spinner>
                        <span>
                            {' '}Confirmar
                        </span>
                    </Button>    :
                    <Button color='danger' onClick={handle}>Confirmar</Button>
                }
                <Button color='secondary' onClick={toggle}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalDelete