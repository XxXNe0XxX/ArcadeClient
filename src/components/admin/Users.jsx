import Table from "../Table";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalProvider";

const Users = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState();
  const [refetch, setRefetch] = useState(false);
  const openModal = useModal();
  useEffect(() => {
    let isMounted = true;
    //Fetch users
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/api/users", {
          withCredentials: true,
        });
        isMounted && setUsers(response.data);
      } catch (error) {
        openModal({
          message: `${error.message}`,
        });
      }
    };
    getUsers();
    return () => {
      isMounted = false;
    };
  }, [refetch]);

  //Edit Client
  const handleEdit = (row) => {
    navigate(`/dash/edit-user/${row.UserID}`);
  };

  //Delete Client
  const handleDelete = async (row) => {
    try {
      const response = await axiosPrivate.delete(`/api/users/${row.UserID}`, {
        withCredentials: true,
      });
      response.status === 200 &&
        openModal({
          message: `Cliente eliminado`,
        });
      setRefetch(!refetch);
    } catch (error) {
      openModal({
        message: `${error.message}`,
      });
    }
  };
  const handleToggle = async (row) => {
    try {
      const response = await axiosPrivate.get(
        `/api/users/toggle/${row.UserID}`
      );
      response.data.status === "activated"
        ? openModal({
            message: `Usuario activado`,
          })
        : response.data.status === "deactivated"
        ? openModal({
            message: `Usuario desactivado`,
          })
        : "";
      setRefetch(!refetch);
    } catch (error) {
      openModal({
        message: `${error.message}`,
      });
    }
  };
  return (
    <>
      {users && (
        <Table
          data={users}
          title={"Usuarios"}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      )}
    </>
  );
};

export default Users;
