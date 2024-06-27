import Table from "../Table";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";

const ClientTransactions = () => {
  const [data, setData] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getTransactions = async () => {
      try {
        const response = await axiosPrivate.get(`/api/client/transactions`, {
          withCredentials: true,
          signal: controller.signal,
        });
        setData(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTransactions();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Table data={data} title={"Transacciones"} />
    </>
  );
};

export default ClientTransactions;
