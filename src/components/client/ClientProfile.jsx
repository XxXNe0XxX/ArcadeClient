import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import ClientChangePassword from "./ClientChangePassword";
const ClientProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const [clientInfo, setClientInfo] = useState();
  const [changepassword, setChangePassword] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const getClientInfo = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/clients/getClient/${localStorage.getItem("email")}`
        );
        setClientInfo(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getClientInfo();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-color2 h-[80vh] flex flex-col gap-1 w-full p-4 *:border">
      <h1>Nombre {clientInfo?.ClientName}</h1>
      <h1>Correo {clientInfo?.ClientEmail}</h1>
      <h1>Contacto {clientInfo?.ClientContact}</h1>
      <h1>Direccion {clientInfo?.ClientAddress}</h1>
      <h1>Balance {clientInfo?.Credit_balance}</h1>

      {!changepassword && (
        <button
          onClick={() => setChangePassword(!changepassword)}
          className="border border-color1 p-1"
        >
          Cambiar contraseña
        </button>
      )}
      {changepassword ? (
        <ClientChangePassword
          email={clientInfo?.ClientEmail}
        ></ClientChangePassword>
      ) : (
        ""
      )}
    </section>
  );
};

export default ClientProfile;
