import React, { useState, useEffect } from "react";
import Chart from "../Chart";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input";
import Select from "../Select";
const MachineUsage = () => {
  const { machineId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [usageData, setUsageData] = useState([]);
  const [date, setDate] = useState(
    // "2024-06-07"
    new Date().toISOString().split("T")[0]
  );
  const [period, setPeriod] = useState("day"); // "day", "month", "year"

  useEffect(() => {
    console.log(machineId);
    const fetchUsageData = async () => {
      try {
        if (machineId && date) {
          let endpoint;
          switch (period) {
            case "day":
              endpoint = `/api/arcademachines/getUsageByDay/${machineId}/${date}`;
              break;
            case "month":
              endpoint = `/api/arcademachines/getUsageByMonth/${machineId}/${date.slice(
                0,
                7
              )}`;
              break;
            case "year":
              endpoint = `/api/arcademachines/getUsageByYear/${machineId}/${date.slice(
                0,
                4
              )}`;
              break;
            default:
              break;
          }

          const response = await axiosPrivate.get(endpoint);
          if (response.statusText !== "OK") {
            throw new Error("Network response was not ok");
          }
          setUsageData(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    date && period && fetchUsageData();
  }, [machineId, date, period]);

  const getChartData = () => {
    const labels = [];
    const data = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (period === "day") {
      for (let i = 0; i < 24; i++) {
        labels.push(`${i}:00`);
        const usage = usageData.find((u) => u.time_period === i);
        data.push(usage ? usage.usage_count : 0);
      }
    } else if (period === "month") {
      const daysInMonth = new Date(
        date.slice(0, 4),
        date.slice(5, 7),
        0
      ).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        labels.push(`${i}`);
        const usage = usageData.find((u) => u.time_period === i);
        data.push(usage ? usage.usage_count : 0);
      }
    } else if (period === "year") {
      for (let i = 1; i <= 12; i++) {
        labels.push(monthNames[i - 1]);
        const usage = usageData.find((u) => u.time_period === i);
        data.push(usage ? usage.usage_count : 0);
      }
    }

    return { labels, data };
  };
  const getTotalUses = () => {
    return usageData.reduce((acc, curr) => acc + curr.usage_count, 0);
  };
  const totalUses = getTotalUses();

  const chartData = getChartData();
  const getTitle = () => {
    if (period === "day") {
      return `Uso de la maquina: ${machineId} - Dia: ${date}`;
    } else if (period === "month") {
      return `Uso de la maquina: ${machineId} - Mes: ${new Date(
        date
      ).toLocaleString("default", { month: "long" })} ${date.slice(0, 4)}`;
    } else if (period === "year") {
      return `Uso de la maquina: ${machineId} - Año: ${date.slice(0, 4)}`;
    }
    return "";
  };
  return (
    <div className="flex flex-col ">
      <h1 className="p-2">Estadisticas de uso maquina: {machineId}</h1>
      <div className=" grid gap-2 md:grid-cols-3 justify-center p-2">
        <Input
          id="Fecha"
          onChange={(e) => setDate(e.target.value)}
          type="date"
          value={date}
        />
        <Select
          id="Periodo"
          onChange={(e) => setPeriod(e.target.value)}
          options={[
            { value: "day", label: "Dia" },
            { value: "month", label: "Mes" },
            { value: "year", label: "Año" },
          ]}
          placeholder={"Selecciona el periodo"}
        ></Select>
        <h1 className="p-3 flex items-end  justify-center">
          Total en el {period}: {totalUses}
        </h1>
      </div>

      {usageData.length > 0 ? (
        <Chart
          data={chartData.data}
          labels={chartData.labels}
          title={getTitle()}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center h-64 border border-color4 p-2">
          <FontAwesomeIcon
            icon={faInfoCircle}
            size="3x"
            className="text-gray-400"
          />
          <p className="text-gray-600 mt-2">
            No hay informacion disponible para el periodo seleccionado.
          </p>
          <p className="text-gray-500">
            Intente seleccionar un periodo diferente.
          </p>
        </div>
      )}
    </div>
  );
};

export default MachineUsage;
