import Table from "../Table";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalProvider";
import { flattenObject } from "../../utils/flattenObject";
const Machines = () => {
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const [machines, setMachines] = useState();
  const [refetch, setRefetch] = useState(false);
  const openModal = useModal();

  useEffect(() => {
    let isMounted = true;

    // Fetch machines
    const getMachines = async () => {
      try {
        const response = await axiosPrivate.get("/api/arcademachines/manage", {
          withCredentials: true,
        });

        const flattenedData = response.data.map((machine) =>
          flattenObject(machine)
        );
        isMounted && setMachines(flattenedData);
      } catch (error) {
        openModal({
          message: `${error.response.data.message}`,
        });
      }
    };
    getMachines();
    return () => {
      isMounted = false;
    };
  }, [refetch]);

  // Edit machine
  const handleEdit = (row) => {
    navigate(`/dash/edit-machine/${row.MachineID}`);
  };

  // Delete machine
  const handleDelete = async (row) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/arcademachines//${row.MachineID}`
      );
      response.status === 200 &&
        openModal({
          message: `Arcade eliminado`,
        });
      setRefetch(!refetch);
    } catch (error) {
      openModal({
        message: `${error.message}`,
      });
    }
  };
  const handleStatistics = async (row) => {
    navigate(`/dash/usage/${row.MachineID}`);
  };
  const handleToggle = async (row) => {
    try {
      const response = await axiosPrivate.get(
        `/api/arcademachines/toggle/${row.MachineID}`
      );
      response.data.status === "activated"
        ? openModal({
            message: `Arcade activado`,
          })
        : response.data.status === "deactivated"
        ? openModal({
            message: `Arcade desactivado`,
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
      {machines && (
        <Table
          data={machines}
          title={"Maquinas"}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatistics={handleStatistics}
          onToggle={handleToggle}
        />
      )}
    </>
  );
};
export default Machines;
