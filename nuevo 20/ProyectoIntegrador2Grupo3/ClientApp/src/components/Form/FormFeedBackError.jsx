

import React from 'react'
import { FormFeedback } from 'reactstrap'

function FormFeedBackError({error, touched}) {
    if(Boolean(error) && touched){
        return (
            <FormFeedback>
                {error}
            </FormFeedback>
        )
    }
}

export default FormFeedBackError