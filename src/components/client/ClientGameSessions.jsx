import { axiosPrivate } from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Table from "../Table";

const ClientGameSessions = () => {
  const axiosPrivate = useAxiosPrivate();
  const [sessions, setSessions] = useState();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getGameSessions = async () => {
      try {
        console.log(
          JSON.stringify({
            clientEmail: localStorage.getItem("email"),
          })
        );
        const response = await axiosPrivate.get(
          `/api/clients/sessions/${localStorage.getItem("email")}`,
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );
        console.log(response.data);
        setSessions(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getGameSessions();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="">
      <Table data={sessions} title={"Sesiones"} />
    </div>
  );
};

export default ClientGameSessions;
