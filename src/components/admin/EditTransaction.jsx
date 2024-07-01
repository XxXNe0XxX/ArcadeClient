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
          `/api/transactions/${transactionId}`
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
    try {
      const response = await axiosPrivate.patch(
        `/api/transactions/${transactionId}`,
        JSON.stringify({ ...formData })
      );
      if (response.status === 204) {
        openModal({ message: "Transaccion actualizada" });
      }
      setRefetch(!refetch);
    } catch (error) {
      openModal({ message: error.message });
    }
  };
  const fields = [
    {
      id: "Cantidad Cobrada",
      name: "amountCharged",
      type: "input",
      placeholder: "Cantidad Cobrada",
    },
    {
      id: "Cantidad de Creditos",
      name: "creditAmount",
      type: "input",
      placeholder: "Cantidad de Creditos",
    },
    {
      id: "Moneda",
      name: "currency",
      type: "select",
      placeholder: "Selecciona la Moneda",
      options: [
        { value: "MLC", label: "MLC" },
        { value: "USD", label: "USD" },
        { value: "CUP", label: "CUP" },
        { value: "DEDUCTED", label: "DEDUCTED" },
      ],
    },
    {
      id: "Tipo de transaccion",
      name: "typeOfTransaction",
      type: "select",
      placeholder: "Selecciona el tipo",
      options: [
        { value: "ADD", label: "ADD" },
        { value: "SUBTRACT", label: "SUBTRACT" },
        { value: "EXPENSE", label: "EXPENSE" },
      ],
    },
    {
      id: "Descripcion",
      name: "description",
      type: "textarea",
      placeholder: "Descripcion",
    },
    {
      id: "Tasa de cambio",
      name: "exchangeRate",
      type: "input",
      placeholder: "",
    },
  ];

  return (
    <Form
      onSubmit={handleSubmit}
      title="Editar Transaccion"
      fields={fields}
      initialValues={info}
    ></Form>
  );
};
export default EditTransaction;
