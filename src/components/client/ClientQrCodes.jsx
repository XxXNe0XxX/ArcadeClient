import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Table from "../Table";
import { useNavigate } from "react-router-dom";

const ClientQrCodes = () => {
  const axiosPrivate = useAxiosPrivate();
  const [qrCodes, setQrCodes] = useState();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getQrCodes = async () => {
      try {
        const response = await axiosPrivate.get(`/api/client/qrcodes`, {
          withCredentials: true,
          signal: controller.signal,
        });
        setQrCodes(response?.data);
      } catch (error) {
        setMsg(error.response.data.message);
      }
    };

    getQrCodes();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEdit = (row) => {
    navigate(`/clientdash/recoverqr/${row.Identifier}`);
  };

  return (
    <div className="">
      <Table data={qrCodes} title={"Codigos QR"} onEdit={handleEdit} />
    </div>
  );
};

export default ClientQrCodes;
