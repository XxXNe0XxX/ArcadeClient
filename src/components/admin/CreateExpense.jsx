import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Form from "../Form";
import { useModal } from "../../context/ModalProvider";

const CreateExpense = () => {
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();

  //Edit Machine
  const createExpense = async (formData) => {
    try {
      const response = await axiosPrivate.post(
        `/api/transactions/createExpense/`,
        JSON.stringify({ ...formData })
      );
      if (response?.status === 201) {
        openModal({ message: "Gasto creado" });
      }
    } catch (error) {
      if (error.response.status === 400) {
        openModal({ message: "Al menos un campo es requerido" });
      } else {
        openModal({ message: error.response.data.message });
      }
    }
  };

  const fields = [
    {
      id: "Cantidad Cobrada",
      name: "amountCharged",
      type: "input",
      placeholder: "$$$$$$$$",
    },
    {
      id: "Moneda",
      name: "currency",
      type: "select",
      placeholder: "Selecciona la moneda",
      options: [
        { value: "MLC", label: "MLC" },
        { value: "USD", label: "USD" },
        { value: "CUP", label: "CUP" },
      ],
    },
    {
      id: "Descripcion",
      name: "description",
      type: "textarea",
      placeholder: "Descripcion",
    },
  ];
  return (
    <>
      <Form onSubmit={createExpense} title="Crear Gasto" fields={fields} />
    </>
  );
};

export default CreateExpense;
