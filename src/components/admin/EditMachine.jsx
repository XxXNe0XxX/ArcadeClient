import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import Form from "../Form";
import { useModal } from "../../context/ModalProvider";

const EditMachine = () => {
  const { machineId } = useParams();
  const [clients, setClients] = useState([]);
  const [info, setInfo] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();

  useEffect(() => {
    let isMounted = true;

    //Get Clients
    const getClients = async () => {
      try {
        const response = await axiosPrivate.get("/api/clients");
        if (response?.status === 200) {
          setClients(response.data);
          // Find the current client by ClientID and set currentClient to the entire client object
        }
      } catch (error) {
        openModal({ message: error.message });
      }
    };

    //Get Machine
    const getMachine = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/arcademachines/getArcadeMachine/${machineId}`
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
  }, []);

  //Edit Machine
  const editMachine = async (formData) => {
    try {
      const response = await axiosPrivate.put(
        `/api/arcademachines/updateArcadeMachine/${machineId}`,
        JSON.stringify({ formData })
      );
      if (response?.status === 204) {
        openModal({ message: "Arcade actualizado" });
      }
    } catch (error) {
      if (error.response.status === 400) {
        openModal({ message: "Al menos un campo es requerido" });
      } else {
        openModal({ message: error.message });
      }
    }
  };
  return (
    <>
      <Form onSubmit={editMachine} title="Editar Arcade">
        <Input
          type="text"
          id="Nombre del juego"
          name="game"
          value=""
          placeholder={`${info.Game}`}
        ></Input>
        <Input
          min={1}
          type="number"
          id="Creditos por partida"
          name="creditsPerGame"
          value=""
          placeholder={`${info.CreditsPerGame}`}
        ></Input>
        <Input
          type="select"
          value=""
          id="Cliente"
          name="clientId"
          options={clients}
          label="ClientEmail"
          defaultValue={
            clients && info
              ? clients?.find((each) => each.ClientID === info.ClientID)
                  ?.ClientEmail
              : ""
          }
        />
        <Button type="submit">Editar</Button>
      </Form>
      {/* <DeleteClient email={currentEmail} setMsg={setMsg}></DeleteClient>
        <EditBalance email={currentEmail} setMsg={setMsg}></EditBalance> */}
    </>
  );
};

export default EditMachine;
