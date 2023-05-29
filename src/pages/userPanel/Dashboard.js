import React from 'react';
import { Outlet } from "react-router-dom";
import SideBar from '../../components/SideBar';

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <SideBar />
                </div>
                <div className="col py-3">
                    <Outlet />
                </div>
            </div>
            </div>

    );
};

export default Dashboard;