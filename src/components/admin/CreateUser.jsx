import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Form from "../Form";
import { useModal } from "../../context/ModalProvider";
import { regions } from "../../data/regions";
import { useState } from "react";
const CreateUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const createUser = async (formData) => {
    try {
      const response = await axiosPrivate.post(
        "/api/users",
        JSON.stringify({ ...formData })
      );
      response?.status === 201 && openModal({ message: "Usuario creado" });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        openModal({ message: error.response.data.errors[0].msg });
      }
    }
  };

  const fields = [
    { id: "Nombre", name: "name", type: "input", placeholder: "Nombre" },
    {
      id: "Apellido",
      name: "lastName",
      type: "input",
      placeholder: "Apellido",
    },

    { id: "Contacto", name: "contact", type: "input", placeholder: "12345678" },
    {
      id: "Correo",
      name: "email",
      type: "input",
      placeholder: "correo@mail.com",
    },
    {
      id: "Contraseña",
      name: "password",
      type: "input",
      placeholder: "********",
    },
    {
      id: "Provincia",
      name: "province",
      type: "select",
      placeholder: "Selecciona la provincia",
      options: Object.keys(regions).map((each) => {
        return { value: each, label: each };
      }),
    },
    {
      id: "Municipio",
      name: "municipality",
      type: "select",
      placeholder: "Selecciona el municipio",
      dependentField: "province",
    },
    {
      id: "Direccion",
      name: "address",
      type: "input",
      placeholder: "Calle a entre b y c",
    },
    {
      id: "Tipo de usuario",
      name: "role",
      type: "select",
      placeholder: "Selecciona el tipo",
      options: [
        { value: "CLIENT", label: "Cliente" },
        { value: "TECHNICIAN", label: "Tecnico" },
      ],
    },
  ];

  return (
    <Form onSubmit={createUser} fields={fields} title="Crear Usuario"></Form>
  );
};

export default CreateUser;
