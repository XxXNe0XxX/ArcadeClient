import { Outlet } from "react-router-dom";
import ClientDashHeader from "./ClientDashHeader";
import ClientDashFooter from "./ClientDashFooter";
const ClientDashLayout = () => {
  return (
    <section className=" min-h-screen  justify-between flex flex-col ">
      <ClientDashHeader />

      <Outlet />

      <ClientDashFooter />
    </section>
  );
};

export default ClientDashLayout;
