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
        "/api/arcademachines/createArcadeMachine",
        JSON.stringify({
          formData,
        })
      );
      response?.status === 201 &&
        openModal({
          message: `Arcade creado`,
        });
    } catch (error) {
      openModal({
        message: ` ${error.message}`,
      });
    }
  };

  return (
    <>
      <Form onSubmit={createArcade} title="Crear Arcade">
        <Input
          type="email"
          id="Correo del cliente"
          name="email"
          value=""
          placeholder="correo@mail.com"
          required
        ></Input>
        <Input
          type="text"
          id="Nombre del juego"
          name="game"
          value=""
          placeholder="Ultra Street Fighter IV"
          required
        ></Input>
        <Input
          min={1}
          type="number"
          id="Creditos por partida"
          name="creditsPerGame"
          value=""
          placeholder="1"
          required
        ></Input>
        <Button type="submit">Crear</Button>
      </Form>
    </>
  );
};

export default CreateArcade;
