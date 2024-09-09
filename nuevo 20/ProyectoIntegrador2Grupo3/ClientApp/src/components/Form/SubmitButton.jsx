

import React from 'react'
import { Button, Spinner } from 'reactstrap'

function SubmitButton({text, loading, fullWidth}) {
    if(loading) { 
        return (
            <Button type='submit' size='lg' color='primary' disabled className={`d-block ms-auto ${fullWidth ? 'w-100' : ''}`}>
                <Spinner size="sm">Loading...</Spinner>
                <span>
                    {' ' + text}
                </span>
            </Button>
        )
    } 
    else return <Button className={`d-block ms-auto ${fullWidth ? 'w-100' : ''}`} type='submit' size='lg' color='primary'>{text}</Button>
}

export default SubmitButton