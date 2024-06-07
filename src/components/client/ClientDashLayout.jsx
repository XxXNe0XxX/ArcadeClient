import { Outlet } from "react-router-dom";
import ClientDashHeader from "./ClientDashHeader";
import ClientDashFooter from "./ClientDashFooter";
const ClientDashLayout = () => {
  return (
    <section className="h-screen flex flex-col justify-between">
      <ClientDashHeader />

      <Outlet />

      <ClientDashFooter />
    </section>
  );
};

export default ClientDashLayout;
