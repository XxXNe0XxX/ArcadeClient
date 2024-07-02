import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ClientChangePassword from "./ClientChangePassword";
import Button from "../Button";
const ClientProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const [info, setInfo] = useState();
  const [msg, setMsg] = useState("");

  const [changepassword, setChangePassword] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const getInfo = async () => {
      try {
        const response = await axiosPrivate.get(`/api/client/info`);
        setInfo(response.data);
      } catch (error) {
        setMsg(error.response.data.message);
      }
    };
    getInfo();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-color5  flex flex-col items-start justify-start h-full gap-2 w-full p-4 ">
      <ul className="flex flex-col gap-2 bg-color2 p-2 rounded-md w-full">
        <li>Nombre: {info?.User?.Name}</li>
        <li>Apellido: {info?.User?.Name}</li>
        <li>Correo: {info?.User?.Email}</li>
        <li>Contacto: {info?.User?.Contact}</li>
        <li>Direccion: {info?.User?.Address}</li>
        <li>Municipio: {info?.User?.Municipality}</li>
        <li>Provincia: {info?.User?.Province}</li>
        <li className="bg-color1 rounded-md p-1 w-fit">
          Balance: {info?.Credit_balance}
        </li>
      </ul>

      {!changepassword && (
        <Button
          onClick={() => setChangePassword(!changepassword)}
          className="rounded-md"
        >
          Cambiar contraseña
        </Button>
      )}
      {changepassword ? (
        <ClientChangePassword email={info?.Email}></ClientChangePassword>
      ) : (
        ""
      )}
      <h1 className="p-2 border border-color1 w-full m-auto text-center">
        {msg}
      </h1>
    </section>
  );
};

export default ClientProfile;
