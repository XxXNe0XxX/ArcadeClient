import Table from "../Table";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalProvider";

const Sessions = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [sessions, setSessions] = useState();
  const [refetch, setRefetch] = useState(false);
  const openModal = useModal();

  useEffect(() => {
    let isMounted = true;
    //Fetch users
    const getSessions = async () => {
      try {
        const response = await axiosPrivate.get("/api/gamesessions", {
          withCredentials: true,
        });
        isMounted && setSessions(response.data);
      } catch (error) {
        openModal({
          message: `${error.message}`,
        });
      }
    };
    getSessions();
    return () => {
      isMounted = false;
    };
  }, [refetch]);

  return <>{sessions && <Table data={sessions} title={"Sesiones"} />}</>;
};

export default Sessions;
