import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import Form from "../Form";
import { useModal } from "../../context/ModalProvider";
import Select from "../Select";

const EditMachine = () => {
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();

  //Edit Machine
  const createExpense = async (formData) => {
    try {
      const response = await axiosPrivate.post(
        `/api/transactions/createExpense/${localStorage.getItem("email")}`,
        JSON.stringify({ formData })
      );
      if (response?.status === 201) {
        openModal({ message: "Gasto creado" });
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
      <Form onSubmit={createExpense} title="Crear Gasto">
        <Input
          id="Cantidad cobrada"
          type="number"
          placeholder="$$$$$$$$$"
          value=""
          name="Amount_charged"
          required
        />
        <Select
          value=""
          id="Moneda"
          name="Currency"
          options={[
            { value: "CUP", label: "CUP" },
            { value: "MLC", label: "MLC" },
            { value: "USD", label: "USD" },
            { value: "", label: "Selecciona la moneda" },
          ]}
          required
        />
        <Input
          id="Descripcion"
          type="text"
          placeholder="Breve descripcion del gasto"
          value=""
          name="Description"
          required
        />
        <Button type="submit">Editar</Button>
      </Form>
    </>
  );
};

export default EditMachine;
