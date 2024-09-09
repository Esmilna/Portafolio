import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { Card } from 'reactstrap'
import React from 'react'

function Summary() {
  return (
        <div className="row py-3">
            <div className="col-12 col-md-6 col-lg-4 pb-3">
                <Card body className='shadow'>
                    <div className="row">
                        <div className="col-4">
                            <div className="rounded-circle bg-success d-inline-block p-3">
                                <FontAwesomeIcon className='text-light' icon={faSackDollar} size='3x' color='green' />
                            </div>
                        </div>
                        <div className="col-8">
                            <p className='text-muted mb-1'>Total Sales</p>
                            <h3 className='fw-bolder'>$256,120</h3>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="col-12 col-md-6 col-lg-4 pb-3">
                <Card body className='shadow'>                    
                    <div className="row">
                        <div className="col-4">
                            <div className="rounded-circle bg-primary d-inline-block p-3">
                                <FontAwesomeIcon className='text-light' icon={faSackDollar} size='3x' color='sky' />
                            </div>
                        </div>
                        <div className="col-8">
                            <p className='text-muted mb-1'>Total Sales</p>
                            <h3 className='fw-bolder'>$256,120</h3>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="col-12 col-md-6 col-lg-4 pb-3">
                <Card body className='shadow'>
                    <div className="row">
                        <div className="col-4">
                            <div className="rounded-circle bg-danger d-inline-block p-3">
                                <FontAwesomeIcon className='text-light' icon={faSackDollar} size='3x'/>
                            </div>
                        </div>
                        <div className="col-8">
                            <p className='text-muted mb-1'>Total Sales</p>
                            <h3 className='fw-bolder'>$256,120</h3>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
  )
}

export default Summary