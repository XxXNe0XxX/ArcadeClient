import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const EditBalance = ({ email, setMsg }) => {
  const axiosPrivate = useAxiosPrivate();
  const [add, setAdd] = useState();
  const [amount, setAmount] = useState();
  const [subtract, setSubtract] = useState();
  const [currency, setCurrency] = useState("");

  const addCredits = async (e) => {
    if (!add || !amount || !currency) {
      setMsg("Todos los campos son requeridos ");
    }
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        `/api/credits/add-credits/${email}`,
        JSON.stringify({
          CreditAmount: add,
          AmountCharged: amount,
          Currency: currency,
        })
      );
      if (response.statusText === "OK") {
        setMsg("Creditos añadidos correctamente");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeCredits = async (e) => {
    if (!subtract) {
      setMsg("Todos los campos son requeridos");
    }
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        `/api/credits/remove-credits/${email}`,
        JSON.stringify({ CreditAmount: subtract })
      );
      if (response.statusText === "OK") {
        setMsg("Creditos deducidos correctamente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col border-4 border-color1 p-2 gap-4">
      <h1>Añadir creditos</h1>
      <form className="flex  border rounded-md  ">
        <div className="flex flex-col  w-full ">
          <div className="flex ">
            <img
              className="h-12 w-12 object-cover p-1"
              src="/src/assets/icons/cherries.png"
            ></img>
            <input
              type="number"
              placeholder="Creditos"
              value={add}
              onChange={(e) => setAdd(e.target.value)}
              className="p-1 border w-60"
              min="0"
            />
          </div>
          <div className="flex ">
            <img
              className="h-12 w-12 object-cover p-1"
              src="/src/assets/icons/coin.png"
            ></img>
            <input
              type="number"
              placeholder="Cantidad cobrada"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-1 border w-60"
              min="0"
            />
          </div>
          <div className="w-72 border-color1 border overflow-hidden">
            <select
              id="currency"
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="text-color3 p-1 w-full border bg-color4"
              required
            >
              <option value="">Selecciona la moneda</option>
              <option value="MLC">MLC</option>
              <option value="USD">USD</option>
              <option value="CUP">CUP</option>
            </select>
          </div>
        </div>
        <div className="w-full items-center flex justify-center">
          <button
            onClick={addCredits}
            type="submit"
            className="bg-color1 border p-4  rounded-md "
          >
            +
          </button>
        </div>
      </form>
      <h1>Deducir creditos</h1>

      <form className="flex py-2 border rounded-md  ">
        <div className="flex p-2 flex-col items-center justify-center w-full *:border ">
          <input
            type="number"
            placeholder="Deducir"
            value={subtract}
            onChange={(e) => setSubtract(e.target.value)}
            className="p-1 py-2"
          />
        </div>
        <div className="w-full  items-center flex justify-center">
          <button
            onClick={removeCredits}
            type="submit"
            className="bg-color1 border p-4 rounded-md "
          >
            -
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditBalance;
