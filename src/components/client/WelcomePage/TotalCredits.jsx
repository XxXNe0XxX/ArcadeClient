import React from "react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
const TotalCredits = () => {
  const axiosPrivate = useAxiosPrivate();
  const [creditsSold, setCreditsSold] = useState();
  const [averageCreditsSold, setAverageCreditsSold] = useState();
  const [query, setQuery] = useState({
    date: new Date().toISOString().split("T")[0],
    period: "week",
  });
  useEffect(() => {
    let isMounted = true;
    const fetchTotalCreditsSold = async () => {
      try {
        const response = await axiosPrivate.get("/api/client/creditsSold", {
          params: {
            ...query,
          },
        });
        setCreditsSold(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalCreditsSold();
    const fetchAverageCreditsSold = async () => {
      try {
        const response = await axiosPrivate.get("/api/client/averageCredits", {
          params: {
            ...query,
          },
        });
        setAverageCreditsSold(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAverageCreditsSold();
    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <div className="w-fit flex flex-col gap-2 items bg-color2 rounded-md h-fit p-1">
      <div className="flex text-sm items-center bg-color2  w-full justify-between rounded-md">
        Creditos vendidos
        <h1 className="bg-color1 p-1 rounded-md">
          {creditsSold?.totalCreditsSold}{" "}
        </h1>
      </div>
      <div className="flex text-sm items-center bg-color2  w-full justify-between rounded-md">
        Promedio de creditos vendidos por cliente
        <h1 className="bg-color1 p-1 rounded-md">
          {averageCreditsSold?.averageCreditsSoldPerTransaction}{" "}
        </h1>
      </div>
      <div className=" flex gap-2">
        <input
          onChange={(e) => {
            setQuery({ ...query, date: e.target.value });
          }}
          type="date"
          className="border rounded-md p-1 w-full"
        ></input>
        <select
          onChange={(e) => setQuery({ ...query, period: e.target.value })}
          className="border rounded-md p-1 w-full"
          defaultValue={"week"}
        >
          <option value={"day"}>Dia</option>
          <option value={"week"}>Semana</option>
          <option value={"month"}>Mes</option>
          <option value={"year"}>Año</option>
        </select>
      </div>
    </div>
  );
};

export default TotalCredits;
