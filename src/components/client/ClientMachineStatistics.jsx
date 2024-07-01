import Table from "../Table";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const ClientMachineStatistics = () => {
  const [data, setData] = useState();
  const [msg, setMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const fetchMachineStatistics = async () => {
      try {
        const response = await axiosPrivate.get(
          `api/client/machinestatistics/`
        );

        setData(response.data);
      } catch (error) {
        setMsg(error.response.data.message);
      }
    };
    fetchMachineStatistics();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      {data && (
        <div>
          <Table data={data} title={"Estadisticas de uso"} />
        </div>
      )}
    </div>
  );
};

export default ClientMachineStatistics;
