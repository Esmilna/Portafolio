import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import {  AccordionBody, AccordionHeader, AccordionItem, Nav, NavItem, NavLink } from 'reactstrap'

function AccordionNavItem({id, items, icon, text, dropdownToggle}) {

    return (
        <AccordionItem className='border-0'>
            <AccordionHeader targetId={id}>
                <div className="nav-link">
                    <FontAwesomeIcon icon={icon} size='2x' color='#0d6efd' />
                    <span className='fw-bold text-black ms-3'>{text}</span>
                </div>
            </AccordionHeader>
            <AccordionBody accordionId={id}>
                <Nav vertical>
                {
                    items.map((item,index) => (
                        <NavItem key={index}>
                            <NavLink tag={Link} to={item.path} onClick={dropdownToggle} className='fw-bold text-black'>
                                {item.text}
                            </NavLink>
                        </NavItem>    
                    ))
                }
                </Nav>
            </AccordionBody>
        </AccordionItem>
    )
}

export default AccordionNavItem