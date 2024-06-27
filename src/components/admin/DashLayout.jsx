import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
const DashLayout = () => {
  return (
    <section className="min-h-screen flex flex-col justify-between">
      <DashHeader />
      <Outlet />
      <DashFooter />
    </section>
  );
};

export default DashLayout;
