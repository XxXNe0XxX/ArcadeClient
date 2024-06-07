import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DeleteClient = ({ email, setMsg }) => {
  const axiosPrivate = useAxiosPrivate();
  const deleteClient = async () => {
    try {
      const response = await axiosPrivate.delete(
        `/api/clients/deleteClient/${email}`
      );
      if (response?.statusText === "OK") {
        setMsg("Cliente eliminado correctamente");
      }
      console.log(response);
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <button className="bg-red-700 p-2 border w-full" onClick={deleteClient}>
      Eliminar Cliente
    </button>
  );
};

export default DeleteClient;
