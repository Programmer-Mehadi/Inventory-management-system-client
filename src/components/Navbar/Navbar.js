import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Navbar = () => {
    const { user, loading } = useContext(AuthContext);

    const navigate = useNavigate();

    const location = useLocation()

    const logOut = () => {
        localStorage.removeItem('jwt');
         navigate('/login');
    }

    const liList = <>
        {
            user ? <>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><Link onClick={logOut}>Logout</Link></li>
            </> : <><li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Signup</Link></li></>
        }


    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <a className="btn btn-ghost normal-case text-sm md:text-xl ">Inverntory Management System</a>
                </div>

                <div className="navbar-end">
                    <ul className="menu menu-horizontal hidden lg:flex p-0">
                        {liList}
                    </ul>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 px-4 shadow bg-base-100 rounded-box w-fit ml-[-120px]">
                            {liList}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;