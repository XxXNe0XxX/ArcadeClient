import React from "react";
import Button from "./Button";
import Input from "./Input";
import Form from "./Form";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useModal } from "../context/ModalProvider";
import Textarea from "./Textarea";
const EmailContact = () => {
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const sendEmail = async (formData) => {
    try {
      const response = await axiosPrivate.post(
        "/api/email/send-email",
        JSON.stringify({ formData })
      );
      if (response.status === 200) {
        openModal({ message: "Correo enviado" });
      }
    } catch (error) {
      openModal({ message: error.message });
    }
  };

  return (
    <Form onSubmit={sendEmail} title="Comunicate">
      <Input
        type="text"
        id="Nombre"
        name="name"
        value=""
        placeholder="Nombre"
      ></Input>
      <Input
        type="email"
        id="Correo"
        name="email"
        value={""}
        placeholder="correo@mail.com"
        required
      ></Input>
      <Textarea
        id="Mensaje"
        value=""
        name="message"
        placeholder="Cuentanos que sucede..."
      ></Textarea>
      <Button type="submit">Enviar</Button>
    </Form>
  );
};

export default EmailContact;
