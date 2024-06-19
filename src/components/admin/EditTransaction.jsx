import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import Form from "../Form";
import { useModal } from "../../context/ModalProvider";
import Select from "../Select";

const EditTransaction = () => {
  const { transactionId } = useParams();
  const [info, setInfo] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();

  useEffect(() => {
    let isMounted = true;
    //Fetch client
    const getTransaction = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/transactions/getTransaction/${transactionId}`
        );
        setInfo(response?.data);
      } catch (error) {
        openModal({
          message: `${error.message}`,
        });
      }
    };
    getTransaction();

    return () => {
      isMounted = false;
    };
  }, []);

  //Edit Transaction
  const handleSubmit = async (formData) => {
    try {
      const response = await axiosPrivate.put(
        `/api/transactions/updateTransaction/${transactionId}`,
        JSON.stringify({ formData })
      );
      if (response.status === 204) {
        openModal({ message: "Transaccion actualizada" });
      }
    } catch (error) {
      openModal({ message: error.message });
    }
  };

  return (
    <section className="flex flex-col">
      <Form onSubmit={handleSubmit} title="Editar Transaccion">
        <Input
          id="Id del Cliente"
          type="text"
          placeholder={info.ClientID}
          name="ClientID"
          value=""
        />

        <Input
          id="Cantidad cobrada"
          type="number"
          placeholder={info.Amount_charged}
          value=""
          name="Amount_charged"
        />
        <Select
          value=""
          id="Moneda"
          name="Currency"
          options={[
            { value: "CUP", label: "CUP" },
            { value: "MLC", label: "MLC" },
            { value: "USD", label: "USD" },
          ]}
          defaultValue={info.Currency}
        />
        <Select
          value=""
          id="Tipo de transaccion"
          name="Type_of_transaction"
          options={[
            { value: "ADD", label: "ADD" },
            { value: "SUBTRACT", label: "SUBTRACT" },
            { value: "EXPENSE", label: "EXPENSE" },
          ]}
          defaultValue={info.Type_of_transaction}
        />
        <Input
          id="Cantidad de creditos"
          type="number"
          placeholder={info.Credit_amount}
          value=""
          name="Credit_amount"
        />
        <Input
          id="Descripcion"
          type="text"
          placeholder={info.Description}
          value=""
          name="Description"
        />
        <Button type="submit">Editar</Button>
      </Form>
    </section>
  );
};
export default EditTransaction;
