import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useModal } from "../context/ModalProvider";
import Select from "./Select";
const StoreLocator = () => {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  useEffect(() => {
    let isMounted = true;

    const getMachines = async () => {
      try {
        const response = await axiosPrivate.get("/api/arcademachines/");
        response && setMachines(response.data);
      } catch (error) {
        openModal({ message: error.message });
      }
    };
    getMachines();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 overflow-hidden">
      <h1 className="text-4xl p-2 m-auto font-bold text-color1 text-center  font-press-start">
        Encuentra el Arcade mas cercano
      </h1>
      <div className="mb-6">
        <Select
          name="machines"
          value=""
          className="w-full p-3 border rounded-lg"
          onChange={(e) => {
            setSelectedMachine(e.target.value);
          }}
          options={machines.map((each) => {
            return { value: each.MachineID, label: each.Location };
          })}
        ></Select>
      </div>
      {selectedMachine && (
        <div className="p-4 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-lg text-gray-700 mb-2">
            {
              machines.filter((each) => each.MachineID == selectedMachine)[0]
                .Game
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default StoreLocator;
