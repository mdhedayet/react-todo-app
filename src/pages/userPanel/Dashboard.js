import React from 'react';
import { Outlet } from "react-router-dom";
import SideBar from '../../components/SideBar';
import {Nav, NavDropdown, Navbar } from 'react-bootstrap';

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <SideBar />
                </div>
                <div className="col p-0 m-0">
                <Navbar bg="light" expand="lg" className='h-60 px-3'>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                                <Nav className="justify-content-end">
                                    <NavDropdown title="Md Hedayet Ullah" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                </Navbar>
                <div className="container-fluid pt-3">
                    <Outlet />
                </div>
                </div>
            </div>
            </div>

    );
};

export default Dashboard;