import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-white bg-primary">
                        <Link to='/dashboard/addproduct' className='border-b py-2 border-zinc-500'><p>Add Product</p></Link>                        
                        <Link to='/dashboard/viewbysort' className='border-b py-2 border-zinc-500'><p>View by Sort</p></Link>
                        <Link to='/dashboard/viewcategories' className='border-b py-2 border-zinc-500'><p>View Categories</p></Link>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;