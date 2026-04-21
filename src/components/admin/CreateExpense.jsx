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
        JSON.stringify({ ...formData }),
      );
      if (response?.status === 201) {
        openModal({ message: "Expense created" });
      }
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
      id: "Amount Charged",
      name: "amountCharged",
      type: "input",
      placeholder: "$$$$$$$$",
    },
    {
      id: "Currency",
      name: "currency",
      type: "select",
      placeholder: "Select currency",
      options: [
        { value: "MLC", label: "MLC" },
        { value: "USD", label: "USD" },
        { value: "CUP", label: "CUP" },
      ],
    },
    {
      id: "Description",
      name: "description",
      type: "textarea",
      placeholder: "Description",
    },
  ];
  return (
    <>
      <Form onSubmit={createExpense} title="Create Expense" fields={fields} />
    </>
  );
};

export default CreateExpense;
