import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import Form from "../Form";
import { useModal } from "../../context/ModalProvider";
const EditClient = () => {
  const { clientId } = useParams();
  const [info, setInfo] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();

  useEffect(() => {
    let isMounted = true;
    //Fetch client
    const getClient = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/clients/getClientById/${clientId}`
        );
        setInfo(response?.data);
      } catch (error) {
        openModal({
          message: `${error.message}`,
        });
      }
    };
    getClient();

    return () => {
      isMounted = false;
    };
  }, []);

  //Edit Client
  const handleSubmit = async (formData) => {
    try {
      const response = await axiosPrivate.put(
        `/api/clients/updateClient/${clientId}`,
        JSON.stringify({ formData })
      );
      if (response.status === 200) {
        openModal({ message: "Cliente actualizado" });
      }
    } catch (error) {
      if (error.response.status === 409) {
        openModal({ message: "Ya existe un cliente con ese correo" });
      } else if (error.response.status === 400) {
        openModal({ message: "Al menos un campo es requerido" });
      } else {
        openModal({ message: error.message });
      }
    }
  };

  return (
    <section className="flex flex-col">
      <Form onSubmit={handleSubmit} title="Editar Cliente">
        <Input
          id="Nombre"
          type="text"
          placeholder={info.ClientName}
          name="name"
          value=""
        />

        <Input
          id="Correo electronico"
          type="email"
          placeholder={info.ClientEmail}
          value=""
          name="email"
        />
        <Input
          id="Contacto"
          type="number"
          placeholder={info.ClientContact}
          value=""
          name="contact"
        />
        <Input
          id="Direccion"
          type="text"
          placeholder={info.ClientAddress}
          value=""
          name="address"
        />
        <Button type="submit">Editar</Button>
      </Form>
      <Link to={`/dash/editbalance/${clientId}`}>
        <Button className=" flex gap-2 m-auto px-5 items-center justify-center rounded-full">
          <h1>Administrar balance </h1>
          <img className="w-8" src="/src/assets/icons/coin.png" alt="" />{" "}
        </Button>
      </Link>
    </section>
  );
};

export default EditClient;
