import React from 'react';
import { Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'reactstrap';

function ListaEnReparacion() {


    return (
        <div>
          
                <Table>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                               Vehículos
                            </th>
                            <th>
                               Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                1
                            </th>
                            <td>
                                Toyota Corolla
                            </td>
                        <td>
                            <UncontrolledDropdown>
                                <DropdownToggle
                                    caret
                                    color="dark"
                                >
                                    Estado
                                </DropdownToggle>
                                <DropdownMenu dark>
                                    <DropdownItem text>
                                        Reparado
                                    </DropdownItem>
                                    <DropdownItem>
                                        En proceso
                                    </DropdownItem>
                                    <DropdownItem text>
                                        No reparado
                                    </DropdownItem>                                 
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                2
                            </th>
                            <td>
                                Jacob
                            </td>
                        <td>
                            <UncontrolledDropdown>
                                <DropdownToggle
                                    caret
                                    color="dark"
                                >
                                    Estado
                                </DropdownToggle>
                                <DropdownMenu dark>
                                    <DropdownItem text>
                                        Reparado
                                    </DropdownItem>
                                    <DropdownItem>
                                        En proceso
                                    </DropdownItem>
                                    <DropdownItem text>
                                        No reparado
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>                         
                        </tr>
                        <tr>
                            <th scope="row">
                                3
                            </th>
                            <td>
                                Larry
                            </td>
                        <td>
                            <UncontrolledDropdown>
                                <DropdownToggle
                                    caret
                                    color="dark"
                                >
                                    Estado
                                </DropdownToggle>
                                <DropdownMenu dark>
                                    <DropdownItem text>
                                        Reparado
                                    </DropdownItem>
                                    <DropdownItem>
                                        En proceso
                                    </DropdownItem>
                                    <DropdownItem text>
                                        No reparado
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>                            
                        </tr>
                    </tbody>
                </Table>
         
        </div>
        
        )
}

export default ListaEnReparacion    