import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "../Button";
import Input from "../Input";
import Form from "../Form";
import { useModal } from "../../context/ModalProvider";
const CreateArcade = () => {
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();

  const createArcade = async (formData) => {
    try {
      const response = await axiosPrivate.post(
        "/api/arcademachines/",
        JSON.stringify({
          ...formData,
        })
      );
      response?.status === 201 &&
        openModal({
          message: `Arcade creado`,
        });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        openModal({ message: error.response.data.errors[0].msg });
      } else {
        openModal({ message: error.response.data.message });
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
      name: "email",
      type: "input",
      placeholder: "Correo del cliente",
    },
  ];

  return (
    <Form onSubmit={createArcade} fields={fields} title="Crear Arcade"></Form>
  );
};

export default CreateArcade;
