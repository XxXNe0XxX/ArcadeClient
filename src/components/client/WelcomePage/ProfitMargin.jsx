import React from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useModal } from "../../../context/ModalProvider";
const ProfitMargin = () => {
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();

  const [data, setData] = useState();
  const [query, setQuery] = useState({
    date: new Date().toISOString().split("T")[0],
    period: "month",
  });
  useEffect(() => {
    let isMounted = true;
    const fetchProfitMargin = async () => {
      try {
        const response = await axiosPrivate.get("/api/client/profitMargin", {
          params: {
            ...query,
          },
        });
        setData(response.data);
      } catch (error) {
        openModal({ message: error.response.data.message });
      }
    };
    fetchProfitMargin();

    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <div className="flex flex-col gap-2 bg-color2 rounded-md p-1">
      <div className="flex flex-col  items-start bg-color2 p-1 w-full justify-center  rounded-md">
        <div className="flex text-sm gap-2 w-full *:flex-grow ">
          <div className="flex flex-col ">
            <h1 className="text-center">Profit</h1>
            <ul className="bg-color1 p-1 rounded-md">
              {data?.map((each, i) => {
                return (
                  <li key={i}>
                    {each.currency} {each.profit}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col h-full">
            <h1 className="text-center">Cost</h1>
            <ul className="bg-color3 p-1 rounded-md">
              {data?.map((each, i) => {
                return (
                  <li key={i}>
                    {each.currency} {each.cost}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col h-full">
            <h1 className="text-center">Revenue</h1>
            <ul className="bg-color3 p-1 rounded-md">
              {data?.map((each, i) => {
                return (
                  <li key={i}>
                    {each.currency} {each.revenue}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
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
          defaultValue={"month"}
        >
          <option value={"day"}>Day</option>
          <option value={"week"}>Week</option>
          <option value={"month"}>Month</option>
          <option value={"year"}>Year</option>
        </select>
      </div>
    </div>
  );
};

export default ProfitMargin;
