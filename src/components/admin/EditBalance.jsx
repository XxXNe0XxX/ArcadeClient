import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useModal } from "../../context/ModalProvider";
import Form from "../Form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import { useParams } from "react-router-dom";

const EditBalance = () => {
  const { userId } = useParams();
  const [info, setInfo] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    let isMounted = false;

    // Get client
    const getClient = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/info/${userId}`);
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
        `/api/credits/add/${userId}`,
        JSON.stringify({
          ...formData,
        })
      );
      if (response.statusText === "OK") {
        openModal({ message: "Creditos añadidos correctamente" });
      }
      setRefetch(!refetch);
    } catch (error) {
      openModal({ message: error.response.data.message });
    }
  };

  // Remove credits
  const removeCredits = async (formData) => {
    try {
      const response = await axiosPrivate.post(
        `/api/credits/remove/${userId}`,
        JSON.stringify({ ...formData })
      );
      if (response.statusText === "OK") {
        openModal({ message: "Creditos deducidos correctamente" });
      }
      setRefetch(!refetch);
    } catch (error) {
      openModal({ message: error.message });
    }
  };

  const addFields = [
    { id: "Creditos", name: "add", type: "input", placeholder: "Creditos" },
    {
      id: "Cantidad a cobrar",
      name: "amount",
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
  ];
  const subtractFields = [
    {
      id: "Creditos",
      name: "subtract",
      type: "input",
      placeholder: "Creditos",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <ul className="flex flex-col p-2  gap-2 bg-color2">
        <li>Cliente: {info?.User?.Name}</li>
        <li>Correo: {info?.User?.Email}</li>
        <li className="bg-color1 p-2 rounded-md w-fit">
          Balance: {info?.Credit_balance}
        </li>
      </ul>
      <div className="md:flex md:gap-2">
        <Form onSubmit={addCredits} title="+" fields={addFields} />
        <Form onSubmit={removeCredits} title="-" fields={subtractFields} />
      </div>
    </div>
  );
};

export default EditBalance;
