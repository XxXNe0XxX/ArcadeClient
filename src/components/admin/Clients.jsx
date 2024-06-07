import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

import Table from "../Table";
const Clients = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [clients, setClients] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getClients = async () => {
      try {
        const response = await axiosPrivate.get("/api/clients", {
          withCredentials: true,
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setClients(response.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getClients();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  const handleEdit = (row) => {
    navigate(
      `/dash/edit-client/${row.ClientEmail}/${row.ClientName}/${row.ClientContact}/${row.ClientAddress}`
    );
  };
  return (
    <section className="h-full">
      {clients && (
        <Table data={clients} title={"Clientes"} onEdit={handleEdit} />
      )}
    </section>
  );
};

export default Clients;
