import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Table from "../Table";

const ClientQrCodes = () => {
  const axiosPrivate = useAxiosPrivate();
  const [qrCodes, setQrCodes] = useState();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getQrCodes = async () => {
      try {
        console.log(
          JSON.stringify({
            clientEmail: localStorage.getItem("email"),
          })
        );
        const response = await axiosPrivate.get(
          `/api/clients/qrcodes/${localStorage.getItem("email")}`,
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );
        console.log(response.data);
        setQrCodes(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getQrCodes();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="">
      <Table data={qrCodes} title={"Codigos QR"} />
    </div>
  );
};

export default ClientQrCodes;
