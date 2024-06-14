import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useModal } from "../../context/ModalProvider";
import Form from "../Form";
import Button from "../Button";
import Input from "../Input";
import { useParams } from "react-router-dom";

const EditBalance = () => {
  const { clientId } = useParams();
  const [info, setInfo] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    let isMounted = false;

    // Get client
    const getClient = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/clients/getClientById/${clientId}`
        );
        if (response?.status === 200) {
          setInfo(response.data);
        }
      } catch (error) {
        openModal({ message: error.message });
      }
    };
    getClient();
    return () => {
      isMounted = false;
    };
  }, [refetch]);

  // Add credits
  const addCredits = async (formData) => {
    try {
      const response = await axiosPrivate.post(
        `/api/credits/add-credits/${clientId}`,
        JSON.stringify({
          formData,
        })
      );
      if (response.statusText === "OK") {
        openModal({ message: "Creditos añadidos correctamente" });
      }
      setRefetch(!refetch);
    } catch (error) {
      openModal({ message: error.message });
      console.log(error);
    }
  };

  // Remove credits
  const removeCredits = async (formData) => {
    try {
      const response = await axiosPrivate.post(
        `/api/credits/remove-credits/${clientId}`,
        JSON.stringify({ formData })
      );
      if (response.statusText === "OK") {
        openModal({ message: "Creditos deducidos correctamente" });
      }
      setRefetch(!refetch);
    } catch (error) {
      openModal({ message: error.message });
    }
  };

  return (
    <>
      <ul className="flex flex-col p-2 border gap-2 bg-color2">
        <li>Cliente: {info.ClientName}</li>
        <li>Correo: {info.ClientEmail}</li>
        <li className="bg-color1 p-1 rounded-md w-fit">
          Balance: {info.Credit_balance}
        </li>
      </ul>

      <Form onSubmit={addCredits} title="Añadir" className="">
        <Input
          img="/src/assets/icons/cherries.png"
          type="number"
          name="add"
          placeholder="Creditos"
          value=""
          min={1}
          required
          className=""
        />

        <Input
          img="/src/assets/icons/coin.png"
          name="amount"
          type="number"
          placeholder="$$$$$$$$"
          value=""
          min={1}
          required
          className=""
        />
        <Input
          forCurrency={true}
          options={[
            { currency: "MLC" },
            { currency: "USD" },
            { currency: "CUP" },
          ]}
          type="select"
          id="Moneda"
          name="currency"
          required
          defaultValue={"Selecciona la moneda"}
        ></Input>
        <Button type="submit">+</Button>
      </Form>

      <Form onSubmit={removeCredits} title="Deducir">
        <Input
          img="/src/assets/icons/cherries.png"
          type="number"
          placeholder="Creditos"
          value=""
          name="subtract"
        />
        <Button type="submit">-</Button>
      </Form>
    </>
  );
};

export default EditBalance;
