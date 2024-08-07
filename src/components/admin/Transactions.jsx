import Table from "../Table";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalProvider";
import { flattenObject } from "../../utils/flattenObject";

const Transactions = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [transactions, setTransactions] = useState();
  const [refetch, setRefetch] = useState(false);
  const openModal = useModal();

  useEffect(() => {
    let isMounted = true;

    // Fetch machines
    const getTransactions = async () => {
      try {
        const response = await axiosPrivate.get("/api/transactions", {
          withCredentials: true,
        });
        const flattenedData = response.data.map((transaction) =>
          flattenObject(transaction)
        );
        isMounted && setTransactions(flattenedData);
      } catch (error) {
        openModal({
          message: `${error.response.data.message}`,
        });
      }
    };
    getTransactions();
    return () => {
      isMounted = false;
    };
  }, [refetch]);

  // Edit machine
  const handleEdit = (row) => {
    navigate(`/dash/edit-transaction/${row.TransactionID}`);
  };

  // Delete machine
  const handleDelete = async (row) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/transactions/${row.TransactionID}`
      );
      response.status === 200 &&
        openModal({
          message: `Transaccion eliminada`,
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
      {transactions && (
        <Table
          data={transactions}
          title={"Transacciones"}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Transactions;
