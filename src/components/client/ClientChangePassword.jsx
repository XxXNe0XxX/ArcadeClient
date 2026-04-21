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
        JSON.stringify({ ...formData }),
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
      id: "Current Password",
      name: "currentPassword",
      type: "input",
      placeholder: "********",
    },
    {
      id: "New Password",
      name: "newPassword",
      type: "input",
      placeholder: "********",
    },
    {
      id: "Repeat Password",
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
        title={"Change Password"}
      ></Form>
      {msg}
    </>
  );
};

export default ClientChangePassword;
