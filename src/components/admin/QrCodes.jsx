import Table from "../Table";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useModal } from "../../context/ModalProvider";
import { flattenObject } from "../../utils/flattenObject";

const QrCodes = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getQrCodes = async () => {
      try {
        const response = await axiosPrivate.get("/api/qr", {
          withCredentials: true,
          signal: controller.signal,
        });
        const flattenedData = response.data.map((qr) => flattenObject(qr));
        setQrCodes(flattenedData);
      } catch (error) {
        if (!controller.signal.aborted) {
          openModal({
            message: `${error.response?.data?.message || error.message}`,
          });
        }
      }
    };
    getQrCodes();

    return () => controller.abort();
  }, [refetch, axiosPrivate, openModal]);

  const handleDelete = async (row) => {
    try {
      const response = await axiosPrivate.delete(`/api/qr/${row.QRCodeID}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        openModal({ message: response.data?.message || `Codigo QR eliminado` });
        setRefetch((prev) => !prev);
      }
    } catch (error) {
      openModal({
        message: `${error.response?.data?.message || error.message}`,
      });
    }
  };

  return (
    <>
      {qrCodes.length > 0 && (
        <Table data={qrCodes} title={"Codigos QR"} onDelete={handleDelete} />
      )}
    </>
  );
};

export default QrCodes;
