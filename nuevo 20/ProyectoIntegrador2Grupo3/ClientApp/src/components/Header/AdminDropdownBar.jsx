import React, { useState } from 'react'
import { NavbarToggler, Offcanvas, OffcanvasHeader, OffcanvasBody, Nav } from 'reactstrap'
import CollapseNavItems from './CollapseNavItems'
import logo from '../../assets/logo.png'

function AdminDropdownBar() {
    const [isCollapsed, setIsCollapsed] = useState(true)

    const dropdownToggle = () => setIsCollapsed(!isCollapsed)

    return (
        <>
            <NavbarToggler onClick={dropdownToggle} className="me-2 d-inline-block text-primary border border-primary"/>
            <Offcanvas toggle={dropdownToggle} isOpen={!isCollapsed} scrollable>
                <OffcanvasHeader toggle={dropdownToggle}>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <img className='img-fluid d-block m-auto' width={80} height={80} src={logo} alt="logo" />
                    <Nav vertical className='left-side-dropdown-bar'>
                        <CollapseNavItems dropdownToggle={dropdownToggle}/>
                    </Nav>
                </OffcanvasBody>
            </Offcanvas>
        </>
    )
}

export default AdminDropdownBar