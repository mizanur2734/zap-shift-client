import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../pages/shared/ProfastLogo/ProFastLogo";
import { FaHome, FaBox, FaHistory, FaUserEdit, FaUsers, FaUserClock } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

const DashboardLayout = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/*  */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
          </div>
          {/* Page content here */}
          <Outlet></Outlet>
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <ProFastLogo></ProFastLogo>
            <li>
              <NavLink to="/" className="flex items-center gap-2">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myParcels"
                className="flex items-center gap-2"
              >
                <FaBox /> My Parcels
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/paymentHistory"
                className="flex items-center gap-2"
              >
                <FaHistory /> Payment History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/track"
                className="flex items-center gap-2"
              >
                <HiOutlineLocationMarker /> Track a Package
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/profile"
                className="flex items-center gap-2"
              >
                <FaUserEdit /> Update Profile
              </NavLink>
            </li>
            {/* riders link */}
            <li>
              <NavLink
                to="/dashboard/active-riders"
                className="flex items-center gap-2"
              >
                <FaUsers /> Active Riders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/pending-riders"
                className="flex items-center gap-2"
              >
                <FaUserClock /> Pending Riders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
