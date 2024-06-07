import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import React from "react";
import { useLocation } from "react-router-dom";
const Layout = () => {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("/clientdash" || "/dash") && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;
