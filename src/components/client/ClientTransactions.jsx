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
        console.log(
          JSON.stringify({
            clientEmail: localStorage.getItem("email"),
          })
        );
        const response = await axiosPrivate.get(
          `/api/transactions/getClientTransactions/${localStorage.getItem(
            "email"
          )}`,
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );
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
    <div className="">
      <Table data={data} title={"Transacciones"} />
    </div>
  );
};

export default ClientTransactions;
