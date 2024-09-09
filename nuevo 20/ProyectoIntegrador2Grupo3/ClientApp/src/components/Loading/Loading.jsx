

import React from 'react'
import { Spinner } from 'reactstrap'

export const Loading = () => {
  return (
    <div className='loading'>
        <Spinner color='primary' style={{height: "3rem", width: "3rem"}}>
            Loading...
        </Spinner>
    </div>
  )
}

export default Loading
