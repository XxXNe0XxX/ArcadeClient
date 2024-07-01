import React from "react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useModal } from "../../../context/ModalProvider";
const ClientExchangeRates = () => {
  const [rates, setRates] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axiosPrivate.get("/api/exchange/cup");
        setRates(response.data);
      } catch (error) {
        openModal({ message: error.response.data.message });
      }
    };

    fetchRates();
  }, [axiosPrivate]);

  return (
    <>
      {rates.length > 0 ? (
        <div className="flex border p-1 rounded-md border-color1  flex-col justify-center items-center  ">
          {rates.map((each) => (
            <div
              key={each.Currency}
              className="rounded-lg  flex  items-center gap-1 "
            >
              <h1 className=" font-medium">1 {each.Currency}</h1>
              <span>=</span>
              <h1 type="number" className="  ">
                {`${each.Rate}CUP`}
              </h1>
            </div>
          ))}
        </div>
      ) : (
        <div>No hay tasas de cambio disponibles</div>
      )}
    </>
  );
};

export default ClientExchangeRates;
