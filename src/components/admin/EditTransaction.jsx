import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../Form";
import { useModal } from "../../context/ModalProvider";

const EditTransaction = () => {
  const { transactionId } = useParams();
  const [info, setInfo] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    let isMounted = true;
    //Fetch client
    const getTransaction = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/transactions/${transactionId}`,
        );
        setInfo(response?.data);
      } catch (error) {
        openModal({
          message: `${error.reponse.data.message}`,
        });
      }
    };
    getTransaction();

    return () => {
      isMounted = false;
    };
  }, [refetch]);

  //Edit Transaction
  const handleSubmit = async (formData) => {
    if (formData === info) {
      return openModal({ message: "At least one field must be modified" });
    }
    try {
      const response = await axiosPrivate.patch(
        `/api/transactions/${transactionId}`,
        JSON.stringify({ ...formData }),
      );
      if (response.status === 204) {
        openModal({ message: "Transaction updated" });
      }
      setRefetch(!refetch);
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
      placeholder: "Amount Charged",
    },
    {
      id: "Credit Amount",
      name: "creditAmount",
      type: "input",
      placeholder: "Credit Amount",
    },
    {
      id: "Currency",
      name: "currency",
      type: "select",
      placeholder: "Select Currency",
      options: [
        { value: "MLC", label: "MLC" },
        { value: "USD", label: "USD" },
        { value: "CUP", label: "CUP" },
        { value: "DEDUCTED", label: "DEDUCTED" },
      ],
    },
    {
      id: "Transaction Type",
      name: "typeOfTransaction",
      type: "select",
      placeholder: "Select type",
      options: [
        { value: "ADD", label: "ADD" },
        { value: "SUBTRACT", label: "SUBTRACT" },
        { value: "EXPENSE", label: "EXPENSE" },
      ],
    },
    {
      id: "Description",
      name: "description",
      type: "textarea",
      placeholder: "Description",
    },
    {
      id: "Exchange Rate",
      name: "exchangeRate",
      type: "input",
      placeholder: "",
    },
  ];

  return (
    <Form
      onSubmit={handleSubmit}
      title="Edit Transaction"
      fields={fields}
      initialValues={info}
    ></Form>
  );
};
export default EditTransaction;
