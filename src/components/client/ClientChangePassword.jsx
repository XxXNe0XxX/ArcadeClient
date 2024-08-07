import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import Form from "../Form";
const ClientChangePassword = () => {
  const axiosPrivate = useAxiosPrivate();
  const [msg, setMsg] = useState("");
  const changePassword = async (formData) => {
    try {
      const response = await axiosPrivate.post(
        `/api/client/changePassword/`,
        JSON.stringify({ ...formData })
      );
      if (response.statusText === "OK") {
        setMsg("Contraseña cambiada con exito");
      }
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  const fields = [
    {
      id: "Contraseña actual",
      name: "currentPassword",
      type: "input",
      placeholder: "********",
    },
    {
      id: "Nueva contraseña",
      name: "newPassword",
      type: "input",
      placeholder: "********",
    },
    {
      id: "Repetir contraseña",
      name: "repeatPassword",
      type: "input",
      placeholder: "********",
    },
  ];

  return (
    <>
      <Form
        onSubmit={changePassword}
        fields={fields}
        title={"Cambiar contraseña"}
      ></Form>
      {msg}
    </>
  );
};

export default ClientChangePassword;
