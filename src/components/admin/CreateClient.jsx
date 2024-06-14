import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Modal from "../Modal";
import Button from "../Button";
import Input from "../Input";
import Form from "../Form";
import { useState } from "react";

const CreateClient = () => {
  const [msg, setMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const createClient = async (formData) => {
    try {
      const response = await axiosPrivate.post(
        "/api/clients/createClient",
        JSON.stringify({ formData })
      );
      response?.status === 201 && setMsg("Cliente creado");
    } catch (error) {
      if (error.response.status === 409) {
        setMsg("El correo ya existe");
      } else {
        setMsg(error.message);
      }
    }
  };

  const handleClose = () => {
    setMsg("");
  };

  return (
    <>
      <Form onSubmit={createClient} title="Crear Cliente">
        <Input
          id="Nombre"
          type="text"
          placeholder="Nombre"
          name="name"
          required
          value=""
        />
        <Input
          id="Contraseña"
          type="password"
          placeholder="********"
          required
          value=""
          name="password"
        />
        <Input
          id="Correo electronico"
          type="email"
          placeholder="correo@mail.com"
          required
          value=""
          name="email"
        />
        <Input
          id="Contacto"
          type="number"
          placeholder="Contactar a"
          required
          value=""
          name="contact"
        />
        <Input
          id="Direccion"
          type="text"
          placeholder="Direccion"
          required
          value=""
          name="address"
        />
        <Button type="submit">Crear</Button>
      </Form>
      <Modal message={msg} onClose={handleClose} />
    </>
  );
};

export default CreateClient;
