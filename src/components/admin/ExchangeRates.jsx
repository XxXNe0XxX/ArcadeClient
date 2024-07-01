import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useModal } from "../../context/ModalProvider";
import Button from "../Button";
const ExchangeRates = () => {
  const axiosPrivate = useAxiosPrivate();
  const openModal = useModal();
  const [rates, setRates] = useState([]);
  const [updatedRates, setUpdatedRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axiosPrivate.get("/api/exchange");
        setRates(response.data);
      } catch (error) {
        openModal({ message: error.message });
      }
    };

    fetchRates();
  }, []);

  const handleRateChange = (currency, newRate) => {
    setUpdatedRates((prev) => ({
      ...prev,
      [currency]: newRate,
    }));
  };

  const handleUpdateRates = async () => {
    try {
      const response = await axiosPrivate.patch(
        "/api/exchange/update",
        updatedRates
      );
      setRates((prevRates) =>
        prevRates.map((rate) =>
          updatedRates[rate.Currency] !== undefined
            ? { ...rate, Rate: updatedRates[rate.Currency] }
            : rate
        )
      );
      response.status === 200 &&
        openModal({ message: "Tasas de cambio actualizadas" });
      setUpdatedRates({});
    } catch (error) {
      openModal({ message: error.response.data.message });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-4">Tasas de cambio</h2>
      {rates.length > 0 ? (
        <div className="flex border p-8 rounded-md border-color1 bg-color2 flex-col justify-center items-center gap-2 ">
          {rates.map((each) => (
            <div
              key={each.Currency}
              className="rounded-lg  flex  items-center gap-2 justify-center"
            >
              <div className="text-lg w-full font-medium">{each.Currency}</div>
              <input
                type="number"
                className="p-2 border rounded "
                value={updatedRates[each.Currency] || each.Rate || ""} // Use updated rate if available, otherwise fallback to original rate
                onChange={(e) =>
                  handleRateChange(each.Currency, parseFloat(e.target.value))
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <div>No hay tasas de cambio disponibles</div>
      )}

      <Button onClick={handleUpdateRates}>Actualizar</Button>
    </div>
  );
};

export default ExchangeRates;
