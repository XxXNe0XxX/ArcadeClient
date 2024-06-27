import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../Form";
import { useModal } from "../../context/ModalProvider";
import { getModifiedFields } from "../../utils/lowerCaseUpperCase";

const EditMachine = () => {
  const { machineId } = useParams();
  const [clients, setClients] = useState([]);
  const [info, setInfo] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    let isMounted = true;

    //Get Clients
    const getClients = async () => {
      try {
        const response = await axiosPrivate.get("/api/client/info");
        if (response?.status === 200) {
          setClients(response.data);
        }
      } catch (error) {
        openModal({ message: error.message });
      }
    };

    //Get Machine
    const getMachine = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/arcademachines/${machineId}`
        );
        if (response?.status === 200) {
          setInfo(response.data);
        }
      } catch (error) {
        openModal({ message: error.message });
      }
    };

    getClients();
    getMachine();

    return () => {
      isMounted = false;
    };
  }, [refetch]);

  //Edit Machine
  const editMachine = async (formData) => {
    console.log(formData, info);
    const modifiedFields = getModifiedFields(info, formData);
    try {
      const response = await axiosPrivate.patch(
        `/api/arcademachines/${machineId}`,
        JSON.stringify({ ...modifiedFields })
      );
      if (response?.status === 204) {
        openModal({ message: "Arcade actualizado" });
        setRefetch(!refetch);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        openModal({ message: "Al menos un campo es requerido" });
      } else {
        openModal({ message: error.message });
      }
    }
  };

  const fields = [
    {
      id: "Juego",
      name: "game",
      type: "input",
      placeholder: "Ultra Street Fighter IV",
    },
    {
      id: "Ubicacion",
      name: "location",
      type: "input",
      placeholder: "Ubicacion",
    },
    {
      id: "Creditos por partida",
      name: "creditsPerGame",
      type: "input",
      placeholder: "1",
    },
    {
      id: "Correo",
      name: "clientID",
      type: "select",
      placeholder: `${
        clients &&
        info &&
        clients.find((each) => each.clientId === info.ClientID)?.email
      } actual`,
      options: clients?.map((each) => {
        return { value: each.clientId, label: each.email };
      }),
    },
  ];

  return (
    <>
      <Form
        onSubmit={editMachine}
        title="Editar Arcade"
        fields={fields}
        initialValues={info}
      ></Form>
    </>
  );
};

export default EditMachine;
