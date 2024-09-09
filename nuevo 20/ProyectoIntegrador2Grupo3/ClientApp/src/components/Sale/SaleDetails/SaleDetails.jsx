import { useState } from 'react'
import { updateOrder } from '../../../helpers/saleHelpers'
import OrderDetails from '../../Order/OrderDetails/OrderDetails'
import {useAlert} from '../../Context/AlertContext'
import { useNavigate } from 'react-router-dom'

function SaleDetails() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showAlert }  = useAlert()
    const navigate = useNavigate()

    const editOrder = (e, id, status) => {
        e.preventDefault()
        setIsSubmitting(true)

        updateOrder(id, {status})
            .then(data => {
                if(data.success){
                    showAlert("success", data.message)
                    setTimeout(() => navigate(0), 2000)
                }else{
                    showAlert("danger", data.message)
                }
            })
            .catch(() => {
                showAlert("danger", "Ha ocurrido un problema. Contacte con el soporte")
            })
            .finally(() => setIsSubmitting(false))
    }


    return (
        <OrderDetails editOrder={editOrder} isSubmitting={isSubmitting}/>
    )
}

export default SaleDetails