import Table from "../Table";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useModal } from "../../context/ModalProvider";

const QrCodes = () => {
  const [qrCodes, setQrCodes] = useState();
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const [refetch, setRefetch] = useState();
  useEffect(() => {
    let isMounted = true;
    //Fetch Qr codes
    const getQrCodes = async () => {
      try {
        const response = await axiosPrivate.get("/api/qr", {
          withCredentials: true,
        });
        isMounted && setQrCodes(response.data);
      } catch (error) {
        openModal({
          message: `${error.response.data.message}`,
        });
      }
    };
    getQrCodes();
    return () => {
      isMounted = false;
    };
  }, [refetch]);

  //Delete Qr
  const handleDelete = async (row) => {
    try {
      const response = await axiosPrivate.delete(`/api/qr/${row.QRCodeID}`, {
        withCredentials: true,
      });
      response.status === 200 &&
        openModal({
          message: `Codigo QR eliminado`,
        });
      setRefetch(!refetch);
    } catch (error) {
      openModal({
        message: `${error.message}`,
      });
    }
  };

  return (
    <>
      {qrCodes && (
        <Table data={qrCodes} title={"Codigos QR"} onDelete={handleDelete} />
      )}
    </>
  );
};

export default QrCodes;
