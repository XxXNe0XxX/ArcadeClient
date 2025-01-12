import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../Form";
import { useModal } from "../../context/ModalProvider";

const EditQR = () => {
  const { qrId } = useParams();
  const [info, setInfo] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    let isMounted = true;
    //Fetch client
    const getQr = async () => {
      try {
        const response = await axiosPrivate.get(`/api/qr/${qrId}`);
        setInfo(response?.data);
      } catch (error) {
        openModal({
          message: `${error.reponse.data.message}`,
        });
      }
    };
    getQr();

    return () => {
      isMounted = false;
    };
  }, [refetch]);

  //Edit Transaction
  const handleSubmit = async (formData) => {
    if (formData === info) {
      return openModal({ message: "Al menos un campo debe ser modificado" });
    }
    try {
      const response = await axiosPrivate.patch(
        `/api/qr/${qrId}`,
        JSON.stringify({ ...formData })
      );
      if (response.status === 204) {
        openModal({ message: "QR actualizado" });
      }
      setRefetch(!refetch);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        openModal({ message: error.response.data.errors[0].msg });
      } else {
        openModal({ message: error.response.data.message });
      }
    }
  };
  const fields = [
    {
      id: "Balance",
      name: "balance",
      type: "input",
      placeholder: `${info?.QRBalance}`,
    },
  ];

  return (
    <Form
      onSubmit={handleSubmit}
      title="Editar QR"
      fields={fields}
      initialValues={info}
    ></Form>
  );
};
export default EditQR;
