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
        JSON.stringify({ ...formData }),
      );
      response?.status === 201 && openModal({ message: "User created" });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        openModal({ message: error.response.data.errors[0].msg });
      } else {
        openModal({ message: error.response.data.message });
      }
    }
  };

  const fields = [
    { id: "Name", name: "name", type: "input", placeholder: "Name" },
    {
      id: "Last Name",
      name: "lastName",
      type: "input",
      placeholder: "Last Name",
    },

    { id: "Contact", name: "contact", type: "input", placeholder: "12345678" },
    {
      id: "Email",
      name: "email",
      type: "input",
      placeholder: "email@mail.com",
    },
    {
      id: "Password",
      name: "password",
      type: "input",
      placeholder: "********",
    },
    {
      id: "Province",
      name: "province",
      type: "select",
      placeholder: "Select the province",
      options: Object.keys(regions).map((each) => {
        return { value: each, label: each };
      }),
    },
    {
      id: "Municipality",
      name: "municipality",
      type: "select",
      placeholder: "Select the municipality",
      dependentField: "province",
    },
    {
      id: "Address",
      name: "address",
      type: "input",
      placeholder: "Street between and",
    },
    {
      id: "User Type",
      name: "role",
      type: "select",
      placeholder: "Select type",
      options: [
        { value: "CLIENT", label: "Client" },
        { value: "TECHNICIAN", label: "Technician" },
      ],
    },
  ];

  return (
    <Form onSubmit={createUser} fields={fields} title="Create User"></Form>
  );
};

export default CreateUser;
