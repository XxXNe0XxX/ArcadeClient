import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import Form from "../Form";
import Select from "../Select";
import { useModal } from "../../context/ModalProvider";
import { regions } from "../../data/regions";
import { getModifiedFields } from "../../utils/lowerCaseUpperCase";
const EditUser = () => {
  const { userId } = useParams();
  const [info, setInfo] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    let isMounted = true;
    //Fetch client
    const getClient = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${userId}`);
        setInfo(response?.data);
      } catch (error) {
        openModal({
          message: `${error.response.data.message}`,
        });
      }
    };
    getClient();

    return () => {
      isMounted = false;
    };
  }, [refetch]);

  //Edit Client
  const handleSubmit = async (formData) => {
    const modifiedFields = getModifiedFields(info, formData);

    try {
      const response = await axiosPrivate.patch(
        `/api/users/${userId}`,
        JSON.stringify({ ...modifiedFields })
      );
      if (response.status === 200) {
        openModal({ message: "Cliente actualizado" });
      }
    } catch (error) {
      if (error.response.status === 409) {
        openModal({ message: "Ya existe un cliente con ese correo" });
      } else if (error.response.status === 400) {
        openModal({ message: `${error.response.data.message}` });
      } else {
        openModal({ message: error.response.data.error });
      }
    }
    setRefetch(!refetch);
  };
  const fields = [
    { id: "Nombre", name: "name", type: "input", placeholder: "Nombre" },
    {
      id: "Apellido",
      name: "lastName",
      type: "input",
      placeholder: "Apellido",
    },

    { id: "Contacto", name: "contact", type: "input", placeholder: "12345678" },
    {
      id: "Correo",
      name: "email",
      type: "input",
      placeholder: "correo@mail.com",
    },

    {
      id: "Provincia",
      name: "province",
      type: "select",
      placeholder: "Selecciona la provincia",
      options: Object.keys(regions).map((each) => {
        return { value: each, label: each };
      }),
    },
    {
      id: "Municipio",
      name: "municipality",
      type: "select",
      placeholder: "Selecciona el municipio",
      dependentField: "province",
    },
    {
      id: "Direccion",
      name: "address",
      type: "input",
      placeholder: "Calle a entre b y c",
    },
    {
      id: "Tipo de usuario",
      name: "role",
      type: "select",
      placeholder: "Selecciona el tipo",
      options: [
        { value: "CLIENT", label: "Cliente" },
        { value: "TECHNICIAN", label: "Tecnico" },
      ],
    },
  ];
  return (
    <>
      <Form
        fields={fields}
        title="Editar Usuario"
        initialValues={info}
        onSubmit={handleSubmit}
      ></Form>
      {info.Role === "CLIENT" && (
        <Link to={`/dash/edit-balance/${userId}`}>
          <Button className=" flex gap-2 mx-auto mb-10 px-5 items-center justify-center rounded-full">
            <h1> {"->"} Balance </h1>
            <img className="w-8" src="/src/assets/icons/coin.png" alt="" />{" "}
          </Button>
        </Link>
      )}
    </>
  );
};

export default EditUser;
