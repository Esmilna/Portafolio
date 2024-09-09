import React, { useState } from 'react';
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './NavMenu.css';
import { useAuthentication } from './Context/AuthenticationContext';
import AdminDropdownBar from './Header/AdminDropdownBar';
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function NavMenu () {
  const [collapsed, setCollapsed] = useState(true)
  const { isLoggedIn, role, handleLogout, fullName, avatar } = useAuthentication()
  const navigate = useNavigate()

  const cart = localStorage.getItem("cart")

  const toggleNavbar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        {isLoggedIn && role === "admin" &&<AdminDropdownBar />}
        <NavbarBrand tag={Link} to="/"><img src={logo} alt="Logo" height={50} width={50}/></NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark fw-bold" to="/">Inicio</NavLink>
            </NavItem>
              {
                !isLoggedIn ? 
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/login">Iniciar Sesión</NavLink>
                </NavItem> :
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <img src={avatar} alt="Avatar" className='img-fluid border rounded-circle me-3' width={50} height={50} />
                    <div className="d-inline-block">
                      <div className="d-flex flex-column">
                        <span className='fw-bold'>{fullName}</span>
                        <span className='text-muted'>Usuario {role}</span>
                      </div>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem onClick={() => navigate("/profile")}>Perfil</DropdownItem>
                    <DropdownItem onClick={() => navigate("/orders")}>Mis pedidos</DropdownItem>
                    <DropdownItem className="text-dark pointer" onClick={handleLogout}>Cerrar Sesión</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
            <NavItem>
              <NavLink tag={Link} to="/cart" className='text-dark'>
                <FontAwesomeIcon icon={faCartShopping} />

                {cart && 
                  <span className='cart-count'>{JSON.parse(cart).length}</span>
                }
                
              </NavLink>
            </NavItem>
            <NavItem>
              {isLoggedIn && role === "admin" && <NavLink tag={Link} className="text-dark" to="/dashboard"><span className='text-success fw-bold'>Ir al Dashboard</span></NavLink>}
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
}

export default NavMenu