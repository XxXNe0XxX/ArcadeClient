import React from "react";
import Form from "./Form";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useModal } from "../context/ModalProvider";

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
  const fields = [
    { id: "Nombre", name: "name", type: "input", placeholder: "Nombre" },
    { id: "Correo", name: "email", type: "input", placeholder: "Correo" },
    {
      id: "Mensaje",
      name: "message",
      type: "textarea",
      placeholder: "Cuentanos que sucede...",
    },
  ];
  return <Form onSubmit={sendEmail} title="Comunicate" fields={fields}></Form>;
};

export default EmailContact;
