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
        }),
      );
      response?.status === 201 &&
        openModal({
          message: `Arcade created`,
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
      id: "Game",
      name: "game",
      type: "input",
      placeholder: "Ultra Street Fighter IV",
    },
    {
      id: "Location",
      name: "location",
      type: "input",
      placeholder: "Location",
    },
    {
      id: "Credits per Game",
      name: "creditsPerGame",
      type: "input",
      placeholder: "1",
    },
    {
      id: "Email",
      name: "email",
      type: "input",
      placeholder: "Client email",
    },
  ];

  return (
    <Form onSubmit={createArcade} fields={fields} title="Create Arcade"></Form>
  );
};

export default CreateArcade;
