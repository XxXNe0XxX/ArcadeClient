import Table from "../Table";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalProvider";

const Clients = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [clients, setClients] = useState();
  const [refetch, setRefetch] = useState(false);
  const openModal = useModal();
  useEffect(() => {
    let isMounted = true;
    //Fetch clients
    const getClients = async () => {
      try {
        const response = await axiosPrivate.get("/api/clients", {
          withCredentials: true,
        });
        isMounted && setClients(response.data);
      } catch (error) {
        openModal({
          message: `${error.message}`,
        });
      }
    };
    getClients();
    return () => {
      isMounted = false;
    };
  }, [refetch]);

  //Edit Client
  const handleEdit = (row) => {
    navigate(`/dash/edit-client/${row.ClientID}`);
  };

  //Delete Client
  const handleDelete = async (row) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/clients/deleteClient/${row.ClientID}`,
        {
          withCredentials: true,
        }
      );
      response.status === 200 &&
        openModal({
          message: `Cliente eliminado`,
        });
      setRefetch(!refetch);
    } catch (error) {
      openModal({
        message: `${error.message}`,
      });
    }
  };

  return (
    <>
      {clients && (
        <Table
          data={clients}
          title={"Clientes"}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Clients;
