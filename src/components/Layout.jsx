import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import React from "react";
import { useLocation } from "react-router-dom";
const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      {!location.pathname.includes("/dash") &&
        !location.pathname.includes("/clientdash") && (
          <div className="pb-16"></div>
        )}

      <Outlet />
    </>
  );
};

export default Layout;
