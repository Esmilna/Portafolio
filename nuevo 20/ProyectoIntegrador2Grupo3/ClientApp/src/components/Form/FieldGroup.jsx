import React from 'react'
import { FormGroup, InputGroup } from 'reactstrap'

function FieldGroup({check, children}) {
  return (
    <FormGroup check={check}>
      <InputGroup>
        {children}
      </InputGroup>
    </FormGroup>
  )
}

export default FieldGroup