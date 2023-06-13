import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link
                        to="/dashboard"
                        className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none text-center"
                        >
                        <span className="fs-5 d-none d-sm-inline text-center">Todo App</span>
                        </Link>
                        <ul
                        className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                        id="menu"
                        >
                        {/* <li className="nav-item">
                            <Link to='/dashboard' className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house" />{" "}
                            <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                            </Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to='/dashboard/todo' className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house" />{" "}
                            <span className="ms-1 d-none d-sm-inline">Todo List</span>
                            </Link>
                        </li>
                        </ul>
                        <hr />
                        <div className="dropdown pb-4">
                           All Rights Reserved &copy; 2023
                        </div>
                    </div>
                    
    );
};

export default SideBar;