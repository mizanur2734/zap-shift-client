import React from "react";
import { Link, NavLink } from "react-router";
import ProFastLogo from "../ProfastLogo/ProFastLogo";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const {user, logOut} = useAuth()

  const handleLogOut = () =>{
    logOut()
    .then(result => {console.log(result)})
    .catch(error => console.error(error));
  }

    const navItems = <>
        <li><NavLink to="/" className='text-[#606060]'>Home</NavLink></li>
        <li><NavLink to="/sendParcel" className='text-[#606060]'>Send A Parcel</NavLink></li>
        <li><NavLink to="/coverage" className='text-[#606060]'>Coverage</NavLink></li>
        {
          user && <>
            <li><NavLink to="/dashboard" className='text-[#606060]'>Dashboard</NavLink></li>
          </>
        }
        <li><NavLink to="/beARider" className='text-[#606060]'>Be a Rider</NavLink></li>
        <li><NavLink to="/about" className='text-[#606060]'>About Us</NavLink></li>
    </>
  return (
  <div className="py-4">
      <div className="navbar bg-[#FFFFFF] shadow-sm rounded-2xl ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <div className="text-xl">
            <ProFastLogo className="text-black"></ProFastLogo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? <button onClick={handleLogOut} className="btn bg-[#CAEB66] text-black">Log Out</button>
           : 
          <Link to='/login' className="btn bg-[#CAEB66] border-none px-6 py-3 text-black rounded-md">Login</Link>
        }
      </div>
    </div>
  </div>
  );
};

export default Navbar;
