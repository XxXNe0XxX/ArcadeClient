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
        const response = await axiosPrivate.get(`/api/client/sessions/`, {
          withCredentials: true,
          signal: controller.signal,
        });
        setSessions(response?.data);
      } catch (error) {
        setMsg(error.response.data.message);
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
