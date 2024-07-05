import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./generate.css";
import PipeQR from "../PipeQR";

const GenerateQR = () => {
  const axiosPrivate = useAxiosPrivate();
  const [amountCharged, setAmountCharged] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [msg, setMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [qr, setQr] = useState("");

  const generate = async (e) => {
    setQr("");
    e.preventDefault();
    if (amountCharged <= 0 || creditAmount <= 0) {
      setMsg("Cantidad incorrecta");
      return;
    }
    try {
      const response = await axiosPrivate.post("/api/qr/generate", {
        amountCharged,
        creditAmount,
        currency,
        exchangeRate: exchangeRate || undefined,
      });

      response?.data && setMsg("Creditos añadidos con exito");
      setQr(response.data.qrCode);
      setIsDisabled(true);
      setAmountCharged("");
      setCreditAmount("");
      setCurrency("");
      setExchangeRate("");
      setTimeout(() => {
        setIsDisabled(false);
      }, 6000);
    } catch (error) {
      error.response.status === 404 && setMsg("Creditos insuficientes");
    }
  };

  return (
    <section className="flex h-[90vh] flex-col  justify-between ">
      <form
        onSubmit={generate}
        className="max-w-md mx-auto px-4  bg-color2 shadow-md rounded-md"
      >
        <h1 className="font-press-start text-center p-2 text-3xl">
          Generar QR
        </h1>
        <div className="mb-4 flex items-center">
          <label htmlFor="amountCharged" className="flex text-sm">
            Cantidad a cobrar
          </label>
          <input
            type="number"
            id="amountCharged"
            name="amountCharged"
            min="0"
            value={amountCharged}
            onChange={(e) => setAmountCharged(e.target.value)}
            placeholder="$$$$$$$"
            className="w-full text-color4  p-2 mx-2"
            required
          />
          <img
            className="h-14 w-20 scale-75 object-cover"
            src="/assets/icons/coin.png"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="creditAmount" className="flex text-sm">
            Cantidad a añadir
          </label>
          <input
            type="number"
            id="creditAmount"
            name="creditAmount"
            min="0"
            value={creditAmount}
            onChange={(e) => setCreditAmount(e.target.value)}
            placeholder="Creditos"
            className="w-full text-color4  p-2 mx-2"
            required
          />
          <img className="h-12 object-cover" src="/assets/icons/cherries.png" />
        </div>
        <div className="mb-4">
          <label
            htmlFor="currency"
            className="block font-medium text-color4 py-1"
          >
            Moneda
          </label>
          <select
            id="currency"
            name="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="text-color3 w-full py-2 border bg-color4"
            required
          >
            <option value="">Selecciona la moneda</option>
            <option value="MLC">MLC</option>
            <option value="USD">USD</option>
            <option value="CUP">CUP</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="number"
            min="0"
            id="exchangeRate"
            name="exchangeRate"
            value={exchangeRate}
            onChange={(e) => setExchangeRate(e.target.value)}
            className="w-full text-color4  p-2"
            placeholder="Tasa de cambio { opcional }"
            step={0.000001}
          ></input>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={`${
              isDisabled ? "bg-color2" : ""
            } transition-all border mb-3 text-color4 bg-color1 w-full p-2`}
            disabled={isDisabled}
          >
            Generar
          </button>
        </div>
        {msg && (
          <h1 className="border text-center p-1 my-2 border-color1">{msg}</h1>
        )}
      </form>
      <PipeQR qr={qr} />
    </section>
  );
};

export default GenerateQR;
