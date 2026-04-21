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
    if (Object.keys(modifiedFields).length < 1) {
      return openModal({ message: "At least one field must be modified" });
    }
    try {
      const response = await axiosPrivate.patch(
        `/api/users/${userId}`,
        JSON.stringify({ ...modifiedFields }),
      );
      if (response.status === 200) {
        openModal({ message: "Client updated" });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        openModal({ message: error.response.data.errors[0].msg });
      } else {
        openModal({ message: error.response.data.message });
      }
    }
    setRefetch(!refetch);
  };
  const fields = [
    { id: "Name", name: "name", type: "input", placeholder: "Name" },
    {
      id: "Last Name",
      name: "lastName",
      type: "input",
      placeholder: "Last Name",
    },

    { id: "Contact", name: "contact", type: "input", placeholder: "12345678" },
    {
      id: "Email",
      name: "email",
      type: "input",
      placeholder: "email@mail.com",
    },

    {
      id: "Province",
      name: "province",
      type: "select",
      placeholder: "Select the province",
      options: Object.keys(regions).map((each) => {
        return { value: each, label: each };
      }),
    },
    {
      id: "Municipality",
      name: "municipality",
      type: "select",
      placeholder: "Select the municipality",
      dependentField: "province",
    },
    {
      id: "Address",
      name: "address",
      type: "input",
      placeholder: "Street between and",
    },
    {
      id: "User Type",
      name: "role",
      type: "select",
      placeholder: "Select type",
      options: [
        { value: "CLIENT", label: "Client" },
        { value: "TECHNICIAN", label: "Technician" },
      ],
    },
  ];
  return (
    <>
      <Form
        fields={fields}
        title="Edit User"
        initialValues={info}
        onSubmit={handleSubmit}
      ></Form>
      {info.Role === "CLIENT" && (
        <Link to={`/dash/edit-balance/${userId}`}>
          <Button className=" flex gap-2 mx-auto mb-10 px-5 items-center justify-center rounded-full">
            <h1> {"->"} Balance </h1>
            <img className="w-8" src="/assets/icons/coin.png" alt="" />{" "}
          </Button>
        </Link>
      )}
    </>
  );
};

export default EditUser;
